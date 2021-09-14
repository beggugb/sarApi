import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Propaganda } = database;

class PropagandaService {
    
   static add(newPropaganda) {    
    return new Promise((resolve, reject) => {
        if(newPropaganda.desc)
        {            
            Propaganda.create(newPropaganda)
            .then((Propaganda) => {                
                resolve({ message: "Propaganda registrado", Propaganda: Propaganda })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Propaganda: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Propaganda: null })
        }        
   });
  } 
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Propaganda.update(dato, { where: { id: Number(datoId) } })
        .then((Propaganda) => resolve(Propaganda))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Propaganda.destroy({ where: { id: Number(datoId) } })
        .then((Propaganda) => resolve(Propaganda))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Propaganda.findByPk(datoId)
        .then((Propaganda) => resolve(Propaganda))
        .catch((reason) => reject(reason));
    });
  }

  static lista(fecha) {  
   return new Promise((resolve, reject) => {
      Propaganda.findAll({
        raw: true,
        nest: true,
        attributes: [["id","value"],"image","desc","vigencia"],              
        order: [['id','ASC']],        
        where: { vigencia: { [Op.gte]: fecha}}
      })
        .then((Propagandaes) =>
          resolve(Propagandaes)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Propaganda.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
      })
        .then((Propagandas) =>
          resolve({
            paginas: Math.ceil(Propagandas.count / num),
            pagina: page,
            total: Propagandas.count,
            data: Propagandas.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default PropagandaService;
