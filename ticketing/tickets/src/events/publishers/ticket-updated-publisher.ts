import { BasePublisher, Subjects, TicketUpdatedEvent } from '@ntkticket/common';

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
