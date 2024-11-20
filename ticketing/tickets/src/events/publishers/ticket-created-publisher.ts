import { BasePublisher, Subjects, TicketCreatedEvent } from "@ntkticket/common";

export class TicketCreatedPubliser extends BasePublisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}