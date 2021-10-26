import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Compania } = database;

class CompaniaService {

  static data(pag,num,prop,orden) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Compania.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [[prop, orden]]                
       })
         .then((companias) =>
           resolve({
             paginas: Math.ceil(companias.count / num),
             pagina: page,
             total: companias.count,
             data: companias.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }
   static item(datoId) {
    return new Promise((resolve, reject) => {
      Compania.findByPk(datoId,{
        raw: true,
        nest: true
      })
        .then((compania) => resolve({compania: compania}))
        .catch((reason) => reject(reason));
    });
  }
  static items(prop,value){
    return new Promise((resolve,reject) =>{            
        Compania.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:["id","nombres","direccion","email"]                               
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))            
    })
}


    
   static add(newCompania) {         
    return new Promise((resolve, reject) => {
        if(newCompania.nombre)
        {            
            Compania.create(newCompania)
            .then((compania) => {                
                resolve({ message: "compania registrado", compania: compania })
            })
            .catch((reason) => {                
                reject({ message: reason.message, compania: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", compania: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Compania.update(dato, { where: { id: Number(datoId) } })
        .then((compania) => resolve(compania))
        .catch((reason) => reject(reason));
    });
  }

 

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Compania.destroy({ where: { id: Number(datoId) } })
        .then((compania) => resolve(compania))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Compania.findByPk(datoId)
        .then((compania) => resolve(compania))
        .catch((reason) => reject(reason));
    });
  }

  static list(prop,value){
    return new Promise((resolve,reject) =>{
        Compania.findAll({
          raw: true,
          nest: true,                
          order: [[prop,value]],
          attributes:[[prop,'label'],['id','value']]  
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
}
  

  static getCI(datoId) {
    return new Promise((resolve, reject) => {
     Compania.findOne({
        raw: true,
        nest: true,
        where: { ci: { [Op.eq]: datoId }}      
      })
        .then((compania) => resolve({compania: compania}))
        .catch((reason) => reject(reason));
    });
  }	

  

 

 
	

  
}

export default CompaniaService;
