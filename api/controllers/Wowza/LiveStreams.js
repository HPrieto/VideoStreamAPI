'use strict';

/**
 * Module dependencies.
 * @private
 */
var https = require('https');
var crypto = require('crypto');
 
/**
 * Module variables.
 * @private
 */
var path = '/some/path';
var host = process.env.WOWZA_HOST;
var accessKey = process.env.WOWZA_ACCESS_KEY;
var apiKey = process.env.WOWZA_API_KEY;
 
/**
 * Module functions.
 * @public
 */

/**
 * @title Create A Live Stream.
 * @verb POST
 * 
 * @desc This operations creates a live stream.
 * 
 * @requestSchema application/json
 * @public
 */
exports.create = (req, res) => {
	var timestamp = Math.round(new Date().getTime()/1000);
	var hmacData = (timestamp+':'+path+':'+apiKey);
	var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex');
	const options = {
		hostname: host,
		path: path,
		method: 'POST',
		headers: {
			'wsc-access-key': accessKey,
    		'wsc-timestamp': timestamp,
    		'wsc-signature': signature,
    		'Content-Type': 'application/json'
		}
	};
	const req = https.request(options, function(res) {
  		var body = '';
  		res.on('data', function(data) {
    		body += data;
  		});
  		res.on('end', function() {
    		console.log(JSON.parse(body));
  		});
	}).on('error', function(e) {
  		console.log(e.message);
	});
	req.write(JSON.stringify({
  		"live_stream": {
    		"name": "My New Live Stream"
  		}
	}));
	req.end();
};

/**
 * @title Fetch All Live Streams
 * @verb GET
 * 
 * @desc This operation shows limited details for all of your live streams. 
 * 		 For detailed information, fetch a single live stream.
 * 
 * @param {integer} page: 
 * 		Returns a paginated view of results from the HTTP request. 
 *		Specify a positive integer to indicate which page of the results 
 * 		should be displayed. The default is 1.
 *
 * 		For more information and examples, see Get paginated query results with 
 * 		the Wowza Streaming Cloud REST API.
 *
 * @param {integer} perPage (per_page):
 *		For use with the page parameter. Indicates how many records should 
 * 		be included in a page of results. A valid value is any positive integer. 
 *		The default and maximum value is 1000.
 * 
 * @response application/json
 * @responseSchema {object} [live_streams]
 * live_streams: [{
 * 		{string<date-time>} created_at, => The date and time that the live stream was created.
 *		{string} id,					=> The unique alphanumeric string that identifies the live stream.
 *		{string} name,					=> A descriptive name for the live stream. Maximum 200 characters.
 *		{string<date-time>} updated_at	=> The date and time that the live stream was updated.
 * }]
 * @public
 */
exports.fetchAll = (req, res) => {
	console.log('Fetching All Live Streams.');
};

/**
 * @title Fetch A Live Stream.
 * @verb GET
 * 
 * @desc This operation shows the details of a specific live stream.
 * 
 * @param {string} id: The unique alphanumeric string that identifies the live stream.
 * @return {object} live_stream: {
			"aspect_ratio_height": 1080,
			"aspect_ratio_width": 1920,
			"billing_mode": "pay_as_you_go",
			"broadcast_location": "us_west_california",
			"closed_caption_type": "cea",
			"connection_code": "0e15cb",
			"connection_code_expires_at": "2020-11-30T17:16:21.956Z",
			"created_at": "2020-01-29T17:16:21.956Z",
			"delivery_method": "push",
			"delivery_protocols": [
			  "rtmp",
			  "rtsp",
			  "wowz"
			],
			"delivery_type": "multi-bitrate",
			"direct_playback_urls": {
			  	"rtmp": [
				    {
				      "name": "source",
				      "url": "rtmp://abc123.entrypoint.cloud.wowza.com/app-B8P6K226/wxyz6789"
				    },
				    {
				      "name": "1920x1080",
				      "output_id": "dcxq5q6c",
				      "url": "rtmp://abc123.entrypoint.cloud.wowza.com/app-B8P6K226/wxyz6789_stream1"
				    },
				    {
				      "name": "1280x720",
				      "output_id": "0g116zkf",
				      "url": "rtmp://abc123.entrypoint.cloud.wowza.com/app-B8P6K226/wxyz6789_stream2"
				    },
				    {
				      "name": "854x480",
				      "output_id": "4qqkwndt",
				      "url": "rtmp://abc123.entrypoint.cloud.wowza.com/app-B8P6K226/wxyz6789_stream3"
				    },
				    {
				      "name": "640x360",
				      "output_id": "0pv8djpg",
				      "url": "rtmp://abc123.entrypoint.cloud.wowza.com/app-B8P6K226/wxyz6789_stream4"
				    },
				    {
				      "name": "512x288",
				      "output_id": "b09xrxjf",
				      "url": "rtmp://abc123.entrypoint.cloud.wowza.com/app-B8P6K226/wxyz6789_stream5"
				    },
				    {
				      "name": "320x180",
				      "output_id": "bvkh2nsz",
				      "url": "rtmp://abc123.entrypoint.cloud.wowza.com/app-B8P6K226/wxyz6789_stream6"
				    }
			  	],
			  	"rtsp": [
				    {
				      "name": "source",
				      "url": "rtsp://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789"
				    },
				    {
				      "name": "1920x1080",
				      "output_id": "dcxq5q6c",
				      "url": "rtsp://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream1"
				    },
				    {
				      "name": "1280x720",
				      "output_id": "0g116zkf",
				      "url": "rtsp://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream2"
				    },
				    {
				      "name": "854x480",
				      "output_id": "4qqkwndt",
				      "url": "rtsp://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream3"
				    },
				    {
				      "name": "640x360",
				      "output_id": "0pv8djpg",
				      "url": "rtsp://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream4"
				    },
				    {
				      "name": "512x288",
				      "output_id": "b09xrxjf",
				      "url": "rtsp://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream5"
				    },
				    {
				      "name": "320x180",
				      "output_id": "bvkh2nsz",
				      "url": "rtsp://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream6"
				    }
			  	],
			 	"wowz": [
				    {
				      "name": "source",
				      "url": "wowz://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789"
				    },
				    {
				      "name": "1920x1080",
				      "output_id": "dcxq5q6c",
				      "url": "wowz://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream1"
				    },
				    {
				      "name": "1280x720",
				      "output_id": "0g116zkf",
				      "url": "wowz://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream2"
				    },
				    {
				      "name": "854x480",
				      "output_id": "4qqkwndt",
				      "url": "wowz://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream3"
				    },
				    {
				      "name": "640x360",
				      "output_id": "0pv8djpg",
				      "url": "wowz://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream4"
				    },
				    {
				      "name": "512x288",
				      "output_id": "b09xrxjf",
				      "url": "wowz://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream5"
				    },
				    {
				      "name": "320x180",
				      "output_id": "bvkh2nsz",
				      "url": "wowz://abc123.entrypoint.cloud.wowza.com:1935/app-B8P6K226/wxyz6789_stream6"
				    }
			  	]
			},
			"encoder": "wowza_streaming_engine",
			"hosted_page": true,
			"hosted_page_description": "My Hosted Page Description",
			"hosted_page_logo_image_url": "https://prod.s3.amazonaws.com/uploads/player/hosted_page_logo_image/23424/5bad28.jpg",
			"hosted_page_sharing_icons": true,
			"hosted_page_title": "My Hosted Page",
			"hosted_page_url": "https://player.cloud.wowza.com/hosted/e8dk5bf6/player.html",
			"id": "wdjfqvsv",
			"name": "My PAYG Transcoded WSE Live Stream",
			"player_countdown": true,
			"player_countdown_at": "2020-02-01T17:00:00.000Z",
			"player_embed_code": null,
			"player_hls_playback_url": "https://[wowzasubdomain].wowza.com/1/TWhoL3BiZnJXMFhmNzZVN3JrZDAwUT09/ZmYxSXRrTERrUlk9/hls/live/playlist.m3u8",
			"player_id": "kwb6pwnv",
			"player_logo_image_url": "https://prod.s3.amazonaws.com/uploads/player/logo_image/23424/5bad28.jpg",
			"player_logo_position": "top-right",
			"player_responsive": false,
			"player_type": "original_html5",
			"player_video_poster_image_url": "https://prod.s3.amazonaws.com/uploads/player/video_poster_image/23424/5bad28.jpg",
			"player_width": 640,
			"recording": true,
			"stream_source_id": "5skrfpyf",
			"stream_targets": [
				{
					"id": "klbmg2h8"
				},
				{
					"id": "bnjtdmmc"
				}
			],
			"target_delivery_protocol": "hls-https",
			"transcoder_type": "transcoded",
			"updated_at": "2020-01-31T06:12:39.956Z",
			"use_stream_source": true,
			"vod_stream": true
  		}
	}
 * @public
 */
exports.fetch = (req, res) => {
	console.log('Fetching A Live Stream.');
}

/**
 * @title Update A Live Stream
 * @verb PATCH
 * 
 * @desc This operation updates a live stream.
 * 
 * @param {string} id => The unique alphanumeric string that identifies the live stream.
 * 
 * @requestSchema applications/json
 * @body {object} live_stream: {
			"aspect_ratio_height": 1080,
			"aspect_ratio_width": 1920,
			"encoder": "wowza_gocoder",
			"name": "My Live Stream",
			"closed_caption_type": "cea",
			"delivery_method": "push",
			"delivery_protocols": [
			  	"string"
			],
			"disable_authentication": false,
			"hosted_page_description": "My Hosted Page Description",
			"hosted_page_logo_image": "[Base64-encoded string representation of GIF, JPEG, or PNG file]",
			"hosted_page_sharing_icons": true,
			"hosted_page_title": "My Hosted Page",
			"password": "68332313",
			"player_countdown": true,
			"player_countdown_at": "2020-02-01T17:00:00.000Z",
			"player_logo_image": "[Base64-encoded string representation of GIF, JPEG, or PNG file]",
			"player_logo_position": "top-right",
			"player_responsive": false,
			"player_type": "wowza_player",
			"player_video_poster_image": "[Base64-encoded string representation of GIF, JPEG, or PNG file]",
			"player_width": 640,
			"recording": true,
			"remove_hosted_page_logo_image": true,
			"remove_player_logo_image": true,
			"remove_player_video_poster_image": true,
			"source_url": "xyz.streamlock.net/vod/mp4:Movie.mov",
			"target_delivery_protocol": "hls-https",
			"use_stream_source": false,
			"username": "client2",
			"vod_stream": true
 		}
 	}
 * @public
*/
exports.update = (req, res) => {
	console.log('Updating Live Stream.');
};

/**
 * @title Delete A Live Stream
 * @verb DELETE
 * 
 * @desc This operation deletes a live stream, including all assigned outputs and targets.
 * 
 * @param {string} id
 * @public
 */
exports.delete = (req, res) => {
	console.log('Deleting Live Stream');
};

/**
 * @title Start A Live Stream
 * @verb PUT
 * 
 * @desc This operation starts a live stream.
 *
 * @param {string} id
 * 
 * @response application/json
 * @responseSchema {object} live_stream: {
 * 		"state": "started" // "started" "stopped" "starting" "stopping" "resetting"
 * }
 * @public
 */
exports.start = (req, res) => {
	console.log('Starting Live Stream.');
};

/**
 * @title Stop A Live Stream
 * @verb PUT
 * 
 * @desc This operation stops a live stream.
 * 
 * @param {string} id
 * 
 * @response application/json
 * @responseSchema {object} live_stream: {
 * 		"state": "stopped" // "started" "stopped" "starting" "stopping" "resetting"
 * }
 */
exports.stop = (req, res) => {
	console.log('Stopping Live Stream.');
};

/**
 * @title Reset A Live Stream.
 * @verb PUT
 * 
 * @desc This operation resets a live stream.
 * 
 * @param {string} id
 * 
 * @response application/json
 * @responseSchema {object} live_stream: {
 * 		"state": "resetting" // "started" "stopped" "starting" "stopping" "resetting"
 * }
 */
exports.reset = (req, res) => {
	console.log('Resetting Live Stream.');
}

/**
 * @title Regenerate the connection code for a live stream.
 * @verb PUT
 * 
 * @desc This operation regenerates the connection code of a live stream.
 * 
 * @param {string} id: 
 * @public
 */
exports.regenerate = (req, res) => {
	console.log('Regenrating Live Stream');
};

/**
 * @title Fetch the thumbnail URL of the live stream.
 * @verb GET
 * 
 * @desc This operation shows the thumbnail URL of a started live stream.
 * 
 * @param {string} id: The unique alphanumeric string that identifies the live stream.
 * 
 * @response application/json
 * @responseSchema {object} live_stream: {
 * 		"thumbnail_url": "some_url.com" // The URL to receive the preview thumbnail
 * }
 * @public
 */
exports.thumbnail = (req, res) => {
	console.log('Fetching Thumbnail of Live Stream.');
};

/**
 * @title Fetch the state of a live stream.
 * @verb GET
 * 
 * @desc This operation shows the current state of a live stream.
 * 
 * @param {string} id
 * 
 * @response application/json
 * @responseSchema {object} live_stream: {
 * 		"ip_address": "123.0.0.1",  // The IP address of the live stream instance.
 *									// If the state is anything other than "started", 
 *									// The IP address is 0.0.0.0
 * 
 * 		"state": "started"	// Enum: "started" "stopped" "starting" "stopping" "resetting"
 * }
 * @public
 */
exports.state = (req, res) => {
	console.log('Checking Live Stream State.');
};

exports.metrics = (req, res) => {
	console.log('Fetching Active Live Stream Metrics.');
};