import ModeloService from "../services/ModeloService";

class ModeloController {
 
   static listadetalle(req, res) {
    Promise.all([ModeloService.getAllMarcaTipo(req.params.id,req.params.tipo)])
      .then(([result]) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {

        res.status(400).send({ reason });
      });
  }

  static item(req, res) {                  
      Promise.all([ModeloService.getItem(req.params.id)]) 
           .then(([modelo]) => {
                res.status(200).send({ result: modelo });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([ModeloService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
	  console.log('dddd')
      Promise.all([ModeloService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {  
    Promise.all([ModeloService.add(req.body)])
      .then(([result]) => {            
                  res.status(200).send({ result });
          })        
      .catch((reason) => {          
	console.log(reason)      
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([ModeloService.update(req.body, req.params.id)])
      .then(([modelo]) => {
        Promise.all([ ModeloService.getAll(1,12,"nombre","ASC")]) 
          .then(([modeloes]) => {
              res.status(200).send({ message:'Modelo actualizada', result: modeloes });
          })
        })    
      .catch((reason) => {
	 console.log(reason)     
        res.status(400).send({ message: reason.message, Modelo: null });
      });
  }

  static delete(req, res) {
    Promise.all([ModeloService.delete(req.params.id)])
      .then(([modelo]) => {
        Promise.all([                    
          ModeloService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Modelo eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default ModeloController;
