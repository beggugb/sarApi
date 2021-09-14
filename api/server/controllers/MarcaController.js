import MarcaService from "../services/MarcaService";

class MarcaController {
 

  static item(req, res) {                  
      Promise.all([MarcaService.getItem(req.params.id)]) 
           .then(([marca]) => {
                res.status(200).send({ result: marca });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([MarcaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
	  console.log('dddd')
      Promise.all([MarcaService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([MarcaService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  MarcaService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Marca registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([MarcaService.update(req.body, req.params.id)])
      .then(([marca]) => {
        Promise.all([ MarcaService.getAll(1,12,"nombre","ASC")]) 
          .then(([marcaes]) => {
              res.status(200).send({ message:'Marca actualizada', result: marcaes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Marca: null });
      });
  }

  static delete(req, res) {
    Promise.all([MarcaService.delete(req.params.id)])
      .then(([marca]) => {
        Promise.all([                    
          MarcaService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Marca eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default MarcaController;
