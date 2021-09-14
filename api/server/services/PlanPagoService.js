import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { PlanPago } = database;

class PlanPagoService {
    
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      PlanPago.update(dato, { where: { id: Number(datoId) } })
        .then((pagos) => resolve(pagos))
        .catch((reason) => reject(reason));
    });
  }
  static add(data) {
    return new Promise((resolve, reject) => {
        PlanPago.bulkCreate(data, {individualHooks: true})
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
    }
   static getAllNota(notaId) {
   return new Promise((resolve, reject) => {
    PlanPago.findAll({
        raw: true,
        nest: true,
        order: [['id','ASC']],
        where: { notaId: notaId },
        attributes: ["id","ncuota","monto","estado","fechaPago"]    
      })
        .then((pagos) =>
          resolve(pagos)
        )
        .catch((reason) => reject(reason));
    });
  }
	
 
   
}

export default PlanPagoService;
