import ProductoCompaniaService from "../services/ProductoCompaniaService";
import TasaService from "../services/TasaService";
import MailController from "../controllers/MailController";
import CotizacionService from "../services/CotizacionService";
import ClausulaProductosService from "../services/ClausulaProductosService";
import ProductoClausulaService from "../services/ProductoClausulaService"
import ProductoCoberturaService from "../services/ProductoCoberturaService"
import CoberturaProductosService from "../services/CoberturaProductosService"
import AutoService from "../services/AutoService"


import pdfCotizacion from '../../public/documents/cotizacion'
import ClienteService from "../services/ClienteService";
const path = require('path');
const pdf = require('html-pdf');
const hostname = '192.168.0.100'
const port = 4000

var options = { 
    "format": "Letter", 
    "orientation":"landscape"    
   };


const createPdf = (cotizacion,companias,pcob,cobp,pcla,clap,tasas,modelo) => {  
  /*let img = `http://${hostname}:${port}/api/static/images/empresa/md/logo.png`;*/
  let img = `http://${hostname}:${port}/api/static/images/companias/md/`;
  let mim = `http://${hostname}:${port}/api/static/images/modelos/md/`;	
   pdf.create(pdfCotizacion(img,cotizacion,companias,pcob,cobp,pcla,clap,tasas,modelo,mim), options).toFile(`${process.cwd()}/api/public/documents/cotizacion${cotizacion.id}.pdf`, (err) => {
     if(err) { res.send(Promise.reject());}
         return 0	 
  }   
)      
} 



class CotizacionesController { 
    static search(req, res) {
    const { nombres } = req.body
      Promise.all([CotizacionService.search(nombres)])
           .then(([result]) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {
        console.log(reason)
          res.status(400).send({ reason });
        });
  }
  static item(req, res) {                 
    Promise.all([CotizacionService.getItem(req.params.id), AutoService.getItem(req.params.id)]) 
      .then(([cotizacion,auto]) => {             
	      console.log(auto)
        Promise.all([         
          ProductoCompaniaService.getAll(cotizacion.productoId)
        ]) 
          .then(([companias]) => {                                        
            Promise.all(companias.map(compania => TasaService.getTasas(compania.id,auto.tipoId,cotizacion.valor)))
               .then(item =>{
                let tasas = ordenars(companias,item,cotizacion.valor)
                res.status(200).send({ result: {cotizacion, tasas, auto}}) 	                                    
              })
           })
        })          
      .catch((reason) => {                  
        res.status(400).send({ reason });
      });   
}

    static cotizaciones(req, res) { 
      CotizacionService.getCotizacionAuto(req.params.page,req.params.num,req.params.id)
        .then((result) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          console.log(reason)		
          res.status(400).send({ reason });
        });
    }

 
    static lista(req, res) { 
      Promise.all([CotizacionService.getAll(req.params.usuarioId,req.params.rolId,req.params.page,req.params.num)])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }

  static add(req, res) {
    const {valor, productoId, clienteId, cliente, nombre, email, telefono, tipoId, marcaId, modeloId, modelo} = req.body      
       /*****************************************************************************/                      
          CotizacionService.add(req.body)
              .then((result) => {         
                /*---------------------------------------------*/ 
                CotizacionService.getItem(result.id) 
                  .then((cotizacion) => { 
			              /*console.log(cotizacion)			  */
                    let auto = {}
                    auto.valor = valor
                    auto.cotizacionId = result.id
                    auto.tipoId = tipoId
                    auto.marcaId = marcaId
                    auto.modeloId = modeloId		    
                    /*---------------------------------------------------------------*/
                    Promise.all([                      
                      ProductoCoberturaService.getAllProducto(cotizacion.productoId),
                      CoberturaProductosService.getAllProducto(cotizacion.productoId),
                      ProductoClausulaService.getAllProducto(cotizacion.productoId),
                      ClausulaProductosService.getAllProducto(cotizacion.productoId),
                      ProductoCompaniaService.getAll(cotizacion.productoId),
                      AutoService.add(auto)        
                    ]) 
                    .then(([pcob,cobp,pcla,clap,companias,aut]) => { 
                        /******************************************/
			              Promise.all(
                        companias.map(compania => TasaService.getTasas(compania.id,tipoId,cotizacion.valor)))
                        .then((tasas) =>{  
                          /****************************************** */
                          let IOK = ordenar(tasas,cotizacion.valor)
                          Promise.all([createPdf(cotizacion,companias,pcob,cobp,pcla,clap,IOK,modelo)])          
                          .then(([pdf]) => { 
                             /*********************************** */ 
                             MailController.send("testing",cotizacion)
                             .then((mail) => {
                                res.status(200).send({ result: mail });
                              }) 
                             /*********************************** */
                          }) 
                          .catch((reason) => {	      
		            console.log(reason)		  
                            res.status(400).send({ message: reason.message });
                          });
                          /****************************************** */
                          
                        })
                        .catch((reason) => {
				console.log(reason)
                          res.status(400).send({ message: reason.message });
                        });
                        /*****************************************/
                    })
                    .catch((reason) => {	   
			    console.log(reason)
                      res.status(400).send({ message: reason.message });
                    });
                    /*---------------------------------------------------------------*/    
                  })
                  .catch((reason) => {	      
			  console.log(reason)
                    res.status(400).send({ message: reason.message });
                  });
                /*---------------------------------------------*/ 
              })
              .catch((reason) => {	     
		      console.log(reason)
                res.status(400).send({ message: reason.message });
              });
          /*****************************************************************************/
      
      /*------------------------------------*/            
}
	 
  static cotizar(req, res) {  
      const {tipoId, productoId, monto } = req.body
      Promise.all([ProductoCompaniaService.getAllSingle(productoId)]) 
      .then(([companias]) => {            
        Promise.all(companias.map(compania => TasaService.getTasas(compania.id,tipoId,monto)))
            .then(item =>{
	            let rr = ordenar(item,monto)
	            res.status(200).send({ result: rr }); 
            })
        })                            
  }

  static cotizars(req, res) { 
      const {tipoId, productoId, monto } = req.body
      Promise.all([ProductoCompaniaService.getAll(productoId)])
      .then(([companias]) => {
        Promise.all(companias.map(compania => TasaService.getTasas(compania.id,tipoId,monto)))
            .then(item =>{
                    let rr = ordenars(companias,item,monto)
                    res.status(200).send({ result: rr,companias });
            })
        })
  }


  static enviar(req, res) {      
    Promise.all([CotizacionService.getItem(req.params.id)]) 
    .then(([cotizacion]) => {                  
      Promise.all([MailController.send("testing",cotizacion)])           
        .then(([mail]) => {
            res.status(200).send({ result: mail});
        })    
    })
    .catch((reason) => {   
      console.log(reason)               
      res.status(400).send({ reason });
    });     
 }

 static poliza(req, res) {      
  Promise.all([CotizacionService.getItem(req.params.id)]) 
  .then(([cotizacion]) => {                      
    console.log(cotizacion)
    console.log(cotizacion.Cliente)
  
    
  })
  .catch((reason) => {   
    console.log(reason)               
    res.status(400).send({ reason });
  });     
}


}


 function ordenars(companias,dato,monto){
  let ordenado = []
 	 companias.map(it=>{  	 
	 	dato.map(item=>{
		    if(item && (item.productocompaniaId === it.id)){		  
		    let iok = {}
		    iok.id = item.id
		    iok.primaContado = item.tasaContado * monto
		    iok.primaCredito = item.tasaCredito * monto
		    iok.franquicia  = item.franquicia
	            iok.companiaId = it.Companium.id		    
	            iok.filename = it.Companium.filename
	            iok.nombre = it.Companium.nombre		    
		    ordenado.push(iok)
	       }
	})		
  })
	 
  return ordenado
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
                    ordenado.push(iok)}
        })

  return ordenado
}





export default CotizacionesController;
