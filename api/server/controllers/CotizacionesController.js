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
   
  static getData(req, res) {     
    CotizacionService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((result) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {
        res.status(400).send({ reason });
      });
  }

  static getDataMobil(req, res) {         
    CotizacionService.datas(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((result) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {
        res.status(400).send({ reason });
      });
  }

  static getCotizar(req, res) {         
    const {tipoId, productoId, monto } = req.body    

    ProductoCompaniaService.getAllSingle(productoId) 
      .then((companias) => { 
        Promise.all(companias.map(compania => TasaService.getTasas(compania.id,tipoId,monto)))
            .then(item =>{
	            let rr = ordenar(item,monto)
	            res.status(200).send({ result: rr }); 
            })
       })
       .catch((reason) => {
        res.status(400).send({ reason });
      });        
  }

  static getCotizarMobil(req, res) {         
    const {tipoId, productoId, monto } = req.body    
    ProductoCompaniaService.getAll(productoId) 
      .then((companias) => { 
        Promise.all(companias.map(compania => TasaService.getTasas(compania.id,tipoId,monto)))
            .then(item =>{
	            let rr = ordenars(companias,item,monto)
                    res.status(200).send({ result: rr,companias });
            })
       })
       .catch((reason) => {
        res.status(400).send({ reason });
      });        
  }

    
  static getItem(req, res) {                 
   console.log(req.params.id)	  
    Promise.all([CotizacionService.item(req.params.id), AutoService.getItem(req.params.id)]) 
      .then(([cotizacion,auto]) => {             	              
          ProductoCompaniaService.getAll(cotizacion.productoId)        
          .then((companias) => {                                        
            Promise.all(companias.map(compania => TasaService.getTasas(compania.id,auto.tipoId,cotizacion.valor)))
               .then(item =>{
                let tasas = ordenars(companias,item,cotizacion.valor)
                res.status(200).send({ result: {cotizacion, tasas, auto}}) 	                                    
              })
           })
        })          
      .catch((reason) => {                  
	console.log(reason)      
        res.status(400).send({ reason });
      });   
  }

  static setAdd(req, res) {
    const {valor, productoId, clienteId, ivigencia, cliente, nombre, email, telefono, tipoId, marcaId, modeloId, modelo} = req.body      
       /*****************************************************************************/                      
          CotizacionService.add(req.body)
              .then((result) => {         
                /*---------------------------------------------*/ 
                CotizacionService.item(result.id) 
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
                      ProductoCoberturaService.data(cotizacion.productoId),
                      CoberturaProductosService.getAllProducto(cotizacion.productoId),
                      ProductoClausulaService.data(cotizacion.productoId),
                      ClausulaProductosService.data(cotizacion.productoId),
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

   static enviar(req, res) {      
    CotizacionService.item(req.params.id) 
    .then((cotizacion) => {                  
      MailController.send("testing",cotizacion)           
        .then((mail) => {
            res.status(200).send({ result: mail});
        })    
    })
    .catch((reason) => {   
      console.log(reason)               
      res.status(400).send({ reason });
    });     
 }	
  static listadetalle(req, res) {
    ModeloService.getAllMarcaTipo(req.params.id,req.params.tipo)
      .then((result) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {

        res.status(400).send({ reason });
      });
  }
  
  static getSearch(req, res) {
    const {nombres } = req.body
    CotizacionService.search(nombres)
      .then((rows) => {
        res.status(200).send({result: rows });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason });
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
                    ordenado.push(iok)}
        })

  return ordenado
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
export default CotizacionesController;
