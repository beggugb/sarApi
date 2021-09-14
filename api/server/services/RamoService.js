import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Ramo } = database;

class RamoService {
    
   static add(newRamo) {    
    return new Promise((resolve, reject) => {
        if(newRamo.nombre)
        {            
            Ramo.create(newRamo)
            .then((ramo) => {                
                resolve({ message: "Ramo registrado", ramo: ramo })
            })
            .catch((reason) => {                
                reject({ message: reason.message, ramo: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Ramo: null })
        }        
   });
  } 
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Ramo.update(dato, { where: { id: Number(datoId) } })
        .then((ramo) => resolve(ramo))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Ramo.destroy({ where: { id: Number(datoId) } })
        .then((ramo) => resolve(ramo))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Ramo.findByPk(datoId)
        .then((ramo) => resolve(ramo))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Ramo.findAll({
	attributes: [["id","value"],["nombre","label"],"id","icono"],      
        order: [['nombre','ASC']]
      })
        .then((Ramoes) =>
          resolve(Ramoes)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Ramo.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
      })
        .then((ramos) =>
          resolve({
            paginas: Math.ceil(ramos.count / num),
            pagina: page,
            total: ramos.count,
            data: ramos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default RamoService;
