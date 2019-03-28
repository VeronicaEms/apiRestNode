/*
este arquivo permite que algumas propriedades sejam configuradas através de variáveis ​​de ambiente
ajuda a manter as senhas e outras informações confidenciais fora do código-fonte
*/

module.exports = {
    hrPool: {
      user: process.env.HR_USER,
      password: process.env.HR_PASSWORD,
      connectString: process.env.HR_CONNECTIONSTRING,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
  };
