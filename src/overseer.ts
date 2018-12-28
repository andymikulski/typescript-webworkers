import { PubSub } from "./pubsub";

export enum WORKER_TYPES {
  NETWORKED = "dist/networkedWorker.js",
  THREADED = "dist/threadedWorker.js",
  PARTICLE = "dist/particleWorker.js",
};

export class Overseer {
  private eventBus: PubSub = new PubSub();
  private subWorkers: Worker[] = [];
  private workerCount: number = 0;

  public close() {
    this.subWorkers.forEach((worker) => {
      worker.terminate();
    });
  }

  public spawnWorker(type: WORKER_TYPES) {
    let worker = new Worker(type.toString());
    worker.onmessage = this.handleMessage.bind(this);
    this.subWorkers.push(worker);

    worker.postMessage({
      type: 'init',
      id: this.workerCount,
    });

    this.workerCount += 1;
  }

  handleMessage(evt: MessageEvent) {
    const message = evt.data;
    const type = message.type;
    delete message.type;

    switch (message.type) {
      default:
        console.log('handle message', type, message);
        this.eventBus.trigger(type, message);
        break;
    }
  }
}