import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Modelo, Tipo, Marca } = database;

class ModeloService {
    
  static data(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        Modelo.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          where: { marcaId: prop },     
          order: [["nombre","ASC"]],
          attributes: [["id","value"],["nombre","label"],"id","tipoId","marcaId","filename"], 
          include: [
            { model: Marca, attributes: ["id", "nombre"]},
            { model: Tipo, attributes: ["id", "nombre"]}]
        })
        .then((rows) => resolve({
          paginas: Math.ceil(rows.count / num),
          pagina: page,
          total: rows.count,
          data: rows.rows
        }))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static list(prop,value){
    return new Promise((resolve,reject) =>{
        Modelo.findAll({
          raw: true,
          nest: true,           
          where: { marcaId: prop },     
          order: [["nombre","ASC"]],
          attributes: [["id","value"],["nombre","label"],"id","tipoId","marcaId","filename"], 
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static item(id){
    return new Promise((resolve,reject) =>{
        Modelo.findByPk(id,{
          raw: true,
          nest: true,
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
  return new Promise((resolve,reject) =>{            
      Modelo.findAll({
        raw: true,
        nest: true,                
        where: { marcaId: prop },     
        order: [["nombre","ASC"]],
        where: {[Op.and]: [
          { marcaId: { [Op.eq]: prop }},
          { tipoId: {[Op.eq]: value }}]
        },      
        attributes: [["id","value"],["nombre","label"],"id","tipoId","marcaId","filename"]
      })
      .then((rows) => resolve(rows))
      .catch((reason) => reject({ message: reason.message }))            
  })
}
static itemss(prop,value){
    return new Promise((resolve,reject) =>{            
        Modelo.findAll({
          raw: true,
          nest: true,                
          where: { marcaId: prop },     
          order: [["nombre","ASC"]]
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))            
    })
}
static update(value,id){
    return new Promise((resolve,reject) =>{
        Modelo.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Modelo.destroy({ where: { id: Number(id) } })
        .then((cliente) => resolve(cliente))
        .catch((reason)  => reject(reason));
    })
}
static add(value){
    return new Promise((resolve,reject) =>{
        Modelo.create(value)
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
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


  
}

export default ModeloService;
