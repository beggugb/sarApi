import CoberturaProductosService from "../services/CoberturaProductosService";

class CoberturaProductosController {
 

  static item(req, res) {                  
      Promise.all([CoberturaProductosService.getItem(req.params.id)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([CoberturaProductosService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([CoberturaProductosService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    const {productoId} = req.body
    Promise.all([CoberturaProductosService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  CoberturaProductosService.getAll(productoId,"label","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'CoberturaProductos registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
  Promise.all([CoberturaProductosService.getItem(req.params.id)])
  .then(([cober]) => {
    Promise.all([CoberturaProductosService.update(req.body, req.params.id)])
      .then(([result]) => {
        Promise.all([CoberturaProductosService.getAll(cober.productoId,"label","ASC")])
          .then(([resu]) => {
              res.status(200).send({ message:'CoberturaProductos actualizada', result: resu });
          })
        })
      })        
      .catch((reason) => {
        res.status(400).send({ message: reason.message, result: null });
      });
  }

  static delete(req, res) {
    Promise.all([CoberturaProductosService.getItem(req.params.id)])
    .then(([cober]) => {
        console.log(cober.productoId)    
      Promise.all([CoberturaProductosService.delete(req.params.id)])
      .then(([CoberturaProductos]) => {
        Promise.all([CoberturaProductosService.getAll(cober.productoId,"label","ASC")])
            .then(([result]) => {
                res.status(200).send({ message:'CoberturaProductos eliminada', result: result });
            })
        })
      })              
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default CoberturaProductosController;
