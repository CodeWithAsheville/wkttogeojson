// Core Libraries
var request = require('request');

var parseWKT = require('wellknown');

var stringify = require('csv-stringify');
var parseCSV = require('csv-parse');

// Typical Express Stuff
var express = require('express');
var app = express();

var path = require('path');

app.set('port', (process.env.PORT || 3000));

var http = require('http').Server(app);

app.use('/img',express.static(path.join(__dirname, 'img')));

app.get('/wkttogeojson', function(req, res){

	  source_url = req.url.replace("/wkttogeojson?id=", "");

		request.get(source_url, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        // Continue with your processing here.

				parseCSV(body, {comment: '#'}, function(err, output){
					for(index in output){
						geo_json= parseWKT(output[index][7]);

						if(geo_json != null){
							output[index][7] = JSON.stringify(geo_json);
						}
					}
					stringify(output, function(err, csv_output){
		        	  res.send(csv_output);
					});
				});
		    }
		});
});


http.listen( (process.env.PORT || 3000), function(){
  console.log('listening on *:'+  (process.env.PORT || 3000) );
  // console.log(parseWKT('POINT(1 2)'));
});

