import PlanPagoService from "../services/PlanPagoService";

class PlanPagoController {  

  static getData(req, res) {        
    PlanPagoService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getDataMoras(req, res) {             
    PlanPagoService.datas(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {   
        let iok = ordenar(rows.data)
        let result ={
          "data": iok,
          "total": rows.total,
          "pagina": rows.pagina,
          "paginas": rows.paginas
        }                   
        res.status(200).send({result: result });                        
      })                   
      .catch((reason) => {   
        console.log(reason)           	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    PlanPagoService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {   
    const { nombres } = req.body 
    if(nombres){
    if(req.params.tipo === 'lista')
    {
      PlanPagoService.add(req.body)
        .then((row) => {                      
          PlanPagoService.data(1,12,'nombres','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows, message: 'PlanPago registrado' });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      PlanPagoService.add(req.body)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'PlanPago registrado' });                        
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }  
   }else{
    res.status(400).send({ message: "datos faltantes" });
   }
  }
  
  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      PlanPagoService.update(req.body,req.params.id)
        .then((row) => {
           PlanPagoService.data(1,12,'nombres','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows, message: 'PlanPago actualizado' });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    } else{
      PlanPagoService.update(req.body,req.params.id)
        .then((row) => {                      
            PlanPagoService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row, message: 'PlanPago actualizado' });                        
            })                     
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    }  
  }

  static getDelete(req, res) {    
    if(req.params.tipo === 'lista')
    {
      PlanPagoService.delete(req.params.id)
        .then((row) => {                      
          PlanPagoService.data(1,12,'nombres','ASC')
            .then((rows) => {    
              res.status(200).send({result: rows, message: 'PlanPago eliminado' });      
            })
        })                   
        .catch((reason) => {                
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      PlanPagoService.delete(req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'PlanPago eliminado' });
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }  
  }

 

  static getSearch(req, res) {    
    const {nombres } = req.body    
    PlanPagoService.search(nombres)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {      
        console.log(reason)        
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    PlanPagoService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    PlanPagoService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
 
 static buscar(req, res) { 
      PlanPagoService.buscar(req.params.nombre)
           .then((result) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {        
          res.status(400).send({ reason });
        });
  }		
  
}

function ordenar(items){
  let newData = []  
  items.map(item=>{
    let iok = {}
        iok.id = item.id
        iok.ncuota     = item.ncuota
        iok.monto      = item.monto
        iok.estado     = item.estado
        iok.fechaPago  = item.fechaPago
        iok.polizaId   = item.NotaCobranza.polizaId
        iok.ivigencia  = item.NotaCobranza.Poliza.ivigencia
        iok.fvigencia  = item.NotaCobranza.Poliza.fvigencia
        iok.cliente    = item.NotaCobranza.Poliza.Cliente.nombres
        iok.ramo       = item.NotaCobranza.Poliza.Ramo.nombre
    newData.push(iok)
    })

  return newData
}

export default PlanPagoController;

/**
 *  "id": 33,
        "ncuota": 1,
        "monto": "45",
        "estado": "pendiente",
        "fechaPago": "2021-10-13",
        "notaId": 10,
        "NotaCobranza": {
          "id": 10,
          "polizaId": 43,
          "Poliza": {
            "id": 43,
            "clienteId": 32,
            "ivigencia": "2021-10-13",
            "fvigencia": "2021-10-13",
            "Cliente": {
              "id": 32,
              "nombres": "Gabriel Benavidez"
            },
            "Ramo": {
              "id": 1,
              "nombre": "Automotores"
            }
          }
 */