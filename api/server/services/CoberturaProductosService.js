import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { CoberturaProducto, Cobertura } = database;

class CoberturaProductosService {
    
/*   static add(newCoberturaProductos) {    
    return new Promise((resolve, reject) => {
        if(newCoberturaProductos.label)
        {            
            CoberturaProducto.create(newCoberturaProductos)
            .then((result) => {                
                resolve({ message: "CoberturaProductos registrado", result: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message, result: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", result: null })
        }        
   });
  } 
*/
  static add(data) {
    return new Promise((resolve, reject) => {
        CoberturaProducto.bulkCreate(data, {individualHooks: true})
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
     /* CoberturaProducto.update(dato, { where: { id: Number(datoId) } })*/
      CoberturaProducto.bulkCreate(data, {updateOnDuplicate: true})	    
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      CoberturaProducto.destroy({ where: { productoId: Number(datoId) } })
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      CoberturaProducto.findByPk(datoId)
        .then((result) => resolve(result))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      CoberturaProducto.findAll({
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
       CoberturaProducto.findAll({
         raw: true,
         nest: true,        
         order: [['id', 'ASC']],
         where: { productocoberturaId: pId }                  
       })
         .then((result) =>
           resolve(result)
         )
         .catch((reason) => reject(reason));
     });
   }	
  static getAllProducto(productoId) {
   return new Promise((resolve, reject) => {
    CoberturaProducto.findAll({
        raw: true,
        nest: true,
        order: [['id','ASC']],
        where: { productoId: productoId },
        attributes: ["id", "label","key","productocompaniaId","coberturaId","productoId"]     
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  }

   static getAllCProducto(companiaId) {
   return new Promise((resolve, reject) => {
    CoberturaProducto.findAll({
        raw: true,
        nest: true,
        order: [['id','ASC']],
        where: { productocompaniaId: companiaId },
        attributes: ["label","key","productocompaniaId","coberturaId","productoId"]
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  }	
 
   
}

export default CoberturaProductosService;
