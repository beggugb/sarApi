import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Ubicacion } = database;

class UbicacionService {
    
   static add(newUbicacion) {    
    return new Promise((resolve, reject) => {
        if(newUbicacion.nombre)
        {            
            Ubicacion.create(newUbicacion)
            .then((Ubicacion) => {                
                resolve({ message: "Ubicacion registrado", Ubicacion: Ubicacion })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Ubicacion: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Ubicacion: null })
        }        
   });
  } 
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Ubicacion.update(dato, { where: { id: Number(datoId) } })
        .then((Ubicacion) => resolve(Ubicacion))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Ubicacion.destroy({ where: { id: Number(datoId) } })
        .then((Ubicacion) => resolve(Ubicacion))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Ubicacion.findByPk(datoId)
        .then((Ubicacion) => resolve(Ubicacion))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Ubicacion.findAll({
	attributes: [["id","value"],["nombre","label"],"id","icono"],      
        order: [['nombre','ASC']]
      })
        .then((Ubicaciones) =>
          resolve(Ubicaciones)
        )
        .catch((reason) => reject(reason));
    });
  }
  static listas() {  
    return new Promise((resolve, reject) => {
       Ubicacion.findAll({
        raw: true,
        nest: true,
        attributes: ["id","tipo","nombre","direccion","filename","latitude","longitude"] 
       })
         .then((Ubicaciones) =>
           resolve(Ubicaciones)
         )
         .catch((reason) => reject(reason));
     });
   }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Ubicacion.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
      })
        .then((Ubicacions) =>
          resolve({
            paginas: Math.ceil(Ubicacions.count / num),
            pagina: page,
            total: Ubicacions.count,
            data: Ubicacions.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default UbicacionService;
