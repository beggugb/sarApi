import ClienteService from "../services/ClienteService";
import MensajeService from "../services/MensajeService";
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

class MensajeController { 

  static getData(req, res) {        
    MensajeService.data(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((rows) => {                        
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              	
        res.status(400).send({ message: reason });
      });
  }

   static getDataMobils(req, res) {
    ClienteService.getFacebookId(req.params.usuarioId)
     .then((xrow) => {
          if(xrow)
             {
          MensajeService.total(xrow.id)
            .then((rows) => {
               res.status(200).send({result: rows });
                })
             }
             else{
              res.status(200).send({result: {data:[],total:0,pagina:0,paginas:0 }});
             }
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
   }

   static getDataMobil(req, res) {
    ClienteService.getFacebookId(req.params.usuarioId)
     .then((xrow) => {
          if(xrow)
             {
          MensajeService.datas(req.params.page,req.params.num,xrow.id,xrow.id)
            .then((rows) => {                            
                  res.status(200).send({result: rows });
                })              
             }
             else{
              res.status(200).send({result: {data:[],total:0,pagina:0,paginas:0 }});
             }
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
   }
	
	

  static getItem(req, res) {    
    MensajeService.item(req.params.id)
      .then((row) => {                      
        res.status(200).send({result: row });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
  static setAdd(req, res) {       
    const { tipo, mensaje, clienteId } = req.body
    ClienteService.item(clienteId)
     .then((xrow) => {      
       console.log(xrow.token)   
      MensajeService.add(req.body)
        .then((row) => {      
          let tick = sendMensaje(tipo, mensaje, xrow.token)                          
          res.status(200).send({result: tick });                        
        })                   
        .catch((reason) => {              
        res.status(400).send({ message: reason });
        });     
    })    
  }
  
  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      MensajeService.update(req.body,req.params.id)
        .then((row) => {
           MensajeService.data(1,12,'id','DESC')
             .then((rows) => {               
                res.status(200).send({result: rows, message: 'Siniestro actualizado' });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    } else{
      MensajeService.update(req.body,req.params.id)
        .then((row) => {                      
            MensajeService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row, message: 'Siniestro actualizado' });                        
            })                     
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    }  
  }

  static getDelete(req, res) {    
    if(req.params.tipo === 'lista')
    {
      MensajeService.delete(req.params.id)
        .then((row) => {                      
          MensajeService.data(1,12,'id','DESC')
            .then((rows) => {    
              res.status(200).send({result: rows, message: 'Siniestro eliminado' });      
            })
        })                   
        .catch((reason) => {                
          res.status(400).send({ message: reason.parent.detail });
      });
    }else{
      MensajeService.delete(req.params.id)
        .then((row) => {                      
          res.status(200).send({result: row, message: 'Siniestro eliminado' });
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
      });
    }  
  }

 

  static getSearch(req, res) {    
    const { nombres } = req.body    
    MensajeService.search(nombres)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {      
        console.log(reason)        
        res.status(400).send({ message: reason });
    });
  }
  static getList(req, res) {    
    MensajeService.list(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }

  

  static getItems(req, res) {    
    MensajeService.items(req.params.prop,req.params.value)
      .then((rows) => {                      
        res.status(200).send({result: rows });                        
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
    });
  }
 
 static buscar(req, res) { 
      MensajeService.buscar(req.params.nombre)
           .then((result) => {
                res.status(200).send({ result: result });
            })
        .catch((reason) => {        
          res.status(400).send({ reason });
        });
 }

 static enviar(req, res) { 
      MensajeService.item(req.params.id)
           .then((result) => {
               let msj = sendMensaje("urgente","mensaje de pruebas")		   
                res.status(200).send({ result: msj });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
 }	

}

function sendMensaje(tipo,mensaje, token)
{
  let tieckRes = {}
  let messages = [];  
  messages.push({
        /*to:  "ExponentPushToken[bGIfs1F0uGvHtBaY8_gSCQ]",*/
        to: "ExponentPushToken[Wt3JBeO45CLz8hd06B2CwM]",
        sound: 'default',
        title: tipo,        
        body: mensaje,
        data: { withSome: 'samples' },
      })
 let chunks = expo.chunkPushNotifications(messages); 
  (async () => {      
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log('---------------------');
        console.log(ticketChunk);
        console.log('---------------------');
        tieckRes = ticketChunk
      } catch (error) {
        console.error(error);
      }
    }    
  })();	

  return tieckRes
}

function lista(items){
  let newData = []  
  items.map(item=>{
    let iok = {}
        iok.id       = item.id
        iok.estado   = true
    newData.push(iok)
    })

  return newData
}
export default MensajeController;
