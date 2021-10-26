import TipoService from "../services/TipoService";

class TipoController {
 
  static getData(req, res) {        
    TipoService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    TipoService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {   
    const { nombres } = req.body 
    if(nombres){
    if(req.params.tipo === 'lista')
    {
      TipoService.add(req.body)
        .then((row) => {                      
          TipoService.data(1,12,'nombre','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      TipoService.add(req.body)
        .then((row) => {                      
          res.status(200).send({result: row });                        
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }  
   }else{
    res.status(400).send({ message: "datos faltantes" });
   }
  }
  
  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      TipoService.update(req.body,req.params.id)
        .then((row) => {
           TipoService.data(1,12,'nombre','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    } else{
      TipoService.update(req.body,req.params.id)
        .then((row) => {                      
            TipoService.item(req.params.id)
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
      TipoService.delete(req.params.id)
        .then((row) => {                      
          TipoService.data(1,12,'nombre','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      TipoService.delete(req.params.id)
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
    TipoService.search(prop, value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    TipoService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    TipoService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
}
export default TipoController;
