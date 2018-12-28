var window = self;importScripts("./common.js");
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["threadedWorker"] = factory();
	else
		root["threadedWorker"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp_name_([2],[
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


/***/ })
],[0]);
});