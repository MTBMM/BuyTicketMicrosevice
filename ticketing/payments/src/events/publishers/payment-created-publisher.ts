import { BasePublisher, PaymentCreatedEvent, Subjects } from "@ntkticket/common";

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}