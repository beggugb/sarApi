import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Campana } = database;

class CampanaService {

    static getCampanaActiva(fecha) {
        return new Promise((resolve, reject) => {
           Campana.findAll({
             raw: true,
             nest: true,         
             where: {
              [Op.and]: [
                { inicio: { [Op.between]: [fecha, fecha]}}            
              ]
             },
             order: [['inicio', 'ASC']],           
           })
             .then((campana) =>
               resolve(campana)
             )
             .catch((reason) => reject(reason));
         });
       }   
    
   static add(newCampana) {    
    return new Promise((resolve, reject) => {
        if(newCampana.nombre)
        {            
            Campana.create(newCampana)
            .then((campana) => {                
                resolve({ message: "Campana registrado", campana: campana })
            })
            .catch((reason) => {                
                reject({ message: reason.message, campana: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Campana: null })
        }        
   });
  } 
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Campana.update(dato, { where: { id: Number(datoId) } })
        .then((campana) => resolve(campana))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Campana.destroy({ where: { id: Number(datoId) } })
        .then((campana) => resolve(campana))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Campana.findByPk(datoId)
        .then((campana) => resolve(campana))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Campana.findAll({
	attributes: [["id","value"],["nombre","label"],"id","icono"],      
        order: [['nombre','ASC']]
      })
        .then((Campanaes) =>
          resolve(Campanaes)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Campana.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
      })
        .then((campanas) =>
          resolve({
            paginas: Math.ceil(campanas.count / num),
            pagina: page,
            total: campanas.count,
            data: campanas.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default CampanaService;
