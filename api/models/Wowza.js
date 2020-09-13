'use strict';
var http = require("http");

/**
 * This class is a JavaScript wrapper for cURL REST API for Wowza Streaming Engine server </br>
 * 
 * @class WowzaAPI
 * @param {Object} [options] possible to set stream parameters which will use as default for methods
 * @param {string} [options.wowzaAddress = 'localhost'] IP address or domain name of Wowza Streaming Engine
 * @param {string} [options.streamFile = 'myStream.stream'] name of stream file
 * @param {string} [options.application = 'application'] name of an application
 * @param {string} [options.appInstance = '_definst_'] name of an application instance
 * @param {string} [options.mediaCasterType = 'rtp'] caster type

 * @example
 * let Wowza = require('./Wowza');
 * let wowza = new Wowza({
 * 			   wowzaAddress: '123.456.1.12',  // default is 'localhost'
 *             streamFile: 'ipCamera.stream', // default is 'myStream.stream'
 *             application: 'webrtc',         // default is 'live'
 *             appInstance: '_definst_',      // default is '_definst_'
 *             mediaCasterType: 'rtp'         // default is 'rtp'
 * });
 * wowza.someWowzaMethod(); 
 */

 class WowzaAPI {

 	constructor(options) {
 		this.wowzaAddress = options.wowzaAddress || 'localhost';
 		this.application = options.application || 'live';
 		this.streamFile = options.streamFile || 'myStream.stream';
 		this.appInstance = options.appInstance || '_definst_';
 		this.mediaCasterType = options.mediaCasterType || 'rtp';
 		this.commonRequestUrl = `http://${this.wowzaAddress}:8087`;
 		this.authEnabled = false;
 		if (options.username != '' && options.password != '') {
 			console.log("using digest library");
 			this.authEnabled = true;
 			// TODO: Handle authentication
 		} else {
 			console.log("using native library");
 		}
 		this.httpOptions = {
 			host: this.wowzaAddress,
 			port: 8087,
 			path: 'api/livestream/host',
 			method: 'PUT',
 			headers: {
 				'Accept': 'application/json; charset=utf-8',
 				'Content-Type': 'application/json; charset=utf-8'
 			}
 		}
 	}

 	/**
	 Get a list of streamfiles

	 @function getStreamFilesList
	 @param {Object} [options]
	 @param {string} [options.application = 'live'] name of an application (default value can be another if it was passed to the class constructor)
	 @return {Promise} promise which resolve by object which contains array of streamFiles and it's configurations

	 @example
	 wowza.getStreamFilesList({ application: 'webrtc', streamFile: 'ipCamera' })
	 	  .then(res => console.log(res))
	 	  .catch(err => console.log(err));

	 // Wowza answer example:
	 {serverName: '_defaultServer_', streamFiles: [{id: 'ipCamera2', href: 'api/livestream/webrtc/streamfiles/ipCamera2'}]}
 	 */
 	 getStreamFilesList(options) {
 	 	let application = this.application;
 	 	if (options && options.application) application = options.application;
 	 	return new Promise((resolve, reject) => {

 	 		// getting a clone of the common httpOptions object and change it's path to necessary
 	 		let options = Object.assign({}, this.httpOptions);
 	 		options.method = 'GET';
 	 		options.path = `${this.httpOptions.path}/application/${application}/streamfiles`;

 	 		// getting request object
 	 		this.makeNetworkRequest(options, resolve, reject);
 	 	});
 	 }

 	 /**
 	 
 	 Ability to update the existing stream file parameters
 	 
 	 @function updateStreamFileOptions
 	 @param {Object} [options]
 	 @param {string} [options.application = 'live'] name of an application (default value can be another if it was passed to the class constructor)
 	 @param {Object} [options]
 	 @return {Promise} promise which resolve by object which contains a response that looks like this:
 	 {
 	 	"success": true,
 	 	"message": "",
 	 	"data": null
 	 }
 	 
 	 */
 	 updateStreamFileOptions(options, streamFileAppConfig) {
 	 	let application = this.application;
 	 	let streamFile = this.streamFile;
 	 	
 	 	if (options) {
 	 		application = options.application || this.application;
 	 		streamFile = options.streamFile || this.streamFile;
 	 	}
 	 	
 	 	return new Promise((resolve, reject) => {
 	 		// getting a clone of the common httpOptions object and change it's path to necessary
 	 		let options = Object.assign({}, this.httpOptions);
 	 		options.method = 'PUT';
 	 		options.path = `${this.httpOptions.path}/applications/${application}/streamfiles/${streamFile}`;
 	 		options.body = JSON.stringify(streamFileAppConfig);
 	 		// getting request object
 	 		this.makeNetworkRequest(options, resolve, reject);
 	 	});
 	 }
 	 
 	 /**
 	 
 	 Ability to update the existing stream file parameters
 	 
 	 @function updateAdvancedStreamFileOptions
 	 @param {Object} [options]
 	 @param {string} [options.application = 'live'] name of an application (default value can be another if it was passed to the class constructor)
 	 
 	 
 	 */
 }