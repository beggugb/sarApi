import ClienteService from "../services/ClienteService";
import FilesService from "../services/FilesService";
import CompaniaService from "../services/CompaniaService";
import EmpresaService from "../services/EmpresaService";
import ModeloService from "../services/ModeloService";
import AgenteService from "../services/AgenteService";
class FilesController {

   static agente(req, res) {
    Promise.all([FilesService.uploada(req, res)])
      .then(([file]) => {
        const art = {}
        art.filename = file.filename
        Promise.all([AgenteService.update(art, req.params.id)])
          .then(([result]) => {
                res.status(200).send({ result })
          })
      })
      .catch(reason => {

        res.status(400).send({ 'message': reason })
      })

  }
	
 
  static modelo(req, res) {
    Promise.all([FilesService.uploadm(req, res)])
      .then(([file]) => {
        const art = {}
        art.filename = file.filename
        Promise.all([ModeloService.update(art, req.params.id)])
          .then(([result]) => {
                res.status(200).send({ result })
          })
      })
      .catch(reason => {

        res.status(400).send({ 'message': reason })
      })

  }

  static cliente(req, res) {  
    Promise.all([FilesService.upload(req, res)])
      .then(([file]) => {
        const art = {}
        art.filename = file.filename
        Promise.all([ClienteService.update(art, req.params.id)])
          .then(([result]) => {
                res.status(200).send({ result })
          })
      })
      .catch(reason => {
        
        res.status(400).send({ 'message': reason })
      })
	  
  }

  static empresa(req, res) {
    Promise.all([FilesService.uploade(req, res)])
      .then(([file]) => {
        const art = {}
        art.filename = file.filename
        Promise.all([EmpresaService.update(art, req.params.id)])
          .then(([result]) => {
                res.status(200).send({ result })
              })
      })
      .catch(reason => {

        res.status(400).send({ 'message': reason })
      })

  }
	

  static compania(req, res) {      
     Promise.all([FilesService.uploads(req, res)])
       .then(([file]) => {
         const art = {}
         art.filename = file.filename
         Promise.all([CompaniaService.update(art, req.params.id)])
               .then(([result]) => {
                 res.status(200).send({ result })
               })
       })
       .catch(reason => {
         
         res.status(400).send({ 'message': reason })
       })
     
   }



  
}

export default FilesController;
