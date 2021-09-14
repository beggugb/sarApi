import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Clausula } = database;

class ClausulaService {
    
   static add(newClausula) {    
    return new Promise((resolve, reject) => {
        if(newClausula.label)
        {            
            Clausula.create(newClausula)
            .then((clausula) => {                
                resolve({ message: "Clausula registrado", clausula: clausula })
            })
            .catch((reason) => {                
                reject({ message: reason.message, clausula: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", clausula: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Clausula.update(dato, { where: { id: Number(datoId) } })
        .then((clausula) => resolve(clausula))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Clausula.destroy({ where: { id: Number(datoId) } })
        .then((clausula) => resolve(clausula))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Clausula.findByPk(datoId)
        .then((clausula) => resolve(clausula))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Clausula.findAll({
	attributes: [["id","valor"],"label"],      
        order: [['label','ASC']]
      })
        .then((clausulaes) =>
          resolve(clausulaes)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Clausula.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
      })
        .then((clausulas) =>
          resolve({
            paginas: Math.ceil(clausulas.count / num),
            pagina: page,
            total: clausulas.count,
            data: clausulas.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default ClausulaService;
