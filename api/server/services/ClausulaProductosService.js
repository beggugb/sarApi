import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { ClausulaProducto, Clausula } = database;

class ClausulaProductosService {
    
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
     /* ClausulaProducto.update(dato, { where: { id: Number(datoId) } })*/
	ClausulaProducto.bulkCreate(data, {updateOnDuplicate: true})    
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

  static lista() {  
   return new Promise((resolve, reject) => {
      ClausulaProducto.findAll({
	attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
      })
        .then((result) =>
          resolve(result)
        )
        .catch((reason) => reject(reason));
    });
  }
 
  static getAll(pId) {
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
  static getAllProducto(productoId) {
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
