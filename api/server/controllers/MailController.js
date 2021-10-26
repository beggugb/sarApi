import EmpresaService from "../services/EmpresaService";
import ClienteService from "../services/ClienteService"
import nodeMailer from "nodemailer";


const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
const hostname = "http://localhost:3000";
const port = 4000;

class MailController {

  static send(tipo, cotizacion) {    
    let fecha = new Date()
    return new Promise((resolve, reject) => {            
      Promise.all([EmpresaService.item(1)])
        .then(([empresa]) => {          
           Promise.all([enviar(tipo, empresa,cotizacion, fecha)]).then(([mail]) => {
            resolve(mail);        
            });
          }) 
      })            
  }
}

function enviar(tipo, user, cotizacion, fecha) {  
  return new Promise((resolve, reject) => {
    let transporter = nodeMailer.createTransport({
      host: user.smtpHost,
      port: user.smtpPort,
      secure: true,
      auth: {
        user: user.smtpUser,
        pass: user.smtpPassword,
      },
    });
    let template = ""
    let templateMsg = ""
    let emailUser = ""

    switch(tipo){
      case "testing":
        template    = testing(cotizacion,hostname,fecha);
        templateMsg = "Cotización de Seguro";
        emailUser   = cotizacion.email;
      break;     
    }
   
    let mailOptions = {
      to: emailUser,
      subject: templateMsg,
      html: template,
      attachments: [
        {   
            filename: `cotizacion${cotizacion.id}.pdf`,
            path: `${process.cwd()}/api/public/documents/cotizacion${cotizacion.id}.pdf`
        }] 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({ mail: "error" });
      }
      resolve({ mail: "ok" });
    });
  });
}

function testing(cotizacion,hostname,fecha){
  let template =`<body><h2>Cotizacion N° ${cotizacion.id}</h2>      
                  <p><b>Cliente :</b> ${cotizacion.nombres}</p>
                  <p><b>Email :</b> ${cotizacion.email}</p>
                  <p><b>Fecha :</b> ${fecha}</p>
                  <p>                        
                  <p>Adjunta la Cotización realizada</p>                                    
                  <p>En esta dirección de correo recibirás solo lo importante. </p>                                    
                  <p>SGSAR 3.1</p>
                </body>`
  return template                  
}


export default MailController;
