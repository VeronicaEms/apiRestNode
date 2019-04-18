const database = require('../services/database.js');
const oracledb = require('oracledb');
 
/* O módulo baseQuery traz o módulo de banco de dados genérico e inicializa uma 
constante denominada baseQuery para uma consulta SQL na tabela employees. 
Em seguida, uma função chamada find é declarada e usada para executar a consulta e retornar as linhas buscadas
Se o parâmetro de contexto transmitido tiver um valor de id "geral",
uma cláusula where será anexada à consulta, de modo que apenas um único funcionário seja retornado.
*/
const baseQuery = `select id_pessoa, nome, apelido, email, password from rjs_pessoa`;

  async function find(context) {
    let query = baseQuery;
    const binds = {};
 
  if (context.id) {
    binds.id_pessoa = context.id;
 
    query += `\n where id_pessoa = :id_pessoa`;
  }
  console.log(employee);
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;


//Uma constante chamada createSql foi criada para inserção dos dados na tabela. 
const createSql = `insert into rjs_pessoa (id_pessoa, nome, apelido, email, password)
values (srjs_pessoa.nextval, :nome, :apelido, :email, :password) returning id_pessoa into :id_pessoa`;

 
//Dentro da função create, uma constante "emp" é definida e inicializada
  
 async function create(emp) {
   const employee =  {
    nome: emp.nome,
    apelido: emp.apelido,
    email: emp.email,
    password: emp.password,
    id_pessoa: {
      type: oracledb.NUMBER,
      dir: oracledb.BIND_OUT
    }
  }


   const result = await database.simpleExecute(createSql, employee);
   //employee = result.outbinds.employee[0];
   //return employee;
   return result;
 }

 module.exports.create = create;


