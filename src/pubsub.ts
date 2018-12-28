export class PubSub {
  private bindings: { [evtName: string]: Function[] } = {};
  private onceBindings: { [evtName: string]: Function[] } = {};

  public on(evtName: string, callback: Function) {
    this.bindings[evtName] = this.bindings[evtName] || [];
    this.bindings[evtName].push(callback);
  }

  public bind(evtName: string, callback: Function) {
    return this.on(evtName, callback);
  }

  public once(evtName: string, callback: Function) {
    this.onceBindings[evtName] = this.onceBindings[evtName] || [];
    this.onceBindings[evtName].push(callback);
  }

  public bindOnce(evtName: string, callback: Function) {
    return this.once(evtName, callback);
  }

  public trigger(evtName: string, data?: any) {
    let callbacks: Function[] = [];
    callbacks = callbacks.concat(this.bindings[evtName] || []).concat(this.onceBindings[evtName] || []);

    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i](data);
    }

    // Clear the once bindings since they should only fire... once.
    this.onceBindings[evtName] = [];
  }
}