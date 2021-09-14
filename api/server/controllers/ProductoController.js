import ProductoService from "../services/ProductoService";
import ProductoCompaniaService from "../services/ProductoCompaniaService";
import ProductoClausulaService from "../services/ProductoClausulaService";
import ProductoCoberturaService from "../services/ProductoCoberturaService";

class ProductoController {

 static listadetalle(req, res) {
    Promise.all([ProductoService.getAllRamos(req.params.id)])
      .then(([result]) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {

        res.status(400).send({ reason });
      });
  }	
 

  static item(req, res) {                  
      Promise.all([
        ProductoService.getItem(req.params.id),
        ProductoCompaniaService.getAll(req.params.id)        
        
      ]) 
           .then(([producto,productos]) => {
                res.status(200).send({ result:{"item":producto, "items":productos}});                
            })        
        .catch((reason) => {                        
	  console.log(reason)	
          res.status(400).send({ reason });
        });   
  }

  static sitem(req, res) {
      Promise.all([
        ProductoService.getItem(req.params.id),
        ProductoCompaniaService.getAllSimple(req.params.id)

      ])
           .then(([producto,productos]) => {
                res.status(200).send({ result:{"item":producto, "items":productos}});
            })
        .catch((reason) => {
          console.log(reason)
          res.status(400).send({ reason });
        });
  }
	
  
  static lista(req, res) {        
	  console.log('popop')
      Promise.all([ProductoService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([ProductoService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    const {item, items } = req.body
    Promise.all([ProductoService.add(item)])
      .then(([result]) => {         
        let vitems = Array()          
          for (var i = 0, max = items.length; i < max; i += 1) {    
              let dat = {}
              dat.productoId = result.producto.id              
              dat.orden = i
              dat.companiaId = items[i].id
              vitems.push(dat)
          }
        Promise.all([ProductoCompaniaService.adds(vitems)]) 
          .then(([resuli]) => {
            Promise.all([ProductoService.getItem(result.producto.id),ProductoCompaniaService.getAll(result.producto.id)]) 
              .then(([item,items]) => {   
                  res.status(200).send({ result: { item,items } });
              })          
          })
        })          
      .catch((reason) => { 
	console.log(reason)      
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([ProductoService.update(req.body, req.params.id)])
      .then(([producto]) => {
        Promise.all([ ProductoService.getAll(1,12,"nombre","ASC")]) 
          .then(([productoes]) => {
              res.status(200).send({ message:'Producto actualizada', result: productoes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Producto: null });
      });
  }

  static delete(req, res) {
    Promise.all([ProductoService.delete(req.params.id)])
      .then(([producto]) => {
        Promise.all([                    
          ProductoService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Producto eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }

    static search(req, res) {
    const { nombre } = req.body
      Promise.all([ProductoService.search(1,12,nombre)])
           .then(([result]) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }

  
}


export default ProductoController;
