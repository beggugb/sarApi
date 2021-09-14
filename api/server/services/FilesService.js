import database from "../src/models";


const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sharp = require("sharp");
const multer = require('multer');
const uuidv4 = require('uuid');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'api/public/images/trash')
    },
    filename: function (req, file, cb) {
  
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
var upload = multer({ storage: storage }).single('file')

class FilesService {
   
    static uploada(req,res) {
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/agentes/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/agentes/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/agentes/sm/' + req.file.filename);
          resolve(req.file)
        })
      })
  }
	
   static uploadm(req,res) {
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/modelos/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/modelos/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/modelos/sm/' + req.file.filename);
          resolve(req.file)
        })
      })
  }	
   static upload(req,res) {         
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/clientes/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/clientes/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/clientes/sm/' + req.file.filename);
          resolve(req.file)
        })
      })
  } 
  static uploade(req,res) {
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/empresa/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/empresa/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/empresa/sm/' + req.file.filename);
          resolve(req.file)
        })
      })
  }
	

  static uploads(req,res) {         
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/companias/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/companias/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/companias/sm/' + req.file.filename);
          resolve(req.file)
        })
      })
  }

 
}

export default FilesService;
