import CoberturaProductosService from "../services/CoberturaProductosService";

class CoberturaProductosController {
 
  static getList(req, res) {    
    CoberturaProductosService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  static getData(req, res) {        
    CoberturaProductosService.data(req.params.id)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    CoberturaProductosService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {    
    const { items, productoId} = req.body   
    if(req.params.tipo === 'lista')
    {
      CoberturaProductosService.add(items)
          .then((result) => {                    
            CoberturaProductosService.data(productoId)
                .then((xclausulasp) => {
                    res.status(200).send({result: xclausulasp });                        
                })
          })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }   
  }
  
  static setUpdate(req, res) {    
    const { items, productoId } = req.body          
    if(req.params.tipo === 'lista')
    {        
          CoberturaProductosService.update(items)
            .then((result) => {
                CoberturaProductosService.data(req.params.id)
                .then((resu) => {
                    res.status(200).send({ message:'ClausulaProductos actualizada', result: resu });
                })
              })       
            .catch((reason) => {
              res.status(400).send({ message: reason.message, result: null });
            });
    }
  }    

  static getDelete(req, res) {    
    if(req.params.tipo === 'lista')
    {
      CoberturaProductosService.delete(req.params.id)
        .then((row) => {                      
          CoberturaProductosService.data(1,12,'nombres','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      CoberturaProductosService.delete(req.params.id)
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
    CoberturaProductosService.search(prop, value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  

  

  static getItems(req, res) {    
    CoberturaProductosService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  
}


export default CoberturaProductosController;
