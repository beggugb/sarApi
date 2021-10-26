import SiniestroService from "../services/SiniestroService";
import ClienteService from "../services/ClienteService";

class SiniestroController {
  
  static getData(req, res) {        
    SiniestroService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getDataMobil(req, res) {        
    ClienteService.getFacebookId(req.params.usuarioId)
     .then((xrow) => {         	  
	  if(xrow)
	     {
          SiniestroService.datas(req.params.page,req.params.num,xrow.id,xrow.id)
            .then((rows) => {                      
               res.status(200).send({result: rows });                        
          	})
	     }
	     else{
              res.status(200).send({result: {data:[],total:0,pagina:0,paginas:0 }});
	     }
      })     
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
   }	     
  

  static getItem(req, res) {    
    SiniestroService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {   
  const { clienteId,latitude,longitude,descripcion,tipo  } = req.body 
 ClienteService.getFacebookId(clienteId)
  .then((xrow) => { 
     let ore = {}
	 ore.clienteId = xrow.id
	 ore.latitude = latitude
	 ore.longitude = longitude
	 ore.descripcion = descripcion
	 ore.tipo = tipo 
     SiniestroService.add(ore,xrow.id)
        .then((row) => {              
            var dd = row ? new Date(row.createdAt) : new Date('2020-01-01 03:24:55.528-04') 
            var fcaja = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
            let iok = {}
            iok.id = row.id
            iok.fechaSiniestro = fcaja
            SiniestroService.update(iok,row.id)
            .then((xrow) => {
                    res.status(200).send({ message: 'Siniestro registrado' });                        
            })    
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    })	    
  }
  
  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      SiniestroService.update(req.body,req.params.id)
        .then((row) => {
           SiniestroService.data(1,12,'id','DESC')
             .then((rows) => {               
                res.status(200).send({result: rows, message: 'Siniestro actualizado' });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    } else{
      SiniestroService.update(req.body,req.params.id)
        .then((row) => {                      
            SiniestroService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row, message: 'Siniestro actualizado' });                        
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
      SiniestroService.delete(req.params.id)
        .then((row) => {                      
          SiniestroService.data(1,12,'id','DESC')
            .then((rows) => {    
              res.status(200).send({result: rows, message: 'Siniestro eliminado' });      
            })
        })                   
        .catch((reason) => {                
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      SiniestroService.delete(req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'Siniestro eliminado' });
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }  
  }

 

  static getSearch(req, res) {    
    const {nombres } = req.body    
    SiniestroService.search(nombres)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {      
        console.log(reason)        
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    SiniestroService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    SiniestroService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
 
 static buscar(req, res) { 
      SiniestroService.buscar(req.params.nombre)
           .then((result) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {        
          res.status(400).send({ reason });
        });
  }		
  
}

export default SiniestroController;
