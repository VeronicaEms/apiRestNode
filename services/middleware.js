let jwt = require('jsonwebtoken');
const config = require('../config/database.js');

/*
x-acess-token e a header que o back-end envia apos a verificação do token
bearer autenticação, pois ele trafega um token
slice pega a string apartir da posição especifica
*/
let checkToken = (req, res, next) => {
const token = req.header('Authorization').replace("Bearer ", '');
  /*let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length);
  }*/


  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token não é válido'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'O token de autenticação não foi fornecido'
    });
  }
};

module.exports = {
  checkToken: checkToken
}
