import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { ClausulaProducto, Clausula } = database;

class ClausulaProductosService {

  static data(productoId) {
    return new Promise((resolve, reject) => {
     ClausulaProducto.findAll({
         raw: true,
         nest: true,
         order: [['id','ASC']],
         where: { productoId: productoId },
         attributes:["id", "label","key","productocompaniaId","clausulaId","productoId"]    
       })
         .then((productos) =>
           resolve(productos)
         )
         .catch((reason) => reject(reason));
     });
   }
   static datas(pId) {
    return new Promise((resolve, reject) => {      
       ClausulaProducto.findAll({
         raw: true,
         nest: true,        
         order: [['id', 'ASC']],
         where: { productoclausulaId: pId }                  
       })
         .then((result) =>
           resolve(result)
         )
         .catch((reason) => reject(reason));
     });
   }

   static list(prop,value){
    return new Promise((resolve,reject) =>{
      ClausulaProducto.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:[[prop,'label'],['id','value']]  
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
  }
  static item(datoId) {
    return new Promise((resolve, reject) => {
      ClausulaProducto.findByPk(datoId)
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }
   
  static add(data) {
    return new Promise((resolve, reject) => {
        ClausulaProducto.bulkCreate(data, {individualHooks: true})
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
    }
  	
  static update(data) {
    return new Promise((resolve, reject) => {     
	ClausulaProducto.bulkCreate(data, {
      updateOnDuplicate: ["id"]
  })    
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      ClausulaProducto.destroy({ where: { productoId: Number(datoId) } })
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      ClausulaProducto.findByPk(datoId)
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

 
 
  	
  

   static getAllCProducto(companiaId) {
   return new Promise((resolve, reject) => {
    ClausulaProducto.findAll({
        raw: true,
        nest: true,
        order: [['id','ASC']],
        where: { productocompaniaId: companiaId },
        attributes:["label","key","productocompaniaId","clausulaId","productoId"]
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  }	
 
   
}

export default ClausulaProductosService;
