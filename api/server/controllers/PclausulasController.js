import ProductoClausulaService from "../services/ProductoClausulaService";
import ProductoCompaniaService from "../services/ProductoCompaniaService";
import ClausulaProductosService from "../services/ClausulaProductosService";

class PclausulasController {   
  	  

  static item(req, res) {                  
      Promise.all([ProductoClausulaService.getItem(req.params.id)]) 
           .then(([ramo]) => {
                res.status(200).send({ result: ramo });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([ProductoClausulaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([ProductoClausulaService.lista()])
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
    Promise.all([ProductoClausulaService.add(item)/*ClausulaProductosService.add(items)	*/])
      .then(([iok]) => {            
	/************************/
         let clau  = Array()
         let nclau = iok.result.id
	 
	 items.map(item =>{
	     let date = {}
             date.label = item.label;
             date.productoclausulaId = nclau;
             date.productocompaniaId = item.productoId;
             clau.push(date)	
	  })

          Promise.all([
		  ClausulaProductosService.add(clau)
              ]) 
              .then(([result]) => {
		  Promise.all([ProductoClausulaService.getAllProducto(item.productoId)])
		     .then(([clausulas]) => {
		      let rr = ordenar(clausulas)    
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
    Promise.all([ProductoClausulaService.update(req.body, req.params.id)])
      .then(([ramo]) => {
        Promise.all([ ProductoClausulaService.getAll(1,12,"label","ASC")]) 
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
         ClausulaProductosService.delete(req.params.id)])
	      .then(([io]) => {
		 Promise.all([ProductoClausulaService.getItem(req.params.id)])
		      .then(([item]) => {
			 Promise.all([ProductoClausulaService.delete(req.params.id)])
	                      .then(([ramo]) => {			      
		   	        Promise.all([ ProductoClausulaService.getAllProducto(item.productoId)])
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
    Promise.all([ProductoClausulaService.getAllProducto(req.params.id)])        
    .then(([clausulas]) => {        
      let rr = ordenar(clausulas)
/*      console.log(rr)	    */
      res.status(200).send({ message: 'Clausulas',result: rr });
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
    iok.clausulaId = item.clausulaId          
    iok.clausula = item.Clausula.label
    let orden = []    
        dato.map(ite=>{
            if(item.id === ite.id)
            { let ik = {}                   
              ik.id = ite.ClausulaProductos.id
              ik.productoclausulaId = ite.ClausulaProductos.productoclausulaId
              ik.productocompaniaId = ite.ClausulaProductos.productocompaniaId
              ik.label = ite.ClausulaProductos.label          
              orden.push(ik)          
            }        
        })  
    iok.items = orden
    ordenado.push(iok)    
  })    
  return ordenado
}



export default PclausulasController;
