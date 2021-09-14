import UbicacionService from "../services/UbicacionService";

class UbicacionController {
 

  static item(req, res) {                  
      Promise.all([UbicacionService.getItem(req.params.id)]) 
           .then(([Ubicacion]) => {
                res.status(200).send({ result: Ubicacion });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([UbicacionService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 	  
      Promise.all([UbicacionService.listas()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([UbicacionService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  UbicacionService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Ubicacion registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([UbicacionService.update(req.body, req.params.id)])
      .then(([Ubicacion]) => {
        Promise.all([ UbicacionService.getAll(1,12,"nombre","ASC")]) 
          .then(([Ubicaciones]) => {
              res.status(200).send({ message:'Ubicacion actualizada', result: Ubicaciones });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Ubicacion: null });
      });
  }

  static delete(req, res) {
    Promise.all([UbicacionService.delete(req.params.id)])
      .then(([Ubicacion]) => {
        Promise.all([                    
          UbicacionService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Ubicacion eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default UbicacionController;
