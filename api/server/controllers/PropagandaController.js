import PropagandaService from "../services/PropagandaService";

class PropagandaController {
 

  static item(req, res) {                  
      Promise.all([PropagandaService.getItem(req.params.id)]) 
           .then(([Propaganda]) => {
                res.status(200).send({ result: Propaganda });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([PropagandaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
    
    let ifecha = new Date()
    let fecha = (new Date(ifecha + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]    
      Promise.all([PropagandaService.lista(fecha)])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([PropagandaService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  PropagandaService.getAll(1,12,"id","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Propaganda registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([PropagandaService.update(req.body, req.params.id)])
      .then(([Propaganda]) => {
        Promise.all([ PropagandaService.getAll(1,12,"id","ASC")]) 
          .then(([Propagandaes]) => {
              res.status(200).send({ message:'Propaganda actualizada', result: Propagandaes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Propaganda: null });
      });
  }

  static delete(req, res) {
    Promise.all([PropagandaService.delete(req.params.id)])
      .then(([Propaganda]) => {
        Promise.all([                    
          PropagandaService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Propaganda eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default PropagandaController;
