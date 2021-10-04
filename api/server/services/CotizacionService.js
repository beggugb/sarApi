import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cotizacion, Producto, Cliente, Usuario,Ramo, Auto, Tipo, Marca, Modelo } = database;

class CotizacionService {
    
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
      Cotizacion.findByPk(datoId,{
        raw: true,
        nest: true,
      })
        .then((Tipo) => resolve(Tipo))
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
 
static getAll(usuarioId,rolId,pag,num) {
  
  let iusu = usuarioId 
  let fusu = usuarioId
  if(rolId === 1 || rolId === '1'){
	iusu = 0
	fusu = 50  
  }
  console.log(iusu)
	console.log(fusu)
  

   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cotizacion.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['id','DESC']],
        where: { usuarioId: { [Op.between]: [iusu, fusu]}},
	      include: [
            { model: Producto, attributes: ["id", "nombre"]},
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
        order: [['createdAt', 'ASC']],
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

  static total(desde,hasta,usuarioId) { 
    return new Promise((resolve, reject) => {
      let iuser = 0
      let fuser = 30

      if (usuarioId === '' || usuarioId === undefined || usuarioId === null || usuarioId === 0)
         { console.log('pp') }
      else{
          iuser = usuarioId
          fuser = usuarioId

      }    
        Cotizacion.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('sum', Sequelize.col('valor')), 'total']],
          /*where: {[Op.and]: [{ createdAt: { [Op.between]: [desde, hasta]}}]},          */
          where: {
          	[Op.and]: [
           	{ createdAt: { [Op.between]: [desde, hasta]}},
            	{ usuarioId: {[Op.between]: [iuser, fuser]}} 
          	]
         	},		
          })        
          .then((result) => { resolve(result) })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
  }

  static totalDetalle(desde,hasta,usuarioId) {
    return new Promise((resolve, reject) => {
      let iuser = 0
      let fuser = 30

      if (usuarioId === '' || usuarioId === undefined || usuarioId === null || usuarioId === 0)
         { console.log('pp') }
      else{
          iuser = usuarioId
          fuser = usuarioId

      }	    
       Cotizacion.findAndCountAll({
         raw: true,
         nest: true,         
         where: {
          [Op.and]: [
            { createdAt: { [Op.between]: [desde, hasta]}},
            {usuarioId: {[Op.between]: [iuser, fuser]}}		  
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

 static getAllCliente(pag,num,clienteId) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cotizacion.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['id','DESC']],
        where: { cliente: clienteId },
        include: [{ model: Producto, attributes: ["id", "nombre"]}]
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
  static getCotizacionAuto(pag,num,clienteId) {
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
		    where: { cliente: clienteId },
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
	
	

  
}

export default CotizacionService;
