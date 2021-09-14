import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Proceso } = database;

class ProcesoService {
   
  static add(newProceso) {    
    return new Promise((resolve, reject) => {        
        Proceso.create(newProceso)
            .then((result) => {              
                resolve({ message: "success" })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
        
   });
  } 

  static getAll(usuarioId) {        
    return new Promise((resolve, reject) => {        
        Proceso.findAll({
            order: [['createdAt', 'ASC']],       
            limit: 10,     
            attributes:['id','descripcion','estado','userId'],
            where: { userId: { [Op.eq]: usuarioId }}            
        })
        .then((procesos) => {                
                resolve({ message: "Lista procesos", data: procesos })
            })
        .catch((reason) => {                
                reject({ message: reason.message, data: null })
         });
       });
   }
  
}

export default ProcesoService;
