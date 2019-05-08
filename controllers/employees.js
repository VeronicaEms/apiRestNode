const employees = require('../db_apis/employees.js'); // a api do banco de dados
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/* Uma função assíncrona chamada get é declarada. Um bloco try-catch
é usado no corpo da função para capturar exceções lançadas
no thread principal e passá-las para a próxima função. 

Linhas 16 a 18 = Um context é declarado:
este é um objeto genérico que conterá propriedades que são relevantes para o método find da API do banco de dados. 
Uma propriedade id é adicionada ao contexto com base no valor que vem via req.params.id.

O objeto req.params é apenas uma das várias propriedades usadas para obter dados do objeto de solicitação de entrada.
  
  */

 async function get(req, res, next) {
  try {
    let rows = "";
    if (req.params.id) {
      id = parseInt(req.params.id, 10);
      rows = await employees.findOne(id);
    } else {
      rows = await employees.getAll(req);
    }
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else if (rows.rows.length > 0){
      res.status(200).json(rows.rows);
    }else {
      res.status(404).end();
    } 

  } catch (err) {
    next(err);
  }
}
module.exports.get = get;
 

/*Criando com pedidos post
Solicitações HTTP POST são usadas para criar novos registros (neste caso). 
A função getEmployeeFromRec aceita um objeto de solicitação e retorna um objeto
com as propriedades necessárias para criar um registro.
A função foi declarada fora da função post para que possa ser usada posteriormente para solicitações PUT.*/
function getEmployeeFromRec(req) {
  const employee = {
    nome: req.body.nome,
    apelido: req.body.apelido,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  }
return employee;
}

/*A função post usa getEmployeeFromRec para inicializar uma variável
que é então passada para o método de criação da API do banco de dados */

async function post(req, res, next) {
 try {
  let employee = getEmployeeFromRec(req);
  console.log(employee);
  employee = await employees.create(employee);

/*Após a operação de criação, um código de status “201 Created”,
juntamente com o JSON da pessoa (incluindo o novo valor de ID da pessoa), é enviado ao cliente.*/
 res.status(201).json(employee);
  } catch (err) {
    next(err);
  }}

module.exports.post = post;


async function put(req, res, next) {
    try {
      const updateFields = {
        id_pessoa: req.body.id_pessoa,
        nome: req.body.nome,
        apelido: req.body.apelido,
        email: req.body.email
      };
      const changedRows = await employees.putAll(updateFields);
      if (changedRows > 0) {
        res.status(200).json({ status: 200, changedRows: changedRows });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
module.exports.put = put;


/*async function remove(req, res, next) {
  try {
    const rowsAffected = await employees.removeOne(req.body);
    if (rowsAffected > 0) {
      res.status(200).json({ status: 200, rowsAffected: rowsAffected });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
    }
  }
  module.exports.remove = remove;*/

  async function remove(req, res, next) {
    try {
      console.log(">>> CTRLLS REMOVE() ", req.params.id);
      const affectedRows = await employees.removeOne({
        id_pessoa: req.params.id
      });
      if (affectedRows > 0) {
        res.status(200).json({ status: 200, affectedRows: affectedRows });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
  module.exports.remove = remove;
