import Queue  from "bull";
import { ExpirationCompletedPublisher } from "../events/publishers/expiration-completed-publisher";
import { natsWrapper } from "../nats-wrapper";

interface payload {
    orderId: string;
}

const expiraionQueue = Queue<payload>('order-expiration', {
        redis: {
            host: process.env.REDIS_HOST
        }
})

expiraionQueue.process(async (job) => {
   
    new ExpirationCompletedPublisher(natsWrapper.client).publish({
        orderId:  job.data.orderId
    })
})

export {expiraionQueue}