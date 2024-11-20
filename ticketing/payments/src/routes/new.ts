import { BadRequestError, OrderStatus, RequireAuthError, validateRequest } from '@ntkticket/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { Order } from '../models/order'
import { stripe } from '../stripe'
import { Payment } from '../models/payment'
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher'
import { natsWrapper } from '../nats-wrapper'
const router = express.Router()

router.post("/api/payments", 
        [body("orderId").not().isEmpty(), body("token").not().isEmpty()], validateRequest,
   async (req: Request, res: Response) => {
        const {orderId, token} = req.body
        const order = await Order.findById(orderId)
        console.log("order:", order)
        if(!order){
            throw new Error("Order not found!!")
        }
       

        if(order.userId !== req.currentUser?.id){
            throw new RequireAuthError()
        }
        console.log(req.body)

        if(order.status === OrderStatus.Cancelled){
            throw new BadRequestError('Cannot pay for an cancelled orders');
        }
        console.log(process.env.STRIPE_KEY)
        console.log("aaaaaddd")

        try {
            // Thực hiện thanh toán
            const charge = await stripe.charges.create({
                amount: order.price * 100, // Số tiền (đơn vị nhỏ nhất, ví dụ: 5000 = $50.00)
                currency: "usd",
                source: token, // Token thanh toán
                description: `Order ID: ${orderId}`, // Mô tả giao dịch
            });
            const payment = Payment.build({
                orderId,
                stripeId: charge.id
            })
            await payment.save()
            console.log("Payment successful:", payment);

            new PaymentCreatedPublisher(natsWrapper.client).publish({
                id: payment.id,
                orderId: payment.orderId,
                stripeId: payment.stripeId,
              });
            res.status(201).send({ id: payment.id });

        } catch (error) {
            console.error("Payments failed:", error);
            throw error;
        }
       
       
      

})

export {router as newRouter}