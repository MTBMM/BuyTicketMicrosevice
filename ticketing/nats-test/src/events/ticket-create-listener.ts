import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreateListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "payment-service";
    onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
        console.log('event data: ', data)
        console.log(data.id, data.title, data.price)
        msg.ack()
    }
}