import mongoose from 'mongoose'
import {app} from './app'
import { natsWrapper } from './nats-wrapper'
import { OrderTicketCreatedListener } from './events/listeners/order-ticket-created-listener';
import { OrderCancelledListener } from './events/listeners/order-delete-ticket-listener';
const start = async () => {
    console.log("starting.....")
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
      }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
      }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
      }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
      }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
      }
    try{
        await natsWrapper.connect( 
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL)
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!!!')
            process.exit()
        })
        process.on('SIGNINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())
        new OrderTicketCreatedListener(natsWrapper.client).listen()
        new OrderCancelledListener(natsWrapper.client).listen()

        await mongoose.connect(process.env.MONGO_URI)
        console.log("conected to mongoose")
    }catch(err){
        console.log(err)
        console.log("fail")
    }
    app.listen(5000, () => {
        console.log('Listening on port 4000!!!')
    })
}

start()

