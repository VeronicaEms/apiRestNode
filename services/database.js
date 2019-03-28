/*
Este módulo primeiro traz o node-oracledb e o arquivo de configuração.
Em seguida, uma função assíncrona denominada initialize é definida e
posteriormente exposta por meio do objeto module.exports.
A função initialize cria um conjunto de conexões que é armazenado
em um cache do conjunto de conexões internas como o pool “padrão”.
*/

const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');
 
async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
}
 
module.exports.initialize = initialize;
