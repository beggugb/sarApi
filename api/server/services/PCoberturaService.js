import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { PCoberturas, Cobertura } = database;

class PCoberturaService {
    
  static add(data) {
    return new Promise((resolve, reject) => {
        PCoberturas.bulkCreate(data, {individualHooks: true})
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
    PCoberturas.findAll({
        raw: true,
        nest: true,
        order: [['id','ASC']],
        where: { polizaId: polizaId },
        attributes: ["label","key","polizaId","coberturaId"],
	include: [
            { model: Cobertura, attributes: ["id", "label"]},
       ],    
	    
      })
        .then((coberturas) =>
          resolve(coberturas)
        )
        .catch((reason) => reject(reason));
    });
  }

   
}

export default PCoberturaService;
