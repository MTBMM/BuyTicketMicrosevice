import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

export interface Event {
    subject: Subjects;
    data: any
}


export abstract class Listener<T extends Event> {
    abstract subject: T["subject"];
    abstract queueGroupName: string;
    protected ack = 5*1000;
    private client: Stan;
    abstract onMessage(data: T["data"], msg: Message): void

    constructor(stan: Stan){
        this.client = stan
    }

    subcriptionOption(){
        return this.client.subscriptionOptions().setDeliverAllAvailable().
        setManualAckMode(true).setAckWait(this.ack).setDurableName(this.queueGroupName)
    }

    listen(){
        const subcription = this.client.subscribe(this.subject, this.queueGroupName, this.subcriptionOption())
        subcription.on('message', (msg: Message) => {
            console.log(`Recieve event: ${this.subject}/${this.queueGroupName}`)
            const data = this.parseData(msg)
            this.onMessage(data, msg)
        })
    }

    parseData(msg: Message){
        const data = msg.getData()
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
    }
}