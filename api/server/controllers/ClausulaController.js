import ClausulaService from "../services/ClausulaService";

class ClausulaController {

  static getData(req, res) {        
    ClausulaService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    ClausulaService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {   
    const { label } = req.body 
    if(label){
    if(req.params.tipo === 'lista')
    {
      ClausulaService.add(req.body)
        .then((row) => {                      
          ClausulaService.data(1,12,'label','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      ClausulaService.add(req.body)
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
      ClausulaService.update(req.body,req.params.id)
        .then((row) => {
           ClausulaService.data(1,12,'label','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    } else{
      ClausulaService.update(req.body,req.params.id)
        .then((row) => {                      
            ClausulaService.item(req.params.id)
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
      ClausulaService.delete(req.params.id)
        .then((row) => {                      
          ClausulaService.data(1,12,'label','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      ClausulaService.delete(req.params.id)
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
    ClausulaService.search(prop, value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    ClausulaService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    ClausulaService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  
}


export default ClausulaController;
