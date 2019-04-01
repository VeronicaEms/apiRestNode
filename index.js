const webServer = require('./services/web-server.js');


//  *** line that requires services/web-server.js is here ***
const database = require('./services/database.js');

 
/* O módulo principal traz o módulo do servidor da web e, em seguida,
 define e chama uma função assíncrona denominada inicialização
Como a função initialize do módulo do servidor web retorna uma promessa,
você pode usá-lo com async/await e envolvê-lo em um bloco try-catch,
Se a função de inicialização terminar com sucesso, o servidor da Web estará em execução;
caso contrário, quaisquer exceções serão capturadas e tratadas
 
 */
async function startup() {
  console.log('Starting application');

  try {
    console.log('Initializing web server module');
 
    await webServer.initialize();
  } catch (err) {
    console.error(err);
 
    process.exit(1); // Non-zero failure code
  }
  
 
  try {
    console.log('Initializing database module');
 
    await database.initialize(); 
  } catch (err) {
    console.error(err);
 
    process.exit(1); // Non-zero failure code
  }
}
 
startup();

// *** previous code above this line ***
 
 
async function shutdown(e) {
  let err = e;
    
  console.log('Shutting down');
 
  try {
    console.log('Closing database module');
 
    await database.close(); 
  } catch (err) {
    console.log('Encountered error', e);
 
    err = err || e;
  }
 
  console.log('Exiting process');
 
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
 
process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
 
  shutdown();
});
 
process.on('SIGINT', () => {
  console.log('Received SIGINT');
 
  shutdown();
});
 
process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);
 
  shutdown(err);
});
