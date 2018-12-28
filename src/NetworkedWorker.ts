import ThreadedWorker from './ThreadedWorker';
// import * as WebSocket from 'ws';
const ctx: Worker = self as any;
let workerID = -1;


class NetworkedWorker extends ThreadedWorker {
  onReceiveData(ctx: Worker, ev: MessageEvent) {
    let message: any = ev.data;

    switch (message.type) {
      default:
        console.log(`Worker ${workerID} received unknown event "${message.type}"`);
        break;

      case 'init':
        const ws = new WebSocket('ws://localhost:9000/');
        ws.addEventListener('open', function open() {
          ws.send('something');
          // this.sendData('ready', );
        });
        ws.addEventListener('message', function incoming(data) {
          console.log(data.data);
        });

        break;

      case 'incoming-command':
        break;
    }
  }
}

new NetworkedWorker(self as any);
