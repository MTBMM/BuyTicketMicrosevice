import express, {Response, Request} from "express";
import { Ticket } from "../models/Ticket";
import { requireAuth, validateRequest } from "@ntkticket/common";
import { body } from "express-validator";
import { TicketCreatedPubliser } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router()

router.post('/api/tickets', requireAuth,  
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({gt: 0}).withMessage('price must be greater than 0')
    
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
    const {title, price} = req.body
    const userId = req.currentUser!.id
    const ticket = Ticket.build({title, price, userId})
    await ticket.save()
    await new TicketCreatedPubliser(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
    });
    res.status(201).send(ticket)
    
   
})

export {router as createTicketRouter}

