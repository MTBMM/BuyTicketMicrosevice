import { Listener, Subjects, TicketCreatedEvent, TicketUpdatedEvent } from "@ntkticket/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";


export class TicketUpatedListen extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = 'orders-service';

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        
        
        const ticket = await Ticket.findByEvent(data)// tai sao nay await
        if(!ticket){
            throw new Error('Ticket not found!!')
        }
        const {title, price} = data
        ticket.set({
            title,
            price
        })
        await ticket.save()
        msg.ack()
    }
}