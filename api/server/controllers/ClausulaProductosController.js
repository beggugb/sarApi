import ClausulaProductosService from "../services/ClausulaProductosService";

class ClausulaProductosController {


  static getList(req, res) {    
    ClausulaProductosService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  static getData(req, res) {        
    ClausulaProductosService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    ClausulaProductosService.item(req.params.id)
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
      ClausulaProductosService.add(items)
          .then((result) => {                    
            ClausulaProductosService.data(productoId)
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
          ClausulaProductosService.update(items)
            .then((result) => {
                ClausulaProductosService.data(req.params.id)
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
      ClausulaProductosService.delete(req.params.id)
        .then((row) => {                      
          ClausulaProductosService.data(1,12,'nombres','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      ClausulaProductosService.delete(req.params.id)
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
    ClausulaProductosService.search(prop, value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  

  

  static getItems(req, res) {    
    ClausulaProductosService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  
}


export default ClausulaProductosController;
