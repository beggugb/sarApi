import database from "../src/models";
import moment from 'moment'

const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const { Mensaje, Cliente } = database;

class MensajeService {


  static marcar(prop){
    return new Promise((resolve, reject) => {
      Sequelize.query("SELECT * FROM `mensajes`", { type: QueryTypes.SELECT })
        .then((result) => { resolve(result) })
        .catch((reason) => {
          reject({ message: reason.message })
        })
      })                   
  }

  static total(prop){
    return new Promise((resolve, reject) => {
        Mensaje.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],          
          where: {
            [Op.and]: [
              { clienteId: prop },
              { estado: false }		  
            ]
           },
          group: ['clienteId'],	
          })        
          .then((result) => { resolve(result) })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
  }

 static search(nombres) {
    return new Promise((resolve, reject) => {
      let page = 1;
      let der = 12 * page - 12;

      let iName = '%' + nombres + '%'
      if (nombres === '--todos--' || nombres === null) { iName = '%' }

      Mensaje.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,
        order: [['id', 'desc']],
	include: [
            	{ model: Cliente, 
	          attributes: ["id", "nombres"],
	           where: { nombres: { [Op.iLike]: iName } }		
		}
             ]      
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
	

  static adds(data) {
    return new Promise((resolve, reject) => {
      Mensaje.bulkCreate(data, {individualHooks: true})
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
    }
    
  static datas(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
	    console.log(prop)
      let page = parseInt(pag);
      let der = num * page - num;
        Mensaje.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          where:{ clienteId: prop},
          order: [['id','desc']],
          attributes: ["id","mensaje","tipo","icon","estado","usuarioId","clienteId"],
          include: [
            { model: Cliente, attributes: ["id", "nombres"]}         
             ],
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
        Mensaje.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,          
          order: [['id','desc']],
	  include: [
            { model: Cliente, attributes: ["id", "nombres"]} 
             ],
	
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
        Mensaje.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],          
          attributes: [["id","value"],["nombre","label"],"id"],
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static item(id){
    return new Promise((resolve,reject) =>{
        Mensaje.findByPk(id,{
          raw: true,
          nest: true
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Mensaje.findAll({
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
        Mensaje.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Mensaje.destroy({ where: { id: Number(id) } })
        .then((cliente) => resolve(cliente))
        .catch((reason)  => reject(reason));
    })
}
static add(value){
    return new Promise((resolve,reject) =>{
        Mensaje.create(value)
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
}  

static updates(data) {
  return new Promise((resolve, reject) => {   
   
   Mensaje.bulkCreate(data, 
    { fields:["estado"] ,
      updateOnDuplicate: ["id"]}
    )	    
      .then((result) => resolve(result))
      .catch((reason) => reject(reason));
  });
}
  
}

export default MensajeService;
