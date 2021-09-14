import { resolve } from "path";
import TasaService from "../services/TasaService";

class TasaController {
 
  static getTasas(companias,tipoId,valor) {  
    const first = new Promise((resolve, reject) => {
      setTimeout(resolve, 500, 'first')
    })
    const second = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, 'second')
    })
    
    Promise.race([second]).then(result => {
      return 0
    })
  }



  static gtasas(companias) {                  
    Promise.all(companias.map(compania => TasaService.getTasas(compania.id,cotizacion.tipoId,cotizacion.valor)))
      then(item =>{
        let tasas = ordenar(item,cotizacion.valor)  
      })
  }

  static item(req, res) {                  
      Promise.all([TasaService.getItem(req.params.id)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([TasaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([TasaService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    const {productocompaniaId} = req.body
    Promise.all([TasaService.add(req.body)])
      .then(([result]) => {
	  Promise.all([TasaService.getAllTasas(productocompaniaId)])
         	.then(([tasas]) => {   
                  res.status(200).send({ message: 'Tasa registrada',result: tasas });
              })          
	 })     
      .catch((reason) => {          
	      console.log(reason)
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {  
    const {productocompaniaId} = req.body	
    Promise.all([TasaService.update(req.body, req.params.id)])
      .then(([result]) => {
        Promise.all([TasaService.getAllTasas(productocompaniaId)])
          .then(([cober]) => {
              res.status(200).send({ message:'Tasa actualizada', result: cober });
          })
        })      
      .catch((reason) => {
        res.status(400).send({ message: reason.message, result: null });
      });
  }

  static delete(req, res) {
    Promise.all([TasaService.getItem(req.params.id)])
    .then(([cober]) => {
      Promise.all([TasaService.delete(req.params.id)])
      .then(([Tasa]) => {
        Promise.all([TasaService.getAllTasas(cober.productocompaniaId)])
            .then(([result]) => {
                res.status(200).send({ message:'Tasa eliminada', result: result });
            })
        })
      })              
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }

   static listadetalle(req, res) {
    Promise.all([TasaService.getAllTasas(req.params.id)])
    .then(([tasas]) => {
      res.status(200).send({ message: 'Tasas',result: tasas });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ reason });
      });
  }



  
}


function ordenar(dato,monto){
  let ordenado = []
  dato.map(item=>{
    if(item){		  
    let iok = {}
    iok.id = item.id
    iok.primaContado = item.tasaContado * monto
    iok.primaCredito = item.tasaCredito * monto
    iok.franquicia  = item.franquicia
    ordenado.push(iok)
    }	    
  })
  return ordenado
}

export default TasaController;
