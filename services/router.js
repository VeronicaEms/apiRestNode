const express = require('express');
const router = new express.Router();
const employees = require('../controllers/employees.js');
const login = require('../controllers/login.js');
const middleware = require('./middleware.js');

/*
O módulo roteador inicia trazendo Express e, em seguida, cria uma nova instância da classe Express Router.
O método de roteamento do roteador é usado para definir uma rota com base no caminho de rota passado.
O caminho inclui um parâmetro chamado id, que é feito opcional pelo ponto de interrogação que o segue.
A rota retornada da rota possui métodos que correspondem aos métodos HTTP e permitem que os manipuladores sejam definidos. Nesse caso, o método get é usado para mapear uma solicitação GET de entrada para a função get definida no controlador employees
*/

router.route('/employees/:id?')
.get(employees.get)
.post(middleware.checkToken, employees.post)
.put(employees.put)
.delete(employees.remove);

router.route("/employees/search/:email?")
.get(employees.email);

router.route("/login/")
.post(login.post); 
 
module.exports = router;
