import ClausulaProductosService from "../services/ClausulaProductosService";

class ClausulaProductosController {
 

  static item(req, res) {                  
      Promise.all([ClausulaProductosService.getItem(req.params.id)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([ClausulaProductosService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([ClausulaProductosService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    const {productoId} = req.body
    Promise.all([ClausulaProductosService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  ClausulaProductosService.getAll(productoId,"label","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'ClausulaProductos registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
  Promise.all([ClausulaProductosService.getItem(req.params.id)])
  .then(([cober]) => {
    Promise.all([ClausulaProductosService.update(req.body, req.params.id)])
      .then(([result]) => {
        Promise.all([ClausulaProductosService.getAll(cober.productoId,"label","ASC")])
          .then(([resu]) => {
              res.status(200).send({ message:'ClausulaProductos actualizada', result: resu });
          })
        })
      })        
      .catch((reason) => {
        res.status(400).send({ message: reason.message, result: null });
      });
  }

  static delete(req, res) {
    Promise.all([ClausulaProductosService.getItem(req.params.id)])
    .then(([cober]) => {
        console.log(cober.productoId)    
      Promise.all([ClausulaProductosService.delete(req.params.id)])
      .then(([ClausulaProductos]) => {
        Promise.all([ClausulaProductosService.getAll(cober.productoId,"label","ASC")])
            .then(([result]) => {
                res.status(200).send({ message:'ClausulaProductos eliminada', result: result });
            })
        })
      })              
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }

  static listadetalle(req, res) {
    Promise.all([ClausulaProductoService.getAllClausula(req.params.id)])
      .then(([result]) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {

        res.status(400).send({ reason });
      });
  }


  
}


export default ClausulaProductosController;
