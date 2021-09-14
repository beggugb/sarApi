import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Tasa, Tipo } = database;

class TasaService {
    
   static add(newTasas) {    
    return new Promise((resolve, reject) => {
        if(newTasas.productocompaniaId)
        {            
            Tasa.create(newTasas)
            .then((result) => {                
                resolve({ message: "Tasas registrado", result: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message, result: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", result: null })
        }        
   });
  } 

  static adds(data) {    
    return new Promise((resolve, reject) => {        
        Tasa.bulkCreate(data, {individualHooks: true})  
            .then((result) => {              
                resolve({ message: result })
            })
            .catch((reason) => {    
              console.log(reason)            
                reject({ message: reason.message })
              }); 
     });
}

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Tasa.update(dato, { where: { id: Number(datoId) } })
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Tasa.destroy({ where: { id: Number(datoId) } })
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Tasa.findByPk(datoId)
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Tasa.findAll({
	attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
      })
        .then((result) =>
          resolve(result)
        )
        .catch((reason) => reject(reason));
    });
  }
 
  static getAllTasas(productoId) {
    return new Promise((resolve, reject) => {      
       Tasa.findAll({
         raw: true,
         nest: true,        
         order: [['id','ASC']],         
         where: { productocompaniaId: productoId },
	 include: [
            { model: Tipo, attributes: ["id", "nombre"]},
          ],      
       })
         .then((result) =>
           resolve(result)
         )
         .catch((reason) => reject(reason));
     });
   }	

  static getTasas(pcompaniaId,tId,monto) {  
    return new Promise((resolve, reject) => {
       Tasa.findOne({                  
          raw: true,
          nest: true,        
          order: [['productocompaniaId','ASC']], 
          where: {
            [Op.and]: [
              { productocompaniaId: pcompaniaId},
              { tipoId: tId},   
              { desde: {[Op.lte]: monto}},
              { hasta: {[Op.gte]: monto}}
            ]
          },
          attributes: ["id", "tasaContado","tasaCredito","franquicia","productocompaniaId"]
        })
       
         .then((result) =>
           resolve(result)
         )
         .catch((reason) => reject(reason));
     });
   } 
   
   
}

export default TasaService;
