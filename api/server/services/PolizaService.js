import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Poliza, Cliente, Usuario, Producto, Ramo, Compania } = database;

class PolizaService {


  static data(pag,num, prop, orden) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Poliza.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [[prop,orden]],
         attributes: ["id", "primaTotal","ivigencia","fvigencia"],      
            include: [
            { model: Cliente, attributes: ["id", "nombres","email"]},
            { model: Producto, attributes: ["id", "nombre"]},	
            { model: Ramo, attributes: ["id", "nombre"]}
        ],      
       })
         .then((polizas) =>
           resolve({
             paginas: Math.ceil(polizas.count / num),
             pagina: page,
             total: polizas.count,
             data: polizas.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }
    
   static add(newPoliza) {    
    return new Promise((resolve, reject) => {
      Poliza.create(newPoliza,{raw: true,
        nest: true })
        .then((poliza) => {                
           resolve(poliza)
       })
       .catch((reason) => {                
         reject({ message: reason.message, Tipo: null })
      });            
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Cotizacion.update(dato, { where: { id: Number(datoId) } })
        .then((Tipo) => resolve(Tipo))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Cotizacion.destroy({ where: { id: Number(datoId) } })
        .then((Tipo) => resolve(Tipo))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Poliza.findByPk(datoId,{
        raw: true,
        nest: true,
	 include: [
            { model: Cliente, attributes: ["id", "nombres","email"]},
            { model: Producto, attributes: ["id", "nombre"]},
            { model: Usuario, attributes: ["id", "nombre"]},
            { model: Ramo, attributes: ["id", "nombre"]},
            { model: Compania, attributes: ["id", "nombre"]},
            { model: Producto, attributes: ["id", "nombre"]}		 
       ],
      })
        .then((poliza) => resolve(poliza))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Cotizacion.findAll({
	attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
      })
        .then((Tipoes) =>
          resolve(Tipoes)
        )
        .catch((reason) => reject(reason));
    });
  }
 

  static search(nombres) {
    return new Promise((resolve, reject) => {
      let page = 1;
      let der = 12 * page - 12;

      let iName = '%' + nombres + '%'
      if (nombres === '--todos--' || nombres === null || nombres === '0') { iName = '%' }

      Poliza.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,
        order: [['createdAt', 'ASC']],
        include: [
            { model: Cliente, 
	      where: { nombres: { [Op.iLike]: iName }},		    
	      attributes: ["id", "nombres"]},
            { model: Producto, attributes: ["id", "nombre"]},
	    { model: Ramo, attributes: ["id", "nombre"]}	
       ],
        attributes: ["id", "primaTotal","ivigencia","fvigencia"]	      
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
        Poliza.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('sum', Sequelize.col('primaTotal')), 'total']],
          /* where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          */
           where: {
          [Op.and]: [
            { createdAt: { [Op.between]: [desde, hasta]}},
            /*{usuarioId: {[Op.between]: [iuser, fuser]}}*/
          ]
         },		
          })        
          .then((result) => { resolve(result) })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
  }

  static totalc(desde,hasta) { 
    return new Promise((resolve, reject) => {
        Poliza.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('count', Sequelize.col('primaTotal')), 'total']],
          /* where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          */
           where: {
          [Op.and]: [
            { createdAt: { [Op.between]: [desde, hasta]}},
            /*{usuarioId: {[Op.between]: [iuser, fuser]}}*/
          ]
         },		
          })        
          .then((result) => { resolve(result) })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
  }

  static totalDetalle(desde,hasta) {
    return new Promise((resolve, reject) => {
       Poliza.findAndCountAll({
         raw: true,
         nest: true,         
         /*where: {
          [Op.and]: [
            { ivigencia: { [Op.between]: [desde, hasta]}}            
          ]
         },*/
	 where: {
          [Op.and]: [
            { createdAt: { [Op.between]: [desde, hasta]}},
            /*{usuarioId: {[Op.between]: [iuser, fuser]}}*/
          ]
         },      
         order: [['ivigencia', 'DESC']],
         include: [             
             { model: Cliente, attributes: ["id", "nombres"]},
             { model: Producto, attributes: ["id", "nombre"]},
             { model: Usuario, attributes: ["id", "nombre"]},
             { model: Compania, attributes: ["id", "nombre"]},		 
         ] 
       })
         .then((polizas) =>
           resolve({
             total: polizas.count,
             data: polizas.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }
  
}

export default PolizaService;
