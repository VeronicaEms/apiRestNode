const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');
 

/*
Este módulo primeiro traz o node-oracledb e o arquivo de configuração.
Em seguida, uma função assíncrona denominada initialize é definida e
posteriormente exposta por meio do objeto module.exports.
A função initialize cria um conjunto de conexões que é armazenado em um cache
do conjunto de conexões internas como o pool “padrão”
*/
async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
}
 
module.exports.initialize = initialize;

// *** previous code above this line ***
 
/*
função close usa o método oracledb.getPool () para recuperar de forma síncrona
o pool padrão e invoca o método close no pool para fechá-lo.
*/
async function close() {
  await oracledb.getPool().close();
}
 
module.exports.close = close;

// *** previous code above this line ***
 
function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
 
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
 
    try {
      conn = await oracledb.getConnection();
 
      const result = await conn.execute(statement, binds, opts);
 
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);

        }
      }
    }
  });
}
 
module.exports.simpleExecute = simpleExecute;
