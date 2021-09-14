import TareaService from "../services/TareaService";

import moment from 'moment'

class TareaController {

  static lista(req, res) {    
    const { usuarioId, start, end } = req.body;       
    Promise.all([TareaService.getAll(usuarioId, start, end)])
      .then(([data]) => {
        res.status(200).send({ result: data });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
  }
  static add(req, res) {    
    const { usuarioId , inicio, fin } = req.body    
    /*console.log(req.body)	  */
   
     Promise.all([ TareaService.add(req.body) ])
      .then(([tarea]) => {        
        Promise.all([ TareaService.getAll(usuarioId, inicio, fin ) ])
            .then(([data]) => {
            res.status(200).send({ message:"tarea registrada", result: data });
         })  
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
      
  }

  static update(req, res) {        
    const { id, usuarioId , inicio, fin  } = req.body        
    Promise.all([ TareaService.update(req.body,id) ])
      .then(([tarea]) => {
        Promise.all([ TareaService.getAll(usuarioId, inicio, fin ) ])
            .then(([data]) => {
            res.status(200).send({ message:"tarea actualizada", result: data });
          })   
      })
      .catch((reason) => {
        
        res.status(400).send({ message: reason });
      });    
  }

}

export default TareaController;


   
