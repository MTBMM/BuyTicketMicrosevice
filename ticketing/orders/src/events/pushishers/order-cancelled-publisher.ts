import { BasePublisher,  OrderCancelledEvent, Subjects } from "@ntkticket/common";


export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}