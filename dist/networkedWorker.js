(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["networkedWorker"] = factory();
	else
		root["networkedWorker"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp_name_([1,2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import * as WebSocket from 'ws';
const ctx = self;
let workerID = -1;
class ThreadedWorker {
    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.onmessage = this.onReceiveData.bind(this);
        this.sendData('ThreadedWorker instantiated');
    }
    sendData(type, data) {
        this.ctx.postMessage(Object.assign({ type }, data));
    }
    onReceiveData(ctx, ev) { }
}
exports.default = ThreadedWorker;


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ThreadedWorker_1 = __webpack_require__(0);
// import * as WebSocket from 'ws';
const ctx = self;
let workerID = -1;
class NetworkedWorker extends ThreadedWorker_1.default {
    onReceiveData(ctx, ev) {
        let message = ev.data;
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
new NetworkedWorker(self);


/***/ })
],[4]);
});