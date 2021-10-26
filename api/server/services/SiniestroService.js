import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Siniestro, Cliente, Poliza } = database;

class SiniestroService { 

  static datas(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        Siniestro.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          where:{clienteId: prop},
          order: [['id','desc']],
          attributes:["id","nro","descripcion","lugar","fechaSiniestro","fechaCierre","polizaId","tipo","estado"],
          include: [
            { model: Cliente,as:"cliente",attributes: ["id", "nombres","telefono"]}       
          ]
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
static data(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        Siniestro.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [[prop,value]],
          /*attributes:["id","nro","descripcion","lugar","fechaSiniestro","fechaCierre"],*/
          attributes:["id","nro","descripcion","lugar","fechaSiniestro","fechaCierre","polizaId","tipo","estado"],		
          include: [
            { model: Cliente,as:"cliente",attributes: ["id", "nombres","telefono"]}       
          ]
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
        Siniestro.findAll({
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
        Siniestro.findByPk(id,{
          raw: true,
          nest: true,
          include: [
            { model: Cliente,as:"cliente",attributes: ["id", "nombres","telefono"]}
          ]		
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Siniestro.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          /*attributes:["id","nombres","direccion","email","telefono","celular","ci","tipo"] */
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))            
    })
}
static update(value,id){
    return new Promise((resolve,reject) =>{
        Siniestro.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Siniestro.destroy({ where: { id: Number(id) } })
        .then((Siniestro) => resolve(Siniestro))
        .catch((reason)  => reject(reason));
    })
}
static add(value){
    return new Promise((resolve,reject) =>{
        Siniestro.create(value)
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
}

static buscar(nombres) {
    return new Promise((resolve, reject) => {
      let page = 1;
      let der = 12 * page - 12;

      let iName = '%' + nombres + '%'
      if (nombres === '--todos--' || nombres === null) { iName = '%' }

      Siniestro.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,
        order: [['nombres', 'ASC']],
        where: {
          [Op.and]: [
            { nombres: { [Op.iLike]: iName } },
          ]
        },
        /*attributes: ["id","nombres","ci","direccion","telefono","email"]*/
      })
        .then((Siniestros) =>
          resolve({
            paginas: Math.ceil(Siniestros.count / 12),
            pagina: page,
            total: Siniestros.count,
            data: Siniestros.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	

static search(nombres){      
    return new Promise((resolve,reject) =>{            
        let iNombres  = '%' + nombres + '%'        
        if (nombres === '--todos--' || nombres === null || nombres === '0') { iNombres = '%' }                   

        Siniestro.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,            
            where: { nombres: { [Op.iLike]: iNombres }},
            order: [['nombres','ASC']],
            /*attributes:["id","nombres","direccion","email","telefono","celular","ci","tipo"] */
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

static reporte(desde, hasta) {
    return new Promise((resolve, reject) => {
      Siniestro.findAndCountAll({
        raw: true,
        nest: true,
        order: [['nombres', 'ASC']],
        where: {
          [Op.and]: [
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        },
        /*attributes: ["id","nombres","direccion","telefono","email","estado","ci"]*/
      })
        .then((Siniestros) =>
        resolve({
          total: Siniestros.count,
          data: Siniestros.rows,
        })
        )
        .catch((reason) => reject(reason));
    });
  }

}

export default SiniestroService;
