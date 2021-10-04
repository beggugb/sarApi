import PushService from "../services/PushService";

class PushController {    

    static mensajes(req, res) { 
      PushService.getMensajes(req.params.page,req.params.num,req.params.id)
        .then((result) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          console.log(reason)		
          res.status(400).send({ reason });
        });
    }
}   

 
export default PushController;
