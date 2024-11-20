import { Listener, OrderCreatedEvent, Subjects, TicketCreatedEvent } from "@ntkticket/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { TicketCreatedPubliser } from "../publishers/ticket-created-publisher";


export class OrderTicketCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message){
        const ticket = await Ticket.findById(data.ticket.id)
        if(!ticket){
            throw new Error("Ticket not found!!")
        }
        ticket.set({
            orderId: data.id
        })
        await ticket.save()
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version,
      });
      
          // ack the message
         msg.ack();
    }
}