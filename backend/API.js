var MongoClient = require('mongodb').MongoClient;
var querystring = require('querystring');
var sha1 = require('sha1');

var database;




// It only connects to the database during the first time of its execution. Every call
// after that returns the cached database object.

var getDatabaseConnection = function(callback) {

 	if(database) {

 		callback(database);
 		return;

 	} else {

 		MongoClient.connect('mongodb://127.0.0.1:27017/nodejs-by-example', function(err, db) {

 			if(err) {
 				throw err;
 			};

 			database = db;

 			callback(database);

 		});

 	}

};






// We use the request object as a stream and subscribe to its data event. Once we
// receive all the information, we use querystring.parse to format it into a usable
// hashmap (key/value of the POST parameters) object and fire the callback.

var processPOSTRequest = function(req, callback) {
 	var body = '';
 	req.on('data', function (data) {
 		body += data;
 	});
 	req.on('end', function () {
 		callback(querystring.parse(body));
 	});
};


var validEmail = function(value) {
 	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 	return re.test(value);
};



module.exports = function(req, res) {

 	res.writeHead(200, {'Content-Type': 'application/json'});
 	res.end('{}' + '\n');

}


Router.add('api/user', function(req, res) {
 	switch(req.method) {

 		case 'GET':
 			// ...
		break;

 		case 'PUT':
 			// ...
 		break;

 		case 'POST':
	 		processPOSTRequest(req, function(data) {
	 			if(!data.firstName || data.firstName === '') {
	 				error('Please fill your first name.', res);
	 			} else if(!data.lastName || data.lastName === '') {
	 				error('Please fill your last name.', res);
	 			} else if(!data.email || data.email === '' || !validEmail(data.email)) {
	 				error('Invalid or missing email.', res);
	 			} else if(!data.password || data.password === '') {
	 				error('Please fill your password.', res);
	 			} else {
	 				getDatabaseConnection(function(db) {
	 					var collection = db.collection('users');
	 					data.password = sha1(data.password);
	 					collection.insert(data, function(err, docs) {
	 						response({
	 							success: 'OK'
	 						}, res);
	 					});
	 				});
	 			}
	 		});
 		break;

 		case 'DELETE':
 			// ...
 		break;
 	};
});