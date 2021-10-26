import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Marca } = database;

class MarcaService {
    
  static data(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        Marca.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [[prop,value]]
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
        Marca.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],          
          attributes: [["id","value"],["nombre","label"],"id","icon"],
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static item(id){
    return new Promise((resolve,reject) =>{
        Marca.findByPk(id,{
          raw: true,
          nest: true
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Marca.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]]                         
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))            
    })
}
static update(value,id){
    return new Promise((resolve,reject) =>{
        Marca.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Marca.destroy({ where: { id: Number(id) } })
        .then((cliente) => resolve(cliente))
        .catch((reason)  => reject(reason));
    })
}
static add(value){
    return new Promise((resolve,reject) =>{
        Marca.create(value)
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
}  
  
}

export default MarcaService;
