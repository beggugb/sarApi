import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cobertura } = database;

class CoberturaService {
    
   static add(newCobertura) {    
    return new Promise((resolve, reject) => {
        if(newCobertura.label)
        {            
            Cobertura.create(newCobertura)
            .then((cobertura) => {                
                resolve({ message: "Cobertura registrado", cobertura: cobertura })
            })
            .catch((reason) => {                
                reject({ message: reason.message, cobertura: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", cobertura: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Cobertura.update(dato, { where: { id: Number(datoId) } })
        .then((cobertura) => resolve(cobertura))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Cobertura.destroy({ where: { id: Number(datoId) } })
        .then((cobertura) => resolve(cobertura))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Cobertura.findByPk(datoId)
        .then((cobertura) => resolve(cobertura))
        .catch((reason) => reject(reason));
    });
  }

  static list(prop,value){
    return new Promise((resolve,reject) =>{
      Cobertura.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:[[prop,'label'],['id','value']]  
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
}
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cobertura.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],
        attributes: ["id","valor","label"]  
      })
        .then((coberturas) =>
          resolve({
            paginas: Math.ceil(coberturas.count / num),
            pagina: page,
            total: coberturas.count,
            data: coberturas.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default CoberturaService;
