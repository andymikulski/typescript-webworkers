(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["main"] = factory();
	else
		root["main"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp_name_([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const overseer_1 = __webpack_require__(2);
class DemoApp {
    constructor() {
        const el = document.createElement('canvas');
        el.setAttribute('width', '800');
        el.setAttribute('height', '600');
        document.body.appendChild(el);
        this.canvas = el;
        this.context = el.getContext('2d');
        const ov = new overseer_1.Overseer();
        ov.spawnWorker(overseer_1.WORKER_TYPES.THREADED);
    }
}
exports.DemoApp = DemoApp;
new DemoApp();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pubsub_1 = __webpack_require__(3);
var WORKER_TYPES;
(function (WORKER_TYPES) {
    WORKER_TYPES["NETWORKED"] = "dist/networkedWorker.js";
    WORKER_TYPES["THREADED"] = "dist/threadedWorker.js";
})(WORKER_TYPES = exports.WORKER_TYPES || (exports.WORKER_TYPES = {}));
;
class Overseer {
    constructor() {
        this.eventBus = new pubsub_1.PubSub();
        this.subWorkers = [];
        this.workerCount = 0;
    }
    close() {
        this.subWorkers.forEach((worker) => {
            worker.terminate();
        });
    }
    spawnWorker(type) {
        let worker = new Worker(type.toString());
        worker.onmessage = this.handleMessage.bind(this);
        this.subWorkers.push(worker);
        worker.postMessage({
            type: 'init',
            id: this.workerCount,
        });
        this.workerCount += 1;
    }
    handleMessage(evt) {
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
exports.Overseer = Overseer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PubSub {
    constructor() {
        this.bindings = {};
        this.onceBindings = {};
    }
    on(evtName, callback) {
        this.bindings[evtName] = this.bindings[evtName] || [];
        this.bindings[evtName].push(callback);
    }
    bind(evtName, callback) {
        return this.on(evtName, callback);
    }
    once(evtName, callback) {
        this.onceBindings[evtName] = this.onceBindings[evtName] || [];
        this.onceBindings[evtName].push(callback);
    }
    bindOnce(evtName, callback) {
        return this.once(evtName, callback);
    }
    trigger(evtName, data) {
        let callbacks = [];
        callbacks = callbacks.concat(this.bindings[evtName] || []).concat(this.onceBindings[evtName] || []);
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](data);
        }
        // Clear the once bindings since they should only fire... once.
        this.onceBindings[evtName] = [];
    }
}
exports.PubSub = PubSub;


/***/ })
],[1]);
});