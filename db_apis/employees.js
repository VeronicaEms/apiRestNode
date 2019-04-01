const database = require('../services/database.js');
 
/* O módulo baseQuery traz o módulo de banco de dados genérico e inicializa uma 
constante denominada baseQuery para uma consulta SQL na tabela employees. 
Em seguida, uma função chamada find é declarada e usada para executar a consulta e retornar as linhas buscadas
Se o parâmetro de contexto transmitido tiver um valor de id "geral",
uma cláusula where será anexada à consulta, de modo que apenas um único funcionário seja retornado.
*/
const baseQuery = 
 `select id_pessoa "id_pessoa",
    nome "nome"
  from fn_pessoa `;
 
  async function find(context) {
    let query = baseQuery;
    const binds = {};
 
  if (context.id) {
    binds.id_pessoa = context.id;
 
    query += `\n where id_pessoa = :id_pessoa`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;
