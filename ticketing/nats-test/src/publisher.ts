import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-create-publisher'

console.clear()
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
})

stan.on('connect', async () => {
    console.log('publisher connected to Nats!!!')

    
    const publisher = new TicketCreatedPublisher(stan);
    try {
      await publisher.publish({
        id: '123',
        title: 'concert',
        price: 20,
      });
    } catch (err) {
      console.error(err);
    }
    
})