import TipoService from "../services/TipoService";

class TipoController {
 

  static item(req, res) {                  
      Promise.all([TipoService.getItem(req.params.id)]) 
           .then(([Tipo]) => {
                res.status(200).send({ result: Tipo });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([TipoService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([TipoService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([TipoService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  TipoService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Tipo registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([TipoService.update(req.body, req.params.id)])
      .then(([Tipo]) => {
        Promise.all([ TipoService.getAll(1,12,"nombre","ASC")]) 
          .then(([Tipoes]) => {
              res.status(200).send({ message:'Tipo actualizada', result: Tipoes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Tipo: null });
      });
  }

  static delete(req, res) {
    Promise.all([TipoService.delete(req.params.id)])
      .then(([Tipo]) => {
        Promise.all([                    
          TipoService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Tipo eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default TipoController;
