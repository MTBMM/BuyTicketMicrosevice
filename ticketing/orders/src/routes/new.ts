import mongoose from "mongoose";

import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from "@ntkticket/common";

import { body } from "express-validator";

import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import express, { Request, Response } from 'express';
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatePublisher } from "../events/pushishers/order-create-publisher";

const router = express.Router()
const EXPIRATION_WINDOW_SECONDS = 10 * 60;

router.post('/api/orders', requireAuth, 
    [
        body('ticketId').not().isEmpty().custom((input: string) => mongoose.Types.ObjectId.isValid(input)).
        withMessage('TicketId must be provided!!!')
    ], validateRequest, async (req: Request, res: Response) => {


    const { ticketId } = req.body

    const ticket = await Ticket.findById(ticketId)
    console.log(req.body)
    if(!ticket){
        throw new NotFoundError()
    }

    const isReserved = await ticket.isReserved()
    if (isReserved) {
        throw new BadRequestError('Ticket is already reserved');
    }

    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
     // Build the order and save it to the database
     const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
      });
      await order.save();
  
      // Publish an event saying that an order was created
      new OrderCreatePublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        status: order.status,
        userId: order.userId,
        expriesAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
      })
  
      res.status(201).send(order);
})

export { router as newOrderRouter };
