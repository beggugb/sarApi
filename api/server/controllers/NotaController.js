import NotaCobranzaService from "../services/NotaCobranzaService";
import PlanPagoService from "../services/PlanPagoService";
import ComisionService from "../services/ComisionService";

class NotaController {
    static add(req, res) { 
    const { notaId, id, pmonto, pcomision, usuarioId }  = req.body  
    let pdato = {
        id : id,
        estado : 'pagado'}
    Promise.all([PlanPagoService.update(pdato,id), NotaCobranzaService.getItem(notaId)])
      .then(([resPago,resNota]) => {            
          let newNota = {}          
          newNota.primaSaldo = parseFloat(resNota.primaSaldo) - parseFloat(pmonto)
          newNota.primaPagada = parseFloat(resNota.primaPagada) + parseFloat(pmonto)          
          newNota.comisionSaldo = parseFloat(resNota.comisionSaldo) - parseFloat(pcomision)
          newNota.comisionPagada = parseFloat(resNota.comisionPagada) + parseFloat(pcomision)
          let comision = {}
          comision.label = 'comision pagada'
          comision.usuarioId = usuarioId
          comision.monto = parseFloat(pcomision)
          comision.polizaId = resNota.polizaId
          comision.primaTotal = parseFloat(pmonto)
          Promise.all([NotaCobranzaService.update(newNota,notaId),ComisionService.add(comision)]) 
              .then(([rn,rc]) => {
                Promise.all([NotaCobranzaService.getItem(notaId),PlanPagoService.getAllNota(notaId)]) 
                .then(([resuNota, resuPlan]) => {  
                  res.status(200).send({ result: resuNota, resuPlan });
              })
            })  
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

}

export default NotaController;
