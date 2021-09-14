import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { ProductoClausula, Clausula, ClausulaProducto } = database;

class ProductoClausulaService {
    
   static add(data) {    
    return new Promise((resolve, reject) => {
      ProductoClausula.bulkCreate(data, {individualHooks: true})	    
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
     /* ProductoClausula.update(dato, { where: { id: Number(datoId) } })*/
     ProductoClausula.bulkCreate(data, {updateOnDuplicate:true})	    
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      ProductoClausula.destroy({ where: { productoId: Number(datoId) } })
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      ProductoClausula.findByPk(datoId)
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      ProductoClausula.findAll({
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
      ProductoClausula.findAll({
        raw: true,
        nest: true,        
        order: [['id','ASC']],
        attributes: ["id","valor","label"],
        where: { productoId: productoId },                  
        include: [{ model: Clausula, attributes: ["id", "label"]}]    
      })
        .then((result) =>
          resolve(result)
        )
        .catch((reason) => reject(reason));
    });
  }

static getAllProducto(productoId) {
   return new Promise((resolve, reject) => {
      ProductoClausula.findAll({
        raw: true,
        nest: true,
        where: { productoId: productoId},
        order: [['id', 'ASC']],
	attributes: ["id", "label","productoId","clausulaId"]      
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  } 	
  
}

export default ProductoClausulaService;
