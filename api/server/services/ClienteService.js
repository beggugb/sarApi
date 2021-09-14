import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cliente } = database;

class ClienteService {
    
   static add(newCliente) {         
    return new Promise((resolve, reject) => {
        if(newCliente.nombres)
        {            
            Cliente.create(newCliente)
            .then((cliente) => {                
                resolve({ message: "Cliente registrado", cliente: cliente })
            })
            .catch((reason) => {                
                reject({ message: reason.message, cliente: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", cliente: null })
        }        
   });
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
	

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Cliente.update(dato, { where: { id: Number(datoId) } })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Cliente.destroy({ where: { id: Number(datoId) } })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
      Cliente.findByPk(datoId)
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static verificar(cliente,nombre,email,telefono) {    
    return new Promise((resolve, reject) => {      
      Cliente.findOne({
        raw: true,
        nest: true,
        where: { registro: { [Op.eq]: cliente }}      
      })
        .then((xcliente) => {
          if(xcliente){
            resolve(xcliente)
          }else{
            let io ={}
            io.nombres  = nombre
            io.telefono = telefono
            io.email    = email
            io.registro = cliente            
            /*---------------------------------------*/
              Cliente.create(io)
                .then((rcliente) => {                                  
                  /*-----------------------------------------------*/
                  Cliente.findOne({
                    raw: true,
                    nest: true,
                    where: { id: { [Op.eq]: rcliente.id }}      
                    })
                    .then((zcliente) => {
                      resolve(zcliente)
                    })
                  /*------------------------------------------------*/
                })
                .catch((reason) => {                
                  reject({ message: reason.message, cliente: null })
                });
            /*---------------------------------------*/  
          }
        })        
        .catch((reason) => reject(reason));
    });
  }

  static getIt(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
      Cliente.findByPk(datoId,{
        raw: true,
        nest: true
      })
        .then((cliente) => resolve({Cliente: cliente}))
        .catch((reason) => reject(reason));
    });
  }

  static getCI(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
     Cliente.findOne({
        raw: true,
        nest: true,
        where: { ci: { [Op.eq]: datoId }}      
      })
        .then((cliente) => resolve({Cliente: cliente}))
        .catch((reason) => reject(reason));
    });
  }	

  static getAll(pag,num,prop,orden) {  
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]                
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static search(nombres,ci,telefono) {    	
    return new Promise((resolve, reject) => {
      let page = 1;
      let der = 12 * page - 12;
      
      let iName = '%' + nombres + '%'
      if (nombres === '--todos--' || nombres === null || nombres === '0') { iName = '%' }

      let iCi = '%' + ci + '%'
      if (ci === '--todos--' || ci === null || ci === '0' || ci === undefined ) { iCi = '%' }

      let iTelefono = '%' + telefono + '%'
      if (telefono === '--todos--' || telefono === null || telefono === '0') { iTelefono = '%' }
      

      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,
        order: [['nombres', 'ASC']],    
        where: {
          [Op.and]: [            
            { nombres: { [Op.iLike]: iName } },
            { ci: { [Op.iLike]: iCi } }
          ]
        },    
        attributes: ["id","nombres","direccion","telefono","email","celular","ci"]        
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

  static totales (desde, hasta) {
    return new Promise((resolve, reject) => {
      Cliente.findAll({
        raw: true,
        nest: true,        
        order: [['nombres', 'ASC']],    
        attributes: ["id","nombres","direccion","telefono","email","estado","nit","ci"],    
        attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],    
        where: {
          [Op.and]: [            
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        }
      })
        .then((clientes) =>
          resolve(clientes)
        )
        .catch((reason) => reject(reason));
    });
  }

  static getAlls() {  
    return new Promise((resolve, reject) => {       
       Cliente.findAll({
         raw: true,
         nest: true,         
         order: [['id','ASC']],
         attributes: ["id","nombres","telefono","email"],                
       })
         .then((clientes) =>
           resolve(clientes)
         )
         .catch((reason) => reject(reason));
     });
  }
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
}

export default ClienteService;
