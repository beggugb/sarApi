import ClausulaService from "../services/ClausulaService";

class ClausulaController {
 

  static item(req, res) {                  
      Promise.all([ClausulaService.getItem(req.params.id)]) 
           .then(([Clausula]) => {
                res.status(200).send({ result: Clausula });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([ClausulaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
	  console.log('ios')
      Promise.all([ClausulaService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
	  console.log(reason)	
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([ClausulaService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  ClausulaService.getAll(1,12,"label","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Clausula registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([ClausulaService.update(req.body, req.params.id)])
      .then(([Clausula]) => {
        Promise.all([ ClausulaService.getAll(1,12,"label","ASC")]) 
          .then(([Clausulaes]) => {
              res.status(200).send({ message:'Clausula actualizada', result: Clausulaes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Clausula: null });
      });
  }

  static delete(req, res) {
    Promise.all([ClausulaService.delete(req.params.id)])
      .then(([Clausula]) => {
        Promise.all([                    
          ClausulaService.getAll(1,12,"label","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Clausula eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default ClausulaController;
