import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Listener, OrderCreatedEvent, Subjects } from '@ntkticket/common';
import { expiraionQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expriesAt).getTime() - new Date().getTime()
    console.log('Waiting this many milliseconds to process the job:', delay);

    await expiraionQueue.add({
      orderId: data.id
    }, {
         delay
      }
    );

    msg.ack();
  }
}
