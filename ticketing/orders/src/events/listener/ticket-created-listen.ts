import { Listener, Subjects, TicketCreatedEvent } from "@ntkticket/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";


export class TicketCreatedListen extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'orders-service';

    async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        const {id, title, price} = data
        

        const ticket = Ticket.build({
            id: id,
            title: title,
            price: price
        })
        await ticket.save()
        msg.ack()
    }
}