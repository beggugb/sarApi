import AgenteService from "../services/AgenteService";

function reformula(rango,potencia){
  let res = 1
  for (let i = 2; i < rango; i++) {
   res += Math.pow((1/(i)),potencia);	  
  }	
 return res	
}

class AgenteController {
 
  static formula(req, res) {	
        let iok = 0
	iok = reformula(req.params.rango,req.params.potencia)
	console.log(iok)  
	res.status(200).send({ result: iok });          
  }
  static item(req, res) {  
               
      Promise.all([ClienteService.getItem(req.params.id)]) 
           .then(([cliente]) => {
                res.status(200).send({ result: cliente });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }

  static search(req, res) {              
    const { nombres, ci, telefono } = req.body
      Promise.all([AgenteService.search(nombres,ci,telefono)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
	console.log(reason)	
          res.status(400).send({ reason });
        });   
  }
  static buscar(req, res) { 
      Promise.all([ClienteService.buscar(req.params.nombre)])
           .then(([result]) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {
        console.log(reason)
          res.status(400).send({ reason });
        });
  }	

  static lista(req, res) {        
      Promise.all([AgenteService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static add(req, res) {            	  
    Promise.all([AgenteService.add(req.body)])
      .then(([result]) => {                     
           res.status(200).send({ result: result });            
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });  
}

 static update(req, res) {
   /* const {password} = req.body

    if(password){
	console.log('existe password')    
    }else{
	console.log('no existe password')
    }*/
 
     Promise.all([AgenteService.update(req.body, req.params.id)])
      .then(([agente]) => {
          res.status(200).send({ message:'Agente actualizado', agente });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });	  

    
 }
  static registro(req, res) {
    
    Promise.all([ClienteService.add(req.body)])
      .then(([result]) => {
           res.status(200).send({ result });
          })
      .catch((reason) => {
        res.status(400).send({ message: reason.message });
      });
 }

  static updates(req, res) {
    Promise.all([ClienteService.update(req.body, req.params.id)])
      .then(([cliente]) => {
          res.status(200).send({ message:'Cliente actualizado', cliente });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }

  static delete(req, res) {
    Promise.all([ClienteService.delete(req.params.id)])
      .then(([cliente]) => {
        Promise.all([                    
          ClienteService.getAll(1,12,"nombres","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Cliente eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}

export default AgenteController;
