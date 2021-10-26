import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Ticket } = database;

class TicketService {

    static data(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        Ticket.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [[prop,value]],
          attributes:["id","nro","title","descripcion","tipo"] 
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
        Ticket.findAll({
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
        Ticket.findByPk(id,{
          raw: true,
          nest: true
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Ticket.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:["id","nro","title","descripcion","tipo"] 
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))            
    })
}
static update(value,id){
    return new Promise((resolve,reject) =>{
        Ticket.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Ticket.destroy({ where: { id: Number(id) } })
        .then((Ticket) => resolve(Ticket))
        .catch((reason)  => reject(reason));
    })
}
static add(value){
    return new Promise((resolve,reject) =>{
        Ticket.create(value)
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

      Ticket.findAndCountAll({
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
        attributes:["id","nro","title","descripcion","tipo"] 
      })
        .then((Tickets) =>
          resolve({
            paginas: Math.ceil(Tickets.count / 12),
            pagina: page,
            total: Tickets.count,
            data: Tickets.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	

static search(nombres){      
    return new Promise((resolve,reject) =>{            
        let iNombres  = '%' + nombres + '%'        
        if (nombres === '--todos--' || nombres === null || nombres === '0') { iNombres = '%' }                   

        Ticket.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,            
            where: { nombres: { [Op.iLike]: iNombres }},
            order: [['nombres','ASC']],
            attributes:["id","nro","title","descripcion","tipo"] 
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

static getFacebookId(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
     Ticket.findOne({
        raw: true,
        nest: true,
        where: { facebookId: { [Op.eq]: datoId }}
      })
        .then((Ticket) => resolve(Ticket))
        .catch((reason) => reject(reason));
    });
  }

static reporte(desde, hasta) {
    return new Promise((resolve, reject) => {
      Ticket.findAndCountAll({
        raw: true,
        nest: true,
        order: [['nombres', 'ASC']],
        where: {
          [Op.and]: [
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        },
        attributes:["id","nro","title","descripcion","tipo"] 
      })
        .then((Tickets) =>
        resolve({
          total: Tickets.count,
          data: Tickets.rows,
        })
        )
        .catch((reason) => reject(reason));
    });
  }

}

export default TicketService;
