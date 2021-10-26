import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Usuario, Rol } = database;

class AgenteService {

  static data(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        Usuario.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [[prop,value]],
          attributes:["id","nombre","direccion"] 
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
        Usuario.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:[[prop,'label'],['id','value']]  
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static item(id){
    return new Promise((resolve,reject) =>{
        Usuario.findByPk(id,{
          raw: true,
          nest: true
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Usuario.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:["id","nombre","direccion"]                               
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))            
    })
}
static update(value,id){
    return new Promise((resolve,reject) =>{
        Usuario.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Usuario.destroy({ where: { id: Number(id) } })
        .then((cliente) => resolve(cliente))
        .catch((reason)  => reject(reason));
    })
}
static add(value){
    return new Promise((resolve,reject) =>{
        Usuario.create(value)
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
}  
static search(prop,value){
    return new Promise((resolve,reject) =>{            
        let iValue = '%' + value + '%'
        if (value === '--todos--' || value === null || value === '0') { iValue = '%' }            
        Usuario.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,
            where: { [prop]: { [Op.iLike]: iValue }},
            order: [[prop,'ASC']],
            attributes:["id","nombre","direccion"]  
        })		
        .then((rows) => resolve({
            paginas: Math.ceil(rows.count / 12),
            pagina: 1,
            total: rows.count,
            data: rows.rows
        } 
  ))
    .catch((reason)  => reject({ message: reason.message })) 
    })
}  

static total(desde,hasta) { 
  return new Promise((resolve, reject) => {
      Usuario.findOne({ 
        raw: true,
        nest: true,
        attributes: [[Sequelize.fn('sum', Sequelize.col('monto')), 'total']],
        where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          
        })        
        .then((result) => { resolve(result) })
          .catch((reason) => {
              reject({ message: reason.message })
            });
   });
}

static totalDetalle(desde,hasta) {
  return new Promise((resolve, reject) => {
     Usuario.findAndCountAll({
       raw: true,
       nest: true,         
       where: {
        [Op.and]: [
          { updatedAt: { [Op.between]: [desde, hasta]}}            
        ]
       },
       order: [['updatedAt', 'DESC']],           
     })
       .then((usuarios) =>
         resolve({
           total: usuarios.count,
           data: usuarios.rows,
         })
       )
       .catch((reason) => reject(reason));
   });
 } 
}

export default AgenteService;
