import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { NotaCobranza } = database;

class NotaCobranzaService {

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      NotaCobranza.update(dato, { where: { id: Number(datoId) } })
        .then((pagos) => resolve(pagos))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(notaId) {
    return new Promise((resolve, reject) => {
      NotaCobranza.findByPk(notaId,{
        raw: true,
        nest: true
      })
        .then((notas) => resolve(notas))
        .catch((reason) => reject(reason));
    });
  }
    
   static add(newPoliza) {    
    return new Promise((resolve, reject) => {
      NotaCobranza.create(newPoliza,{raw: true,
        nest: true })
        .then((nota) => {                
           resolve(nota)
       })
       .catch((reason) => {                
         reject({ message: reason.message, Tipo: null })
      });            
   });
  } 
  static getAllPoliza(polizaId) {
   return new Promise((resolve, reject) => {
    NotaCobranza.findOne({
        raw: true,
        nest: true,
        where: { polizaId: polizaId },
	attributes: ["id","nro","num","primaTotal","ivigencia","fvigencia"]    
      })
        .then((nota) =>
          resolve(nota)
        )
        .catch((reason) => reject(reason));
    });
  }
	

  
}

export default NotaCobranzaService;
