import ProductoClausulasService from "../services/ProductosClausulasService";

class ProductoClausulasController {
 
  static item(req, res) {                  
      Promise.all([ProductoClausulasService.getItem(req.params.id)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([ProductoClausulasService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([ProductoClausulasService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    const {productoId} = req.body
    Promise.all([ProductoClausulasService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  ProductoClausulasService.getAll(productoId,"label","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'ClausulaProductos registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

 static listadetalle(req, res) {
    Promise.all([ProductoClausulasService.getAllProducto(req.params.id)])
      .then(([result]) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {

        res.status(400).send({ reason });
      });
  }

  
}


export default ProductoClausulasController;
