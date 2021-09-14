import ProductoCompaniaService from "../services/ProductoCompaniaService";
import TasaService from "../services/TasaService";
import CotizacionService from "../services/CotizacionService";

import ClausulaProductosService from "../services/ClausulaProductosService";
import ProductoClausulaService from "../services/ProductoClausulaService"
import ProductoCoberturaService from "../services/ProductoCoberturaService"
import CoberturaProductosService from "../services/CoberturaProductosService"

class CatalogoController {

  static add(req, res) {
    const {productoId,lpcoberturas,lcoberturasp,lpclausulas,lclausulasp} = req.body
      Promise.all([ 
         ProductoClausulaService.delete(productoId),
         ClausulaProductosService.delete(productoId),
         ProductoCoberturaService.delete(productoId),
         CoberturaProductosService.delete(productoId)
      ])
      .then(([result]) => {
	Promise.all([
            ProductoClausulaService.add(lpclausulas),		
	    ClausulaProductosService.add(lclausulasp),	    
	    ProductoCoberturaService.add(lpcoberturas),
	    CoberturaProductosService.add(lcoberturasp)
    	])	  
        .then(([rest]) => {
          res.status(200).send({ data: rest });
        })		
      })
      .catch((reason) => {
        console.log(reason)      
       res.status(400).send({ message: reason.message });
      });
   }

   static update(req, res) {
    const {lpcoberturas,lcoberturasp,lpclausulas,lclausulasp} = req.body
    Promise.all([
            ProductoClausulaService.update(lpclausulas),
            ClausulaProductosService.update(lclausulasp),
            ProductoCoberturaService.update(lpcoberturas),
            CoberturaProductosService.update(lcoberturasp)
    ])
        .then(([result]) => {
          res.status(200).send({ data: result });
      })
      .catch((reason) => {
        console.log(reason)
       res.status(400).send({ message: reason.message });
      });
   }	

  	
  
  static item(req, res) {
    Promise.all([
            ProductoCoberturaService.getAllProducto(req.params.id),
            CoberturaProductosService.getAllProducto(req.params.id),
	    ProductoClausulaService.getAllProducto(req.params.id),
            ClausulaProductosService.getAllProducto(req.params.id)
    ])
        .then(([pcob,cobp,pcla,clap]) => {
          res.status(200).send({ result: { pcob,cobp, pcla, clap }});
      })
      .catch((reason) => {
              console.log(reason)
       res.status(400).send({ message: reason.message });
      });
    }
}


export default CatalogoController;
