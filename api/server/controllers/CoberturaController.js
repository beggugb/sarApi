import CoberturaService from "../services/CoberturaService";

class CoberturaController {
 
  static getData(req, res) {        
    CoberturaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {    
    CoberturaService.item(req.params.id)
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
      CoberturaService.add(req.body)
        .then((row) => {                      
          CoberturaService.data(1,12,'label','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      CoberturaService.add(req.body)
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
      CoberturaService.update(req.body,req.params.id)
        .then((row) => {
           CoberturaService.data(1,12,'label','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    } else{
      CoberturaService.update(req.body,req.params.id)
        .then((row) => {                      
            CoberturaService.item(req.params.id)
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
      CoberturaService.delete(req.params.id)
        .then((row) => {                      
          CoberturaService.data(1,12,'label','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      CoberturaService.delete(req.params.id)
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
    CoberturaService.search(prop, value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    CoberturaService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    CoberturaService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  
}


export default CoberturaController;
