import ProductoCoberturaService from "../services/ProductoCoberturaService";
import ProductoCompaniaService from "../services/ProductoCompaniaService";
import CoberturaProductosService from "../services/CoberturaProductosService";

class PcoberturasController {   
  	  

  static item(req, res) {                  
      Promise.all([ProductoCoberturaService.getItem(req.params.id)]) 
           .then(([ramo]) => {
                res.status(200).send({ result: ramo });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([ProductoCoberturaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([ProductoCoberturaService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    console.log(req.body) 	 
    const {item, items } = req.body
    Promise.all([ProductoCoberturaService.add(item)/*CoberturaProductosService.add(items)	*/])
      .then(([iok]) => {            
	/************************/
         let clau  = Array()
         let nclau = iok.result.id
	 
	 items.map(item =>{
	     let date = {}
             date.label = item.label;
             date.productocoberturaId = nclau;
             date.productocompaniaId = item.productoId;
             clau.push(date)	
	  })

          Promise.all([
		  CoberturaProductosService.add(clau)
              ]) 
              .then(([result]) => {
		  Promise.all([ProductoCoberturaService.getAllProducto(item.productoId)])
		     .then(([coberturas]) => {
		      let rr = ordenar(coberturas)    
                 	 res.status(200).send({ result: rr });
			     })

              })
          })        
      .catch((reason) => {          
	console.log(reason)      
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([ProductoCoberturaService.update(req.body, req.params.id)])
      .then(([ramo]) => {
        Promise.all([ ProductoCoberturaService.getAll(1,12,"label","ASC")]) 
          .then(([ramoes]) => {
              res.status(200).send({ message:'Ramo actualizada', result: ramoes });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Ramo: null });
      });
  }

static delete(req, res) {
console.log(req.params.id)	  
      Promise.all([
         CoberturaProductosService.delete(req.params.id)])
	      .then(([io]) => {
		 Promise.all([ProductoCoberturaService.getItem(req.params.id)])
		      .then(([item]) => {
			 Promise.all([ProductoCoberturaService.delete(req.params.id)])
	                      .then(([ramo]) => {			      
		   	        Promise.all([ ProductoCoberturaService.getAllProducto(item.productoId)])
		              .then(([result]) => {
				 let rr = ordenar(result)     
                		  res.status(200).send({ message: 'Ramo registrada',result: rr });
              })
	   })		      
	    })
		
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }

  static listadetalle(req, res) {         
    Promise.all([ProductoCoberturaService.getAllProducto(req.params.id)])        
    .then(([coberturas]) => {        
      let rr = ordenar(coberturas)
      res.status(200).send({ message: 'Coberturas',result: rr });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ reason });
      });
  }
    
}


function ordenar(dato){  
  let ordenado = []    
  const unique = [];
  dato.map(x => unique.filter(a => a.id == x.id).length > 0 ? null : unique.push(x)); 
  unique.map(item=>{
    let iok = {}
    iok.id = item.id
    iok.productoId = item.productoId
    iok.coberturaId = item.coberturaId          
    iok.cobertura = item.Cobertura.label
    let orden = []    
        dato.map(ite=>{
            if(item.id === ite.id)
            { let ik = {}                   
              ik.id = ite.CoberturaProductos.id
              ik.productocoberturaId = ite.CoberturaProductos.productocoberturaId
              ik.productocompaniaId = ite.CoberturaProductos.productocompaniaId
              ik.label = ite.CoberturaProductos.label          
              orden.push(ik)          
            }        
        })  
    iok.items = orden
    ordenado.push(iok)    
  })    
  return ordenado
}



export default PcoberturasController;
