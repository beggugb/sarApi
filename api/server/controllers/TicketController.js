import TicketService from "../services/TicketService";

class TicketController {  

  static getData(req, res) {        
    TicketService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    TicketService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {   
    const { tipo } = req.body 
    if(tipo){
    if(req.params.tipo === 'lista')
    {
      TicketService.add(req.body)
        .then((row) => {                      
          TicketService.data(1,12,'nro','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows, message: 'Ticket registrado' });                        
            })
        })                   
        .catch((reason) => { 
		console.log(reason)
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      TicketService.add(req.body)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'Ticket registrado' });                        
        })                   
        .catch((reason) => {              
	  console.log(reason)	
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
      TicketService.update(req.body,req.params.id)
        .then((row) => {
           TicketService.data(1,12,'nombres','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows, message: 'Ticket actualizado' });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    } else{
      TicketService.update(req.body,req.params.id)
        .then((row) => {                      
            TicketService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row, message: 'Ticket actualizado' });                        
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
      TicketService.delete(req.params.id)
        .then((row) => {                      
          TicketService.data(1,12,'nro','ASC')
            .then((rows) => {    
              res.status(200).send({result: rows, message: 'Ticket eliminado' });      
            })
        })                   
        .catch((reason) => {                
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      TicketService.delete(req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'Ticket eliminado' });
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }  
  }

 

  static getSearch(req, res) {    
    const {nombres } = req.body    
    TicketService.search(nombres)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {      
        console.log(reason)        
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    TicketService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    TicketService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
 
 static buscar(req, res) { 
      TicketService.buscar(req.params.nombre)
           .then((result) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {        
          res.status(400).send({ reason });
        });
  }		
  
}

export default TicketController;
