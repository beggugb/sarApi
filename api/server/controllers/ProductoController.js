import ProductoService from "../services/ProductoService";
import ProductoCompaniaService from "../services/ProductoCompaniaService";


class ProductoController {

  static getData(req, res) {        
    ProductoService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    Promise.all([
      ProductoService.getItem(req.params.id),
      ProductoCompaniaService.getAll(req.params.id)
      ]) 
      .then(([producto,productos]) => {
          res.status(200).send({ result:{"item":producto, "items":productos}});                
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {       
    const {item, items } = req.body    
    ProductoService.add(item)
      .then((result) => {         
        let vitems = Array()          
          for (var i = 0, max = items.length; i < max; i += 1) {    
              let dat = {}
              dat.productoId = result.producto.id              
              dat.orden = i
              dat.companiaId = items[i].value
              vitems.push(dat)
          }
        ProductoCompaniaService.adds(vitems) 
          .then((resuli) => {
            ProductoService.getItem(result.producto.id),ProductoCompaniaService.getAll(result.producto.id) 
              .then((item,items) => {   
                  res.status(200).send({ result: { item,items } });
              })          
          })
        })          
      .catch((reason) => { 
	console.log(reason)      
       res.status(400).send({ message: reason.message });
      });
  }
  
  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      ProductoService.update(req.body,req.params.id)
        .then((row) => {
           ProductoService.data(1,12,'nombre','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    } else{
      ProductoService.update(req.body,req.params.id)
        .then((row) => {                      
            ProductoService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row });                        
            })                     
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    }  
  }

  static getDelete(req, res) {    
    if(req.params.tipo === 'lista')
    {
      ProductoService.delete(req.params.id)
        .then((row) => {                      
          ProductoService.data(1,12,'nombre','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      ProductoService.delete(req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row });                        
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }  
  }

 

  static getSearch(req, res) {    
    const {prop, value} = req.body    
    ProductoService.search(prop, value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    ProductoService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    ProductoService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  static getListadetalle(req, res) {    
    ProductoService.getAllRamos(req.params.id)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
   
}
export default ProductoController;
