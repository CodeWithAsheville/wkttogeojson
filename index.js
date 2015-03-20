var parseWKT = require('wellknown');

var stringify = require('csv-stringify');
var generate = require('csv-generate');
var request = require('request');
var parseCSV = require('csv-parse');


var express = require('express');
var app = express();

var path = require('path');


app.set('port', (process.env.PORT || 3000));

var http = require('http').Server(app);

app.use('/img',express.static(path.join(__dirname, 'img')));
app.use('/js',express.static(path.join(__dirname, 'js')));
app.use('/styles',express.static(path.join(__dirname, 'styles')));
app.use('/vendor_lib',express.static(path.join(__dirname, 'node_modules')));

app.get('/wkttogeojson', function(req, res){
	  // res.send('id: ' + req.url);

	  source_url = req.url.replace("/wkttogeojson?id=", "");
	  var csv;
	  var final_output;

		request.get(source_url, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        csv = body;
		        // Continue with your processing here.


				// require('should');

				parseCSV(csv, {comment: '#'}, function(err, output){
					// console.log("output", output);
					for(index in output){
						row = output[index];
						console.log(row);
						console.log(row[7]);
						wkt_string = row[7];
						geo_json= parseWKT(row[7]);
						console.log(geo_json);

						if(geo_json != null){

							output[index][7] = JSON.stringify(geo_json);
						}

						// break;
					}
					final_output = output;


					// input = [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ];
					stringify(final_output, function(err, csv_output){
					  // output.should.eql('1,2,3,4\na,b,c,d');
		        	  res.send(csv_output);

					});



				  // output.should.eql([ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]);
				});




		    }
		});



//  res.sendFile(__dirname + '/index.html');
});


http.listen( (process.env.PORT || 3000), function(){
  console.log('listening on *:'+  (process.env.PORT || 3000) );
  console.log(parseWKT('POINT(1 2)'));
});

