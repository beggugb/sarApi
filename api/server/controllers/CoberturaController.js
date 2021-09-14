import CoberturaService from "../services/CoberturaService";

class CoberturaController {
 

  static item(req, res) {                  
      Promise.all([CoberturaService.getItem(req.params.id)]) 
           .then(([Cobertura]) => {
                res.status(200).send({ result: Cobertura });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([CoberturaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([CoberturaService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([CoberturaService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  CoberturaService.getAll(1,12,"label","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Cobertura registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([CoberturaService.update(req.body, req.params.id)])
      .then(([cobertura]) => {
        Promise.all([ CoberturaService.getAll(1,12,"label","ASC")]) 
          .then(([Coberturaes]) => {
              res.status(200).send({ message:'Cobertura actualizada', result: Coberturaes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Cobertura: null });
      });
  }

  static delete(req, res) {
    Promise.all([CoberturaService.delete(req.params.id)])
      .then(([cobertura]) => {
        Promise.all([                    
          CoberturaService.getAll(1,12,"label","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Cobertura eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default CoberturaController;
