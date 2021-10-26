import UserService from "../services/UserService";
import MailController from '../controllers/MailController'
import ModuloService from "../services/ModuloService";
import jwt from "jsonwebtoken";
import moment from 'moment'
const bcrypt = require("bcrypt");

class UserController {

  static login(req, res) { 
    const { username, password,  } = req.body;    
    UserService.login(username, password)
      .then((user) => {   
        if(user.usuario === null ){
          res.status(200).send({ user});
	      }else{          
          ModuloService.data(user.usuario.rolId)	   
            .then((modulos) => {
                res.status(200).send({ user, modulos});
            })
            .catch((reason) => {              
              console.log(reason)      
                res.status(400).send({ message: reason });
              });
		
          }	
        })                   
      .catch((reason) => {              
	    console.log(reason)      
        res.status(400).send({ message: reason });
      });
  }


  static getData(req, res) {        
    ClienteService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

  static getList(req, res) {    
    ClienteService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  static getItem(req, res) {    
    ClienteService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  static getItems(req, res) {    
    ClienteService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      ClienteService.update(req.body,req.params.id)
        .then((row) => {
           ClienteService.data(1,12,'nombres','ASC')
             .then((rows) => {               
                res.status(200).send({result: rows });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    } else{
      ClienteService.update(req.body,req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row });                        
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });
    }  
  }

  static getDelete(req, res) {    
    if(req.params.tipo === 'lista')
    {
      ClienteService.delete(req.params.id)
        .then((row) => {                      
          ClienteService.data(1,12,'nombres','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      ClienteService.delete(req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row });                        
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }  
  }

  static setAdd(req, res) {   
    const { nombres } = req.body 
    if(nombres){
    if(req.params.tipo === 'lista')
    {
      ClienteService.add(req.body)
        .then((row) => {                      
          ClienteService.data(1,12,'nombres','ASC')
            .then((rows) => {               
              res.status(200).send({result: rows });                        
            })
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }else{
      ClienteService.add(req.body)
        .then((row) => {                      
          res.status(200).send({result: row });                        
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });
    }  
   }else{
    res.status(400).send({ message: "datos faltantes" });
   }
  }

  static getSearch(req, res) {    
    const {prop, value} = req.body    
    ClienteService.search(prop, value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }


}

export default UserController;
