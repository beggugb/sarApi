import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Comision } = database;

class ComisionService {    
  
  static add(data) {
    return new Promise((resolve, reject) => {
        Comision.create(data)
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
    }
    static total(desde,hasta) { 
      return new Promise((resolve, reject) => {
          Comision.findOne({ 
            raw: true,
            nest: true,
            attributes: [[Sequelize.fn('sum', Sequelize.col('monto')), 'total']],
            where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          
            })        
            .then((result) => { resolve(result) })
              .catch((reason) => {
                  reject({ message: reason.message })
                });
       });
    }
  
    static totalDetalle(desde,hasta) {
      return new Promise((resolve, reject) => {
         Comision.findAndCountAll({
           raw: true,
           nest: true,         
           where: {
            [Op.and]: [
              { ivigencia: { [Op.between]: [desde, hasta]}}            
            ]
           },
           order: [['updatedAt', 'DESC']],           
         })
           .then((comisiones) =>
             resolve({
               total: comisiones.count,
               data: comisiones.rows,
             })
           )
           .catch((reason) => reject(reason));
       });
     }   
}

export default ComisionService;
