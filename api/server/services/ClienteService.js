import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cliente } = database;

class ClienteService {

  static login(facebook) {        
    return new Promise((resolve, reject) => {
      Cliente.findOne({
        where: { facebookId: facebook },
        attributes:["id","nombres","direccion","telefono","email","facebookId","createdAt"]
      })
      .then((cliente) => {                
        /*-----------------------------------------*/
        if (!cliente) {          
            resolve({
              success: false,
              message: "Authentication fallida . Usuario no existe.",
              cliente: null,
              token: null		  
            });
          }else{                    
            let payload = { cliente_id: cliente.id, nombres: cliente.nombres };
            let token = jwt.sign(payload, "sari2021beggu", {
                expiresIn: "2629746000",
            });
            resolve({
              auth: true,
              message: "Acceso correcto",
              cliente: cliente,
              token: token,
            });                          
          }
        /*-----------------------------------------*/
      });
    });
  }

  static data(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        Cliente.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [[prop,value]],
          attributes:["id","nombres","direccion","email","telefono","celular","ci","tipo","token","facebookId"] 
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
        Cliente.findAll({
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
        Cliente.findByPk(id,{
          raw: true,
          nest: true
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Cliente.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:["id","nombres","direccion","email","telefono","celular","ci","tipo"] 
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))            
    })
}
static update(value,id){
    return new Promise((resolve,reject) =>{
        Cliente.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Cliente.destroy({ where: { id: Number(id) } })
        .then((cliente) => resolve(cliente))
        .catch((reason)  => reject(reason));
    })
}
static add(value){
    return new Promise((resolve,reject) =>{
        Cliente.create(value)
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

      Cliente.findAndCountAll({
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
        attributes: ["id","nombres","ci","direccion","telefono","email"]
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / 12),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	

static search(nombres){      
    return new Promise((resolve,reject) =>{            
        let iNombres  = '%' + nombres + '%'        
        if (nombres === '--todos--' || nombres === null || nombres === '0') { iNombres = '%' }                   

        Cliente.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,            
            where: { nombres: { [Op.iLike]: iNombres }},
            order: [['nombres','ASC']],
            attributes:["id","nombres","direccion","email","telefono","celular","ci","tipo"] 
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
     Cliente.findOne({
        raw: true,
        nest: true,
        where: { facebookId: { [Op.eq]: datoId }}
      })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }


static total(desde,hasta) { 
    return new Promise((resolve, reject) => {
        Cliente.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],
          /*where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          */
          where: {
          	[Op.and]: [
           	{ createdAt: { [Op.between]: [desde, hasta]}},
            	/*{ usuarioId: {[Op.between]: [iuser, fuser]}} */
          	]
         	},		
          })        
          .then((result) => { resolve(result) })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
  }  

static reporte(desde, hasta) {
    return new Promise((resolve, reject) => {
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        order: [['nombres', 'ASC']],
        where: {
          [Op.and]: [
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        },
        attributes: ["id","nombres","direccion","telefono","email","estado","ci"]
      })
        .then((clientes) =>
        resolve({
          total: clientes.count,
          data: clientes.rows,
        })
        )
        .catch((reason) => reject(reason));
    });
  }

  static date(){
    return new Promise((resolve,reject) =>{      
        Cliente.findAll({
          raw: true,
          nest: true,          
          order: [['id','ASC']],
          attributes:["id","nombres","token","facebookId"],
          where: { token: { [Op.not]: null }},
           
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))
    })
}


}

export default ClienteService;
