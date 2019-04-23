const jwt = require('jsonwebtoken');
const config = require('../config/database.js');

/*
x-acess-token é a header que o back-end envia apos a verificação do token
bearer autenticação, pois ele trafega um token
slice pega a string a partir da posição específica
*/
let checkToken = (req, res, next) => {
  /*let token = req.headers['x-access-token'] || req.headers['Authorization'];
  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length); }*/
    const token = req.header('Authorization').replace("Bearer ", '');
  
console.log(token);
  if (token) {
    jwt.verify(token, config.hrPool.secret, (err, decoded) => {

      if (err) {
        return res.json({
          success: false,
          message: 'Token não é válido',
          token,
          err     
        });

      } else {
        req.decoded = decoded;
       next();
        /*return res.json({
          success: true,
          message: 'Token ok'     
        });*/
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
