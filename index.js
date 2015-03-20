var parse = require('wellknown');




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
	  res.send('Source URL: ' + source_url);
	  
//  res.sendFile(__dirname + '/index.html');
});


http.listen( (process.env.PORT || 3000), function(){
  console.log('listening on *:'+  (process.env.PORT || 3000) );
  console.log(parse('POINT(1 2)'));
});

