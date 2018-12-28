// import * as WebSocket from 'ws';
const ctx: Worker = self as any;
let workerID = -1;


export default class ThreadedWorker {
    constructor(private ctx: Worker) {
        this.ctx.onmessage = this.onReceiveData.bind(this);

        this.sendData('ThreadedWorker instantiated');
    }

    sendData(type: string, data?: any) {
        this.ctx.postMessage({
            type,
            ...data
        });
    }

    protected onReceiveData(ctx: Worker, ev: MessageEvent) {
        console.log("Got data", ev);
    }
}

new ThreadedWorker(self as any);
