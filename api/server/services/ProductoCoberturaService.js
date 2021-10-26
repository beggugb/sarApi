import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { ProductoCobertura, Cobertura, CoberturaProducto } = database;

class ProductoCoberturaService {

  static data(productoId) {
    return new Promise((resolve, reject) => {
       ProductoCobertura.findAll({
         raw: true,
         nest: true,        
         where: { productoId: productoId},
         order: [['id', 'ASC']],
         attributes: ["id", "label","productoId","coberturaId"]               
       })
         .then((productos) =>
           resolve(productos)
         )
         .catch((reason) => reject(reason));
     });
   }
    
   static add(data) {    
     return new Promise((resolve, reject) => {
      ProductoCobertura.bulkCreate(data, {individualHooks: true})	     
      /*ProductoCobertura.create(newProductoCoberturass)*/
        .then((result) => {                
            resolve(result)
         })
        .catch((reason) => {                
            reject({ message: reason.message, result: null })
         });            
   });
  } 

  static update(data) {
    return new Promise((resolve, reject) => {
     /* ProductoCobertura.update(dato, { where: { id: Number(datoId) } })*/
     ProductoCobertura.bulkCreate(data, {updateOnDuplicate: true})	    
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      ProductoCobertura.destroy({ where: { productoId: Number(datoId) } })
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      ProductoCobertura.findByPk(datoId)
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      ProductoCobertura.findAll({
	    attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
      })
        .then((result) =>
          resolve(result)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(productoId) {
   return new Promise((resolve, reject) => {      
      ProductoCobertura.findAll({
        raw: true,
        nest: true,        
        order: [['id','ASC']],
        attributes: ["id","valor","label"],
        where: { productoId: productoId },                  
        include: [{ model: Cobertura, attributes: ["id", "label"]}]    
      })
        .then((result) =>
          resolve(result)
        )
        .catch((reason) => reject(reason));
    });
  }

 	
  
}

export default ProductoCoberturaService;


