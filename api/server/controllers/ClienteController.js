import ClienteService from "../services/ClienteService";

class ClienteController {

  static setUpdateMobil(req, res) { 
      ClienteService.getFacebookId(req.params.id)
         .then((xrow) => {		
	   if(xrow)
		 {
             ClienteService.update(req.body,xrow.id)
        	.then((row) => {
	           res.status(200).send({result: row, message: 'Cliente actualizado' });

        	}) }else{
		   res.status(200).send({result: null, message: 'No existe cliente' });
		}
        })		 
        .catch((reason) => { 
          console.log(reason)		
          res.status(400).send({ message: reason.parent.detail });
        });
  }
	
  static getLogin(req, res) {   
    const { facebookId,nombres, email } = req.body         
    ClienteService.login(facebookId)
      .then((row) => {                 
        if(row.cliente){
          res.status(200).send({result: row });
        } else{
          ClienteService.add(req.body)
            .then((xcliente)=>{
              ClienteService.login(facebookId)
                .then((xrow) =>{
                  res.status(200).send({result: xrow });      
                })
            })
            .catch((reason) => {              	
              res.status(400).send({ message: reason });
            });
        }                                            
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }
  static getMobilItem(req, res) {    
    ClienteService.getFacebookId(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  static getData(req, res) {        
    ClienteService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    ClienteService.item(req.params.id)
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
      ClienteService.add(req.body)
        .then((row) => {                      
          ClienteService.data(1,12,'nombres','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows, message: 'Cliente registrado' });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      ClienteService.add(req.body)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'Cliente registrado' });                        
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
      ClienteService.update(req.body,req.params.id)
        .then((row) => {
           ClienteService.data(1,12,'nombres','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows, message: 'Cliente actualizado' });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    } else{
      ClienteService.update(req.body,req.params.id)
        .then((row) => {                      
            ClienteService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row, message: 'Cliente actualizado' });                        
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
      ClienteService.delete(req.params.id)
        .then((row) => {                      
          ClienteService.data(1,12,'nombres','ASC')
            .then((rows) => {    
              res.status(200).send({result: rows, message: 'Cliente eliminado' });      
            })
        })                   
        .catch((reason) => {                
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      ClienteService.delete(req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'Cliente eliminado' });
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }  
  }

 

  static getSearch(req, res) {    
    const {nombres } = req.body    
    ClienteService.search(nombres)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {      
        console.log(reason)        
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    ClienteService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    ClienteService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
 
 static buscar(req, res) { 
      ClienteService.buscar(req.params.nombre)
           .then((result) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {        
          res.status(400).send({ reason });
        });
  }		
  
}

export default ClienteController;
