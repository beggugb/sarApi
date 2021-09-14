import CompaniaService from "../services/CompaniaService";

class CompaniaController {
 

  static item(req, res) {  
               
      Promise.all([CompaniaService.getItem(req.params.id)]) 
           .then(([Compania]) => {
                res.status(200).send({ result: Compania });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }


  static lista(req, res) {        
      Promise.all([CompaniaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static add(req, res) {            
    Promise.all([CompaniaService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  CompaniaService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ data: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

  static registro(req, res) {
    
    Promise.all([CompaniaService.add(req.body)])
      .then(([result]) => {
           res.status(200).send({ result });
          })
      .catch((reason) => {
        res.status(400).send({ message: reason.message });
      });
 }

  static update(req, res) {
    Promise.all([CompaniaService.update(req.body, req.params.id)])
      .then(([Compania]) => {
          res.status(200).send({ message:'Compania actualizado', Compania });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Compania: null });
      });
  }

  static delete(req, res) {
    Promise.all([CompaniaService.delete(req.params.id)])
      .then(([Compania]) => {
        Promise.all([                    
          CompaniaService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Compania eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }

   static listas(req, res) {
	   console.log('ioio')
      Promise.all([CompaniaService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
console.log(reason)		
          res.status(400).send({ reason });
        });
  }
  
}

export default CompaniaController;
