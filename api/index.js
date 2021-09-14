import http from 'http'
import express from 'express'
import routes from './server/routes'
import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import fs from 'fs'
import shell from 'shelljs'
import date from 'date-and-time';
import cron from 'node-cron'

var hostname = '192.168.0.100'
var port = 4000
var app = express()
var server = http.createServer(app)
var multer  = require('multer')

var moment = require('moment-timezone');
moment().tz("America/La_Paz").format();

app.use('/api/static', express.static(__dirname + '/public'));
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app);
app.get('*', (req, res) => 
  res.status(200).send({
	  message: "Welcome API ERP"
}))

cron.schedule("00 12 * * *", function() {  
  console.log("Runing Cron Job")
  if (shell.rm('-rf',__dirname + '/public/images/trash/*').code !== 0) {
      shell.mkdir(__dirname + '/public/images/trash/')
      shell.exit(1);
    }
  else{
     shell.echo("Files Deletes");
  }

});

server.listen(port, hostname, () =>{
	console.log(`Server is runing ar http://${hostname}:${port}/`)
})
