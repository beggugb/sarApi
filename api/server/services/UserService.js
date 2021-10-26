import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Usuario, Sucursal, Rol } = database;

class UsuarioService {

  static login(username, password) {        
    return new Promise((resolve, reject) => {
      Usuario.findOne({        
        where: { username: { [Op.eq]: username } },  
        attributes: ['id','nombre','username','password','rolId','sucursalId']
      }).then((user) => {
        if (!user) {          
          resolve({
            success: false,
            message: "Authentication fallida . Usuario no existe.",
            usuario: null,
          });
        } else {          
          user.comparePassword(password, (err, isMatch) => {            
            if (isMatch && !err) {
              let payload = { user_id: user.id, username: user.username };
              let token = jwt.sign(payload, "unityErp2021", {
                expiresIn: "2629746000",
              });
              resolve({
                auth: true,
                message: "Acceso correcto",
                usuario: user,
                token: token,
              });              
            } else {
              resolve({
                success: false,
                message: "Autenticación fallida. contraseña incorrecta.",
                usuario: null,
              });              
            }
          });
        }
      });
    });
  }

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
          attributes:["id","codigo","nombres","email","direccion","tipo","nit","filename","telefono"] 
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
          attributes:["id","codigo","nombres","direccion"]                             
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
            attributes:["id","codigo","nombres","email","direccion","tipo","nit","filename","telefono"] 
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
	

  
}

export default UsuarioService;
