import nats, {Message} from 'node-nats-streaming'

import { randomBytes } from 'crypto'
import { TicketCreateListener } from './events/ticket-create-listener'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
})

stan.on('connect', () => {
    console.log('Listened to Nats!!')
   
    stan.on('close', () => {
        console.log('NATS connection closed!!!')
        process.exit()
    })
   new TicketCreateListener(stan).listen()
})

process.on('SIGNINT', () => stan.close())
process.on('SIGTERM', () => stan.close())