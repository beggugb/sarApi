import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Auto, Tipo, Marca, Modelo } = database;

class AutoService {
    
    static add(newAuto) {    
        return new Promise((resolve, reject) => {
          Auto.create(newAuto,{raw: true,
            nest: true })
            .then((nota) => {                
               resolve(nota)
           })
           .catch((reason) => {                
             reject({ message: reason.message, Tipo: null })
          });            
       });
    }    
    static getItem(cotizacionId) {
      return new Promise((resolve, reject) => {
        Auto.findOne({ 
          raw: true,
          nest: true,
          where: { cotizacionId: cotizacionId},
           include: [
             { model: Marca,attributes: ["id", "nombre"]},
             { model: Modelo, attributes: ["id", "nombre","filename"]},
	     { model: Tipo, attributes: ["id", "nombre"]}   

         ]		
        })
          .then((ramo) => resolve(ramo))
          .catch((reason) => reject(reason));
      });
    }
}

export default AutoService;
