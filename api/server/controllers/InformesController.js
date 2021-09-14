import ClienteService from "../services/ClienteService";
import ComisionService from "../services/ComisionService";
import PolizaService from "../services/PolizaService";
import AgenteService from "../services/AgenteService"
import CotizacionService from "../services/CotizacionService";
import CampanaService from "../services/CampanaService"
const axios = require('axios')
import moment from 'moment'



class InformesController {

  static clientes(req, res) {    
    const { desde, hasta } = req.body;       
    Promise.all([ClienteService.reporte(desde, hasta)])
      .then(([data]) => {
        res.status(200).send({ result: {detalle: data.total, data: data } });
      })
      .catch((reason) => {
	console.log(reason)      
        res.status(400).send({ message: reason });
      });    
  }
  static cotizaciones(req, res) {    
      const { desde, hasta, usuarioId } = req.body;
      console.log(usuarioId)	  
      Promise.all([CotizacionService.total(desde,hasta,usuarioId),CotizacionService.totalDetalle(desde,hasta,usuarioId)])
        .then(([dat,datas]) => {
          res.status(200).send({ result: { detalle: dat.total, data: datas} });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
  }
  static polizas(req, res) {    
    const { desde, hasta, usuarioId } = req.body;
    Promise.all([PolizaService.total(desde,hasta,usuarioId),PolizaService.totalDetalle(desde,hasta,usuarioId)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
    .catch((reason) => {
      console.log(reason) 	    
      res.status(400).send({ message: reason });
    });    
}
static comisiones(req, res) {    
  const { desde, hasta } = req.body;
  Promise.all([ComisionService.total(desde,hasta),ComisionService.totalDetalle(desde,hasta)])
    .then(([dat,datas]) => {
      res.status(200).send({ result: { detalle: dat.total, data: datas} });
    })
  .catch((reason) => {
    res.status(400).send({ message: reason });
  });    
}
static agentes(req, res) {    
  const { desde, hasta } = req.body;
  Promise.all([AgenteService.total(desde,hasta),AgenteService.totalDetalle(desde,hasta)])
    .then(([dat,datas]) => {
      res.status(200).send({ result: { detalle: dat.total, data: datas} });
    })
  .catch((reason) => {
    res.status(400).send({ message: reason });
  });    
}


static campanas(req, res) {    
  const fDate = new Date()
  console.log(fDate)
  Promise.all([CampanaService.getCampanaActiva(fDate),
    ClienteService.getAlls()])
    .then(([campana, clientes]) => {
      const promises = clientes.map((userEmail, i) =>
      new Promise(resolve =>
          setTimeout(() => {
            /*aconsole.log(userEmail)*/
         axios
	  .post('https://beggu-bo.com/mensajes/whatsapp/sendmessage', {
	    "phone":591+userEmail.telefono,
	    "body":"mensaje de pruebas",
	  })
	  .then(res => {})		  
            resolve()
          }, 2000 * clientes.length - 2000 * i)
        )
      )
      Promise.all(promises)
      .then(() => {
        res.status(200).send({ result: "enviado" });
      })
  .catch((reason) => {
    res.status(400).send({ message: reason });
   });    
  })
 }
}



export default InformesController;


   
