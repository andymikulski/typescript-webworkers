import ThreadedWorker from './ThreadedWorker';
// import * as WebSocket from 'ws';
const ctx: Worker = self as any;
let workerID = -1;


class ParticleWorker extends ThreadedWorker {
  onReceiveData(ctx: Worker, ev: MessageEvent) {
    let message: any = ev.data;

    switch (message.type) {
      default:
        console.log(`Worker ${workerID} received unknown event "${message.type}"`);
        break;
    }
  }
}

new ParticleWorker(self as any);
