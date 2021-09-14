import ClienteService from "../services/ClienteService";
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

class MensajeController { 

	
static sendMessajeUnit(req, res) {   
  const { clienteId, mensaje } = req.body              
    ClienteService.getItem(clienteId) 
      .then((cliente) => {        
        let tick = sendMensaje(mensaje, cliente.token)
        res.status(200).send({ result: tick });
      })        
      .catch((reason) => {                  
        res.status(400).send({ reason });
      });  
  }
};

function sendMensaje(mensaje, token)
{
  let tieckRes = {}
  let messages = [];  
  messages.push({
        /*to:  "ExponentPushToken[bGIfs1F0uGvHtBaY8_gSCQ]",*/
        to: token,
        sound: 'default',
        title:'Algo',
        body: "`expo-notifications` will never see this 😢",
        /*body: mensaje,*/
        data: { withSome: 'goes here' },
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

export default MensajeController;
