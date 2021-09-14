import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { ProductoCompania, Compania, Producto } = database;

class ProductoCompaniaService {
    
    static adds(data) {    
        return new Promise((resolve, reject) => {        
            ProductoCompania.bulkCreate(data, {individualHooks: true})  
                .then((result) => {              
                    resolve({ message: result })
                })
                .catch((reason) => {    
                  console.log(reason)            
                    reject({ message: reason.message })
                  }); 
         });
    }

    static add(newProducto) {    
    return new Promise((resolve, reject) => {
        const {item, items } = req.body
        if(newProducto.nombre)
        {          
            
            


           /* Producto.create(newProducto)
            .then((producto) => {                
                resolve({ message: "Producto registrado", producto: producto })
            })
            .catch((reason) => {                
                reject({ message: reason.message, producto: null })
              });*/
            
        }else{                
             reject({ message: "Datos faltantes", producto: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Producto.update(dato, { where: { id: Number(datoId) } })
        .then((producto) => resolve(producto))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Producto.destroy({ where: { id: Number(datoId) } })
        .then((producto) => resolve(producto))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Producto.findByPk(datoId)
        .then((producto) => resolve(producto))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Producto.findAll({
	attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
      })
        .then((productoes) =>
          resolve(productoes)
        )
        .catch((reason) => reject(reason));
    });
  }

 static getCompaniaId(productoId,companiaId) {
   return new Promise((resolve, reject) => {
      ProductoCompania.findOne({
        raw: true,
        nest: true,
	 where: {
          [Op.and]: [
            {productoId: productoId},
	    {companiaId: companiaId}	  
          ]
	 },      
      })
        .then((compania) =>
          resolve(compania)
        )
        .catch((reason) => reject(reason));
    });
  }	
 
static getAll(productoId) {
   return new Promise((resolve, reject) => {      
      ProductoCompania.findAll({
        raw: true,
        nest: true,        
        order: [['orden', 'ASC']],
        where: { productoId: productoId},
        include: [{ model: Compania, attributes: ["id", "nombre","filename"]}]  
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  }	

  static getAllSingle(productoId) {
    return new Promise((resolve, reject) => {      
       ProductoCompania.findAll({
         raw: true,
         nest: true,        
         order: [['orden', 'ASC']],
         where: { productoId: productoId},
         attributes: ["id", "productoId","companiaId"]
       })
         .then((productos) =>
           resolve(productos)
         )
         .catch((reason) => reject(reason));
     });
   }
  
}

export default ProductoCompaniaService;
