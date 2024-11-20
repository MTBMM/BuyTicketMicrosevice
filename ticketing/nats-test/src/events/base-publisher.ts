import { Stan } from "node-nats-streaming";
import { Event } from "./base-listener";



export abstract class BasePublisher<T extends Event> {
    abstract subject: T['subject'];
    private client: Stan;
    constructor(stan: Stan){
        this.client = stan
    }

    publish(data: T['data']): Promise<void>{

        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if(err){
                    return reject(err);
                }
                console.log('event published to subject: ', this.subject)
                resolve()
            })
        })
    }
}