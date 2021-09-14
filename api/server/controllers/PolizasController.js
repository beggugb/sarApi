import ProductoCompaniaService from "../services/ProductoCompaniaService";
import ProductoService from "../services/ProductoService";
import CotizacionService from "../services/CotizacionService";
import ClausulaProductosService from "../services/ClausulaProductosService";
import CoberturaProductosService from "../services/CoberturaProductosService"
import PolizaService from "../services/PolizaService"
import PCoberturaService from "../services/PCoberturaService"
import PClausulaService from "../services/PClausulaService"
import NotaCobranzaService from "../services/NotaCobranzaService"
import PlanPagoService from "../services/PlanPagoService"
import fFecha from "../utils/fFecha"
class PolizasController { 

   static search(req, res) {
    const { nombres } = req.body
      Promise.all([PolizaService.search(nombres)])
           .then(([result]) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {
        console.log(reason)
          res.status(400).send({ reason });
        });
  }
	

   static lista(req, res) {
      Promise.all([PolizaService.getAll(req.params.page,req.params.num)])
        .then(([result]) => { res.status(200).send({ result: result });})
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }
   static item(req, res) {
      Promise.all([
	      PolizaService.getItem(req.params.id),
	      PCoberturaService.getAllPoliza(req.params.id),
	      PClausulaService.getAllPoliza(req.params.id),
	      NotaCobranzaService.getAllPoliza(req.params.id)
      ])
      .then(([polizas,coberturas,clausulas,nota]) => {
          Promise.all([PlanPagoService.getAllNota(nota.id)])
           .then(([pagos]) => {
                res.status(200).send({ result: {polizas,coberturas,clausulas,nota,pagos }});
            })
	  })    
        .catch((reason) => {
          console.log(reason)		
          res.status(400).send({ reason });
        });
  }
	

 static registro(req, res) {   	 
    const {productoId,companiaId, primaTotal, contado, cotizacionId, rolId, usuarioId } = req.body	 
     Promise.all([PolizaService.add(req.body)]) 
      .then(([resPoliza]) => { 
	        Promise.all([ProductoCompaniaService.getCompaniaId(productoId,companiaId),ProductoService.getItemContrato(productoId)])     
	          .then(([resCompania, resProducto]) => {		  
	              Promise.all([CoberturaProductosService.getAllCProducto(resCompania.id),ClausulaProductosService.getAllCProducto(resCompania.id)])
	   	              .then(([coberturas,clausulas]) => {     
	                      let ncoberturas = []
		                    coberturas.map(item =>{
		                      let dato ={}
	                        dato.label = item.label
		                      dato.key = item.key
                          dato.productocompaniaId = item.productocompaniaId				  
	                        dato.clausulaId = item.clausulaId
	                        dato.productoId = item.productoId
	                        dato.polizaId = resPoliza.id
	                        dato.coberturaId = item.coberturaId		  
	                        ncoberturas.push(dato)		  
		                    })
                        let nclausulas = []  
                        clausulas.map(item =>{
                          let dat ={} 
                          dat.label = item.label
                          dat.key = item.key
                          dat.productocompaniaId = item.productocompaniaId    
                          dat.clausulaId = item.clausulaId
                          dat.productoId = item.productoId
                          dat.polizaId = resPoliza.id
	                        dat.clausulaId = item.clausulaId		  
                          nclausulas.push(dat)
                        })			
 
		                  let fecha = new Date()	
		                  let nota = {}
		                  nota.nro =  poliza.id
                      nota.num = contado ? 1 : 5
                      nota.primaTotal = primaTotal
                      nota.primaSaldo = primaTotal
                      nota.primaPagada = 0
                      nota.comisionTotal = parseFloat(primaTotal) * parseFloat(resProducto.comision)
                      nota.comisionSaldo = parseFloat(primaTotal) * parseFloat(resProducto.comision)
                      nota.comisionPagada = 0
                      nota.ivigencia= fecha 
                      nota.fvigencia= fecha 
                      nota.polizaId= poliza.id 		
             	        Promise.all([PCoberturaService.add(ncoberturas),PClausulaService.add(nclausulas),NotaCobranzaService.add(nota)])
                        .then(([resCo,resCa,resNota]) => {
		                        let nronota = contado ? 1 : 5	
	                          var d = new Date()		
		                        let pagos = []	
		                        for (let i = 1; i <= nronota; i++) {
	                            let date = {}
        	                    date.ncuota = i;
	                            date.pmonto = parseFloat(primaTotal / nronota);
			                        date.monto = parseFloat(primaTotal / nronota);    
                	            date.pcomision = parseFloat(resNota.comisionTotal / nronota)
			                        date.comision = parseFloat(resNota.comisionTotal / nronota)
			                        date.estado = 'pendiente';    
        	                    date.fechaPago = i === 1 ? d : fFecha.sumarMes(i)
	                            date.notaId = resNota.id
                  	          pagos.push(date)	
		                        }	
	                          let newCotizacion = {}
	                          newCotizacion.id = cotizacionId		
	                          newCotizacion.contratado = true		
		                        Promise.all([PlanPagoService.add(pagos),CotizacionService.update(newCotizacion,cotizacionId)])
		                            .then(([resPagos,resCoti]) => {
	                                  Promise.all([CotizacionService.getAll(usuarioId,rolId,1,12)])
                                        .then(([resCotizacionesAll]) => {		      
			                                        res.status(200).send({ result: resCotizacionesAll });
		  	
                                        })
                                })			    
	                      })		
		 
	          })		
      })		      
    })
    .catch((reason) => {       
      res.status(400).send({ reason });
    });     
   }

}
export default PolizasController;
