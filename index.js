//import express;

// (after npm install express)
const express = require('express');

const path = require('path');

console.log('first commit done ...');


//
// // create new express app and save it as "app"
const app = express();
//
// // server configuration
app.use('/static', express.static('public'))


const PORT = 8080;
//
// // create a route for the app
//
var  Gpio = require('onoff').Gpio;
var LED = new Gpio(4,'out');

app.use(express.json());


app.get('/', (req, res) => {
	//let {deviceId,val} = req.query;
	//console.log(`Received request - Turn Device ID - ${deviceId} ${val==1?'ON':'OFF'}`);
        //LED.writeSync(parseInt(val));
	//res.send('Hello World, Pi here');
        res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.post('/changeState',(req,res) => {
	let {deviceId,val} = req.body;
	console.log(`Received request - Turn Device ID - ${deviceId} ${val==1?'ON':'OFF'}`);
	LED.writeSync(parseInt(val));
	res.send(JSON.stringify({
		'message' : 'device state changed successfully :)'
	}));

});

//
//   // make the server listen to requests
app.listen(PORT, () => {
     console.log(`Server running at: http://localhost:${PORT}/`);
     });
