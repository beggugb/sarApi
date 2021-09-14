import RamoService from "../services/RamoService";

class RamoController {
 

  static item(req, res) {                  
      Promise.all([RamoService.getItem(req.params.id)]) 
           .then(([ramo]) => {
                res.status(200).send({ result: ramo });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([RamoService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
	  console.log('dddd')
      Promise.all([RamoService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([RamoService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  RamoService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Ramo registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([RamoService.update(req.body, req.params.id)])
      .then(([ramo]) => {
        Promise.all([ RamoService.getAll(1,12,"nombre","ASC")]) 
          .then(([ramoes]) => {
              res.status(200).send({ message:'Ramo actualizada', result: ramoes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Ramo: null });
      });
  }

  static delete(req, res) {
    Promise.all([RamoService.delete(req.params.id)])
      .then(([ramo]) => {
        Promise.all([                    
          RamoService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Ramo eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default RamoController;
