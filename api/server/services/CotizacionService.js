import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cotizacion, Producto, Cliente, Usuario,Ramo, Auto, Tipo, Marca, Modelo } = database;

class CotizacionService {
    
  static data(pag,num,prop,orden) {  
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cotizacion.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop,orden]],        
        attributes:["id","ivigencia","fvigencia","valor","cliente","nombre","email","contratado","productoId","clienteId","usuarioId"],
	      include: [
            { model: Producto,attributes: ["id", "nombre"]},
            { model: Usuario, attributes: ["id", "nombre"]}		      
       ],      
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

  static datas(pag,num,prop,orden) {
	  console.log(prop)
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Auto.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [['id','DESC']],       
         attributes: ["id"],	      
         include: [{ model: Cotizacion, 
         attributes: ["id", "productoId","ivigencia","valor","createdAt"],
         where: { cliente: prop },
         include: [{ model: Cliente,attributes: ['nombres','direccion','telefono','email']}]	
             },		  
       { model: Modelo, attributes: ["id", "nombre","filename"]},
       { model: Marca, attributes: ["id", "nombre"]},
           ]
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

   static item(datoId) {
    return new Promise((resolve, reject) => {
      Cotizacion.findByPk(datoId,{
        raw: true,
        nest: true,
        include: [
          { model: Cliente, attributes: ['nombres','direccion','telefono','email']}
        ]	
      })
        .then((Tipo) => resolve(Tipo))
        .catch((reason) => reject(reason));
    });
  }

  static add(newTipo) {    
    return new Promise((resolve, reject) => {
        if(newTipo.productoId)
        {            
            Cotizacion.create(newTipo)
            .then((Tipo) => {                
                resolve(Tipo)
            })
            .catch((reason) => {                
                reject({ message: reason.message, Tipo: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Tipo: null })
        }        
   });
  } 

  static total(desde,hasta) { 
    return new Promise((resolve, reject) => {

        Cotizacion.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('sum', Sequelize.col('valor')), 'total']],
          /*where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          */
          where: {
          	[Op.and]: [
           	{ createdAt: { [Op.between]: [desde, hasta]}},
            	/*{ usuarioId: {[Op.between]: [iuser, fuser]}} */
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
        Cotizacion.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],
          /*where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          */
          where: {
          	[Op.and]: [
           	{ createdAt: { [Op.between]: [desde, hasta]}},
            	/*{ usuarioId: {[Op.between]: [iuser, fuser]}} */
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
       Cotizacion.findAndCountAll({
         raw: true,
         nest: true,         
         where: {
          [Op.and]: [
            { createdAt: { [Op.between]: [desde, hasta]}},
            /*{usuarioId: {[Op.between]: [iuser, fuser]}}		  */
          ]
         },
         order: [['createdAt', 'DESC']],
         include: [             
             { model: Producto, attributes: ["id", "nombre"]},
             { model: Usuario, attributes: ["id", "nombre"]},		 
             		 
         ] 
       })
         .then((cotizaciones) =>
           resolve({
             total: cotizaciones.count,
             data: cotizaciones.rows,
           })
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

      Cotizacion.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,
        order: [['createdAt', 'DESC']],
        include: [
            { model: Cliente, 
	      where: { nombres: { [Op.iLike]: iName }},		    
	      attributes: ["id", "nombres","email","telefono"]},
            { model: Producto, attributes: ["id", "nombre"]}
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

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Cotizacion.update(dato, { where: { id: Number(datoId) } })
        .then((empresa) => resolve(empresa))
        .catch((reason) => reject(reason));
    });
  }
	

  
}

export default CotizacionService;
