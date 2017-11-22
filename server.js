var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static('www'));
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'), function(){
	console.log("Escuchando en el puerto "+ app.get('port'));
});