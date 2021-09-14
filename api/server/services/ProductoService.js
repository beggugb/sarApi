import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Producto, Ramo } = database;

class ProductoService {
    
   static add(newProducto) {    
    return new Promise((resolve, reject) => {
        if(newProducto.nombre)
        {            
            Producto.create(newProducto)
            .then((producto) => {                
                resolve({ message: "Producto registrado", producto: producto })
            })
            .catch((reason) => {                
                reject({ message: reason.message, producto: null })
              });
            
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

  static getItemContrato(datoId) {
    return new Promise((resolve, reject) => {
      Producto.findByPk(datoId,{
        raw: true,
        nest: true
      })
        .then((producto) => resolve(producto))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Producto.findByPk(datoId,{
        include: [{ model: Ramo, attributes: ["id", "nombre"]}] 
      })
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
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Producto.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],
        include: [{ model: Ramo, attributes: ["id", "nombre"]}]  
      })
        .then((productos) =>
          resolve({
            paginas: Math.ceil(productos.count / num),
            pagina: page,
            total: productos.count,
            data: productos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

static getAllRamos(ramoId) {
   return new Promise((resolve, reject) => {
      Producto.findAll({
        raw: true,
        nest: true,	      
        order: [['nombre','ASC']],
	attributes: ["id", "nombre","vigencia","ramoId"], 
	include: [{ model: Ramo, attributes: ["id", "nombre","icono"]}]      
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  } 

static getAllRamo(ramoId) {
   return new Promise((resolve, reject) => {
      Producto.findAll({
        raw: true,
        nest: true,
        order: [['nombre','ASC']],
        where: { ramoId: { [Op.eq]: ramoId }},
        attributes: ["id", "nombre","vigencia","ramoId"],
        include: [{ model: Ramo, attributes: ["id", "nombre"]}]
      })
        .then((productos) =>
          resolve(productos)
        )
        .catch((reason) => reject(reason));
    });
  }
	
 
static search(page,num,nombre) {
   return new Promise((resolve, reject) => {
      let page = 1;
      let der = 12 * page - 12;

      let iName = '%' + nombre + '%'
      if (nombre === '--todos--' || nombre === null || nombre === '0') { iName = '%' }
    
      Producto.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,	     
        order: [['nombre','ASC']],
	where: { nombre: { [Op.iLike]: iName }},
        attributes: ["id", "nombre","vigencia","ramoId"],
        include: [{ model: Ramo, attributes: ["id", "nombre"]}]
      })
        .then((productos) =>
          resolve({
            paginas: Math.ceil(productos.count / 12),
            pagina: page,
            total: productos.count,
            data: productos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }
	
}

export default ProductoService;
