import express, {Response, Request} from "express";
import { Ticket } from "../models/Ticket";
import { NotFoundError, requireAuth, validateRequest, RequireAuthError, BadRequestError } from "@ntkticket/common";
import { body } from "express-validator";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router()

router.put('/api/tickets/:id',
    requireAuth,
    [
      body('title').not().isEmpty().withMessage('Title is required'),
      body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be provided and must be greater than 0'),
    ],
    validateRequest,   
     async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }
  console.log("orderId: ", ticket.orderId)
  if(ticket.orderId === undefined){
    throw new BadRequestError("Can not edit ticket as it has reserved!!")
  }
  if(ticket.userId !== req.currentUser?.id){
    throw new RequireAuthError();
  }
  ticket.set({
    title: req.body.title,
    price: req.body.price
  })
  await ticket.save()
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version

  });
  res.send(ticket);
})

export {router as updateTicketRouter}

