import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { PClausulas, Clausula } = database;

class PClausulaService {
    
  static add(data) {
    return new Promise((resolve, reject) => {
        PClausulas.bulkCreate(data, {individualHooks: true})
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
    }

   static getAllPoliza(polizaId) {
   return new Promise((resolve, reject) => {
    PClausulas.findAll({
        raw: true,
        nest: true,
        order: [['id','ASC']],
        where: { polizaId: polizaId },
        attributes: ["label","key","polizaId","clausulaId"],
        include: [
            { model: Clausula, attributes: ["id", "label"]},
       ],

      })
        .then((clausulas) =>
          resolve(clausulas)
        )
        .catch((reason) => reject(reason));
    });
  }
	
 
   
}

export default PClausulaService;
