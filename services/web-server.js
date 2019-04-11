const http = require('http');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');

let httpServer;

/*A função retorna imediatamente uma promessa que é resolvida ou rejeitada,
 dependendo se o servidor da Web foi iniciado com êxito.*/

function initialize() {
  return new Promise((resolve, reject) => {
    /*Um novo aplicativo expresso é criado (o que é realmente apenas uma função) 
     e usado para criar um servidor http através do módulo http. */
    const app = express();
    httpServer = http.createServer(app);
 
    
    app.use(cors({
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
    }));

    /*
    Morgan é um dos melhores registros em log HTTP. 
    */
     app.use(morgan('combined'));

     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({ extended: true }));
    
     /* Montar o roteador em api, todas as rotas começam com api
     Isso significa que o URL completo para o terminal dos funcionários será:
     http: // server: port / api / employees /: id . */
     app.use('/api', router);
 

     httpServer.listen(webServerConfig.port)
     .on('listening', () => {
       console.log(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}
 
module.exports.initialize = initialize;


 /*
 A função close retorna uma promessa que é resolvida quando o servidor da web é fechado com sucesso.
O método httpServer.close impede que novas conexões sejam estabelecidas, mas não forçará as conexões já abertas a serem fechadas.
Como o http-shutdown , para forçar a abertura de conexões fechadas.
*/

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
 
      resolve();
    });
  });
}
 
module.exports.close = close;
