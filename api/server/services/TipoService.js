import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Tipo } = database;

class TipoService {

  static data(pag,num,prop,orden) {
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Tipo.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [[prop, orden]]
       })
         .then((Tipos) =>
           resolve({
             paginas: Math.ceil(Tipos.count / num),
             pagina: page,
             total: Tipos.count,
             data: Tipos.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }	
   
    
   static add(newTipo) {    
    return new Promise((resolve, reject) => {
        if(newTipo.nombre)
        {            
            Tipo.create(newTipo)
            .then((Tipo) => {                
                resolve({ message: "Tipo registrado", Tipo: Tipo })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Tipo: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Tipo: null })
        }        
   });
  } 
  static list(prop,value){
    return new Promise((resolve,reject) =>{
        Tipo.findAll({
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
        Tipo.findByPk(id,{
          raw: true,
          nest: true
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
}
static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Tipo.findAll({
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
        Tipo.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })
}
static delete(id){
    return new Promise((resolve,reject) =>{
        Tipo.destroy({ where: { id: Number(id) } })
        .then((Tipo) => resolve(Tipo))
        .catch((reason)  => reject(reason));
    })
}
 

}    

export default TipoService;
