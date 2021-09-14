import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Marca } = database;

class MarcaService {
    
   static add(newMarca) {    
    return new Promise((resolve, reject) => {
        if(newMarca.nombre)
        {            
            Marca.create(newMarca)
            .then((marca) => {                
                resolve({ message: "Marca registrado", marca: marca })
            })
            .catch((reason) => {                
                reject({ message: reason.message, marca: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Marca: null })
        }        
   });
  } 
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Marca.update(dato, { where: { id: Number(datoId) } })
        .then((marca) => resolve(marca))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Marca.destroy({ where: { id: Number(datoId) } })
        .then((marca) => resolve(marca))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Marca.findByPk(datoId)
        .then((marca) => resolve(marca))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Marca.findAll({
	attributes: [["id","value"],["nombre","label"],"id","icon"],      
        order: [['nombre','ASC']]
      })
        .then((Marcaes) =>
          resolve(Marcaes)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Marca.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
      })
        .then((marcas) =>
          resolve({
            paginas: Math.ceil(marcas.count / num),
            pagina: page,
            total: marcas.count,
            data: marcas.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default MarcaService;
