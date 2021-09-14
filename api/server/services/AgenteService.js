import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Usuario, Rol } = database;

class AgenteService {
    
    static add(newUsuario) {
    return new Promise((resolve, reject) => {
       Usuario.create(newUsuario)
            .then((usuario) => {
                let payload = {usuario_id: usuario.id, username: usuario.username }
                let token = jwt.sign(payload,"erp2020",{
                    expiresIn: "2629746000"
                });
                resolve({ auth: true, message: "Usuario registrado", Usuario: usuario, token: token })
            })
            .catch((reason) => {
                reject({ auth: false, message: reason, Usuario: null, token: null })
              });

   });
  }

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Usuario.update(dato, {
	      where: { id: Number(datoId) }, 
	      individualHooks: true
      })
        .then((usuario) => resolve(usuario))
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
      Usuario.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],
	include: [
            { model: Rol, attributes: ["id", "nombre"]},

       ],      
      })
        .then((usuarios) =>
          resolve({
            paginas: Math.ceil(usuarios.count / num),
            pagina: page,
            total: usuarios.count,
            data: usuarios.rows,
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


      let iTelefono = '%' + telefono + '%'
      if (telefono === '--todos--' || telefono === null || telefono === '0') { iTelefono = '%' }
      

      Usuario.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,
        order: [['nombre', 'ASC']],    
        where: {
          [Op.and]: [            
            { nombre: { [Op.iLike]: iName } },
          ]
        },    
        attributes: ["id","nombre","username","direccion","telefono"],
	include: [
            { model: Rol, attributes: ["id", "nombre"]},

       ],      
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
