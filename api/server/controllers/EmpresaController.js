import EmpresaService from "../services/EmpresaService";

class EmpresaController {

  static getItem(req, res) {    
    EmpresaService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
 
  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      EmpresaService.update(req.body,req.params.id)
        .then((row) => {
           EmpresaService.data(1,12,'nombres','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    } else{
      EmpresaService.update(req.body,req.params.id)
        .then((row) => {                      
            EmpresaService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row });                        
            })                     
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    }  
  }
  
}

export default EmpresaController;
