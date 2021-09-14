import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Tipo } = database;

class TipoService {
    
   static add(newTipo) {    
    return new Promise((resolve, reject) => {
        if(newTipo.nombre)
        {            
            Tipo.create(newTipo)
            .then((Tipo) => {                
                resolve({ message: "Tipo registrado", Tipo: Tipo })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Tipo: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Tipo: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Tipo.update(dato, { where: { id: Number(datoId) } })
        .then((Tipo) => resolve(Tipo))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Tipo.destroy({ where: { id: Number(datoId) } })
        .then((Tipo) => resolve(Tipo))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Tipo.findByPk(datoId)
        .then((Tipo) => resolve(Tipo))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Tipo.findAll({
	attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
      })
        .then((Tipoes) =>
          resolve(Tipoes)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Tipo.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
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

export default TipoService;
