const userdb = require("../db_apis/login.js"); // a api do banco de dados
const jwt = require("jsonwebtoken");
const config = require("../config/database.js");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
//A function abaixo cria um object array com dois elementos: o user e o pass que vem do req.body
function getUserPassFromRequest(req) {
  return {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
    //password: req.body.password
  };

}

async function post(req, res, next) {
  try {
    // busca o ID_PESSOA na tabela do banco de dados, conforme email e senha informado no req.body
console.log("REQQQQQQ",req.body.email);
    let user = await userdb.find(getUserPassFromRequest(req));
    console.log("Controllers POST:", user);
   

    // Caso o user retorna o user.id_pessoa o mesmo ira criar o token de acesso.
    if (user.id_pessoa > 0) {
      console.log("Controllers ID_PERSON:", user.id_pessoa);
      console.log("Controllers SECRET:", config.hrPool.secret);
      let token = jwt.sign(
        { id_pessoa: user.id_pessoa },
        config.hrPool.secret,
        {
          //expiresIn: "1h"
        }
      );
console.log("TOKEN:", token);
      res.json({
        success: true,
        message: "Autenticado com sucesso",
        token: token
      });
    } else {
      let msg = "Autenticação falhou";
      if (user.id_pessoa === 0) {
        msg = msg + " - email informado não encontrado";
      } else if (user.id_pessoa === -1) {
        msg = msg + " - senha ou email não encontrado";
      }
      // caso nao tenho encontrado o email e senha recusa a autenticação.
      res.json({
        success: false,
        message: msg,
        token: null
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;


