import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Mensaje , Cliente } = database;

class PushService {    

  static getMensajes(pag,num,clienteId) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Mensaje.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        where:{usuarioId: clienteId },
        order: [['id','DESC']],               
        include: [{ model: Cliente, attributes: ["id", "nombres"]}]
      })
        .then((Tipos) =>
          resolve({
            paginas: Math.ceil(Tipos.count / num),
            pagina: page,
            total: Tipos.count,
            data: Tipos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }
	
	

  
}

export default PushService;
