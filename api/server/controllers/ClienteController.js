import ClienteService from "../services/ClienteService";

class ClienteController {

  static loginmobil(req, res) {
    const { facebookId, nombres, email } = req.body;
      ClienteService.login(facebookId)
        .then((user) => {
         if(user.cliente){
            res.status(200).send({ result: user});                                                   
         }else{           
            /*-----------------------------*/
            ClienteService.add(req.body)
            .then((rescliente) => {
                ClienteService.login(rescliente.cliente.facebookId)
                  .then((zuser) => {
                    res.status(200).send({ result: zuser});
                  })
            })
            .catch((reason) => {          
             console.log(reason)		    
            res.status(400).send({ message: reason });
            });
            /*-----------------------------*/
         }
        })	      
	  
      .catch((reason) => {  
        console.log(reason)           
        res.status(400).send({ message: reason });
      });
  }

  static lista(req, res) {        
    ClienteService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden) 
      .then((result) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {          
        res.status(400).send({ reason });
      });   
}
 

  static item(req, res) {                 
    ClienteService.getItem(req.params.id) 
           .then((cliente) => {
                res.status(200).send({ result: cliente });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }

  static mitem(req, res) {
    ClienteService.getFacebookId(req.params.id)
           .then((cliente) => {
                res.status(200).send({ result: cliente });
            })
        .catch((reason) => { 
          res.status(400).send({ reason });
        });
  }


  static search(req, res) {              
    const { nombres, ci, telefono } = req.body
      ClienteService.search(nombres,ci,telefono) 
           .then((result) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
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



  static add(req, res) {    
    ClienteService.add(req.body)
      .then((result) => {            
          ClienteService.getAll(1,12,"nombres","ASC")
              .then((result) => {
                  res.status(200).send({ data: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

 static updates(req, res) {
    ClienteService.update(req.body, req.params.id)
      .then((cliente) => {          
	      ClienteService.getAll(1,12,"nombres","ASC")
              .then((resto) => {
                  res.status(200).send({ result: resto });
              })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }

  static registro(req, res) {    
    ClienteService.add(req.body)
      .then((result) => {
           res.status(200).send({ result });
          })
      .catch((reason) => {
        res.status(400).send({ message: reason.message });
      });
 }

  static update(req, res) {
    ClienteService.getFacebookId(req.params.id)
      .then((cliente) => {
        ClienteService.update(req.body, cliente.id)
          .then((cls) => {
            res.status(200).send({ message:'Cliente actualizado', cls });
          })
       })     
      .catch((reason) => {	
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }

  static delete(req, res) {
    ClienteService.delete(req.params.id)
      .then((cliente) => {        
          ClienteService.getAll(1,12,"nombres","ASC") 
            .then((result) => {
                res.status(200).send({ message:'Cliente eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}

export default ClienteController;
