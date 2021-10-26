import ClausulaProductosService from "../services/ClausulaProductosService";
import ProductoClausulaService from "../services/ProductoClausulaService"
import ProductoCoberturaService from "../services/ProductoCoberturaService"
import CoberturaProductosService from "../services/CoberturaProductosService"

class CatalogoController {  

  static setUpdate(req, res) {
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

  static setAdd(req, res) {
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
  
  static getItem(req, res) {
    Promise.all([
      ProductoCoberturaService.data(req.params.id),
      CoberturaProductosService.data(req.params.id),
	    ProductoClausulaService.data(req.params.id),
      ClausulaProductosService.data(req.params.id)
    ])
      .then(([xpcoberturas, xcoberturasp, zpclausulas, zclausulasp]) => {
          res.status(200).send({ result: { xpcoberturas, xcoberturasp, zpclausulas, zclausulasp }});
      })
      .catch((reason) => {
              console.log(reason)
       res.status(400).send({ message: reason.message });
      });
    }
}


export default CatalogoController;
