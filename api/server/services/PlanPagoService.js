import database from "../src/models";
import moment from 'moment'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { PlanPago, NotaCobranza, Poliza, Cliente, Ramo } = database;

class PlanPagoService {
    
  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      PlanPago.update(dato, { where: { id: Number(datoId) } })
        .then((pagos) => resolve(pagos))
        .catch((reason) => reject(reason));
    });
  }
  static add(data) {
    return new Promise((resolve, reject) => {
        PlanPago.bulkCreate(data, {individualHooks: true})
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
    }
   static getAllNota(notaId) {
   return new Promise((resolve, reject) => {
    PlanPago.findAll({
        raw: true,
        nest: true,
        order: [['id','ASC']],
        where: { notaId: notaId },
        attributes: ["id","ncuota","monto","estado","fechaPago"]    
      })
        .then((pagos) =>
          resolve(pagos)
        )
        .catch((reason) => reject(reason));
    });
  }

  static date(){
    return new Promise((resolve,reject) =>{
      let dd = new Date()  
      var fechaNow = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]   
      console.log(fechaNow)      
        PlanPago.findAll({
          raw: true,
          nest: true,          
          order: [['id','ASC']],   
          where:{ fechaPago: { [Op.lte] : fechaNow }},       
          attributes: ["id","ncuota","monto","estado","fechaPago","notaId"],
          include: [
            { 
              model: NotaCobranza, 
                    attributes: ["id", "polizaId"],
                    include: [
                      { 
                        model: Poliza, 
                        attributes: ["id", "clienteId"],
                        include: [{model: Cliente,attributes: ["id", "nombres","token","facebookId"]}]
                      }],                          
                  }          
          ],     
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))
    })
}  
  

  static datas(pag,num,prop,value){
      return new Promise((resolve,reject) =>{
        let dd = new Date()  
        var fechaNow = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]   
        console.log(fechaNow)
        let page = parseInt(pag);
        let der = num * page - num;
          PlanPago.findAndCountAll({
            raw: true,
            nest: true,
            offset: der,
            limit: num,
            order: [[prop,value]],   
            where:{ fechaPago: { [Op.lte] : fechaNow }},       
            attributes: ["id","ncuota","monto","estado","fechaPago","notaId"],
            include: [
              { 
                model: NotaCobranza, 
                      attributes: ["id", "polizaId"],
                      include: [
                        { 
                          model: Poliza, 
                          attributes: ["id", "clienteId","ivigencia","fvigencia"],
                          include: [{model: Cliente,attributes: ["id", "nombres"]},{model: Ramo,attributes: ["id", "nombre"]} ]
                        }],                          
                    }          
            ],     
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

  static data(pag,num,prop,value){
    return new Promise((resolve,reject) =>{
      let page = parseInt(pag);
      let der = num * page - num;
        PlanPago.findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [[prop,value]],          
          attributes: ["id","ncuota","monto","estado","fechaPago","notaId"],
          include: [
            { model: NotaCobranza, attributes: ["id", "polizaId"]}          
          ],     
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
	
 
   
}

export default PlanPagoService;
