'use strict';

var connection = require('../database/mysql');

/**
liveStream table schema;

CREATE TABLE liveStream (
	id INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	name VARCHAR(200) NOT NULL,
	aspectRatioHeight INT NOT NULL,
	aspectRatioWidth INT NOT NULL,
	billingMode VARCHAR(20) NOT NULL,
	broadcastLocation VARCHAR(30) NOT NULL,
	deliveryMethod VARCHAR(30) NOT NULL,
	encoder VARCHAR(20) NOT NULL,
	sourceUrl VARCHAR(255),
	transcoderType VARCHAR(20) NOT NULL
)
*/

var LiveStream = function (model) {
	this.id = model.id;
	this.userId = model.userId;
	this.name = model.name;

	// The height, in pixels, of the output rendition. Should correspond to the
	// aspect ratio (widescreen or standard) of the video source and be
	// divisible by 8. Set the aspect ratio of the live stream to match the aspect
	// ratio in your encoder settings.
	this.aspectRatioWidth = model.aspectRatioWidth;

	// The width, in pixels, of the output rendtion. Should correspond to the
	// aspect ratio (widescreen or standard) of the video source and be
	// divisible by 8. Set the aspect ratio of the live stream to match the aspect
	// ratio in your encoder settings.
	this.aspectRatioHeight = model.aspectRatioHeight;

	// The billing mode for the stream. Use the default, 'pay_as_you_go'
	this.billingMode = model.billingMode;

	// Specify the region that's closest to where your stream originates. For a
	// list of valid regions, see the API reference documentation.
	this.broadcastLocation = model.broadcastLocation;

	// The method you're using to deliver the source stream to the
	// transcoder. Use 'push' so the RTMP video source pupshes the stream to
	// Wowza Streaming Cloud.

	// You can alternatively set the 'delivery_method' to 'pull'. Pull streams
	// require a 'source_url' value.
	this.deliveryMethod = model.deliveryMethod;

	// The video source for the live stream. Use other_rtmp
	this.encoder = model.encoder;

	// Required for a pull stream only. The URL of an RTMP video encoder.
	// Consult the encoder documentation for the URL syntax.

	// The hostname or IP address used in the source_url must be publicly
	// accessible. If authentication information, such as username and 
	// password, is included in the source_url, it can only contain
	// alphanumeric, period (.), underscore (_), and hyphen (-) characters
	this.sourceUrl = model.sourceUrl;

	// Specify the default, transcoded. You can alternatively use passthrough
	// depending on your needs and teh functionality available at your 
	// broadcast location.
	this.transcoderType = model.transcoderType;
}