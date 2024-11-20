import {BasePublisher, ExpirationCompletedEvent, Subjects} from '@ntkticket/common'

export class ExpirationCompletedPublisher extends BasePublisher<ExpirationCompletedEvent> {
    subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted
}

