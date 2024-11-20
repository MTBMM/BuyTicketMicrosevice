import { BasePublisher, OrderCreatedEvent, Subjects } from "@ntkticket/common";


export class OrderCreatePublisher extends BasePublisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}