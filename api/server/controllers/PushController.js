import PushService from "../services/PushService";
import MensajeService from "../services/MensajeService"
import ClienteService from "../services/ClienteService"
import TicketService from "../services/TicketService"
import PlanPagoService from "../services/PlanPagoService"

import { Expo } from 'expo-server-sdk';
const expo = new Expo();


class PushController {    

    static moras(req, res) { 
      PlanPagoService.date()
        .then((result) => {
            let clientes = ordenar(result)         
            let msj = sendCobro(clientes)
            MensajeService.adds(clientes)
              .then((result) => {
                 res.status(200).send({ result: msj });
              })
          })  
        .catch((reason) => {
          console.log(reason)		
          res.status(400).send({ reason });
        });
    }
    
    static enviar(req, res) {       
      Promise.all([TicketService.item(req.params.templateId),ClienteService.date()])
           .then(([template,result]) => { 
              let clientes = ordenars(template,result)               
              let msj = sendMensaje(clientes)              
              MensajeService.adds(clientes)
              .then((result) => {
                 res.status(200).send({ result: msj });
              })
            })
        .catch((reason) => {
          console.log(reason)
          res.status(400).send({ reason });
        });
 }	
}   

function sendCobro(clientes)
{
  let messages = [];
  for (let pushToken of clientes) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]    
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken.token)) {
      console.error(`Push token ${pushToken.token} is not a valid Expo push token`);
      continue;
    }    
    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)    

    messages.push({
      to: pushToken.token,      
      sound: 'default',
      title: "Pago vencido",
      body: pushToken.mensaje,
      data: { withSome: 'data' },
    })
  }

 console.log(messages)
 let chunks = expo.chunkPushNotifications(messages);
 let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk)        
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();  
  return tickets
} 

function sendMensaje(clientes)
{

  let messages = [];
  for (let pushToken of clientes) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]    
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken.token)) {
      console.error(`Push token ${pushToken.token} is not a valid Expo push token`);
      continue;
    }    
    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken.token,      
      sound: 'default',
      title: 'Información',
      body: pushToken.mensaje,
      data: { withSome: 'data' },
    })
  }

 console.log(messages)
 let chunks = expo.chunkPushNotifications(messages);
 let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk)        
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  return tickets
} 

function ordenars(template,items){
  let newData = []  
  items.map(item=>{
    let iok = {}        
        iok.mensaje   = template.title
        iok.tipo      = template.tipo
        iok.estado    = false
        iok.clienteId = item.id
        iok.usuarioId = item.facebookId
        iok.token     = item.token
    newData.push(iok)
    })

  return newData
}
function ordenar(items){
  let newData = []  
  items.map(item=>{
    let iok = {}        
        iok.mensaje   = `Nro. cuota ${item.ncuota} - fecha ${item.fechaPago} - monto ${item.monto} $`
        iok.tipo      = 'Corbro'
        iok.estado    = false
        iok.clienteId = item.NotaCobranza.Poliza.Cliente.id
        iok.usuarioId = item.NotaCobranza.Poliza.Cliente.facebookId
        iok.token     = item.NotaCobranza.Poliza.Cliente.token
    newData.push(iok)
    })

  return newData
}
export default PushController;
