const employees = require('../db_apis/employees.js'); // a api do banco de dados
 

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
    const context = {};
 
    context.id = parseInt(req.params.id, 10);

    const rows = await employees.find(context);
    
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 

module.exports.get = get;
