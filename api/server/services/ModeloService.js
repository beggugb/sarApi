import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Modelo, Tipo, Marca } = database;

class ModeloService {
    
   static add(newModelo) {    
    return new Promise((resolve, reject) => {
        if(newModelo.nombre)
        {            
            Modelo.create(newModelo)
            .then((modelo) => {                
                resolve({ message: "Modelo registrado", modelo: modelo })
            })
            .catch((reason) => {                
                reject({ message: reason.message, modelo: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Modelo: null })
        }        
   });
  } 
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Modelo.update(dato, { where: { id: Number(datoId) } })
        .then((modelo) => resolve(modelo))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Modelo.destroy({ where: { id: Number(datoId) } })
        .then((modelo) => resolve(modelo))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Modelo.findByPk(datoId,{
	raw: true,
        nest: true,      
        include: [
          { model: Marca, attributes: ["id", "nombre"]},
     		],   
      })
        .then((modelo) => resolve(modelo))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Modelo.findAll({
	attributes: [["id","value"],["nombre","label"],"id","tipoId","marcaId","filename"],      
        order: [['nombre','ASC']]
      })
        .then((Modeloes) =>
          resolve(Modeloes)
        )
        .catch((reason) => reject(reason));
    });
  }
  static getAllMarca(marcaId) {
   return new Promise((resolve, reject) => {
      Modelo.findAll({
        raw: true,
        nest: true,
        order: [['nombre','ASC']],
        where: { marcaId: { [Op.eq]: marcaId }},
	attributes: [["id","value"],["nombre","label"],"id","tipoId","marcaId","filename"]      
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  }

 static getAllMarcaTipo(marcaId,tipoId) {
   return new Promise((resolve, reject) => {
      Modelo.findAll({
        raw: true,
        nest: true,
        order: [['nombre','ASC']],
        /*where: { marcaId: { [Op.eq]: marcaId }},*/
	 where: {[Op.and]: [
                	{ marcaId: { [Op.eq]: marcaId }},
	                { tipoId: {[Op.eq]: tipoId }}]
                },      
        attributes: [["id","value"],["nombre","label"],"id","tipoId","marcaId","filename"]
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  }
	
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Modelo.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],
        include: [
          { model: Marca, attributes: ["id", "nombre"]},
          { model: Tipo, attributes: ["id", "nombre"]}
     ],
      })
        .then((modelos) =>
          resolve({
            paginas: Math.ceil(modelos.count / num),
            pagina: page,
            total: modelos.count,
            data: modelos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default ModeloService;
