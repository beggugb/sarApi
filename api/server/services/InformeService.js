import database from "../src/models";

const { Categoria } = database;

class CategoriaService {
    
  static getAll() {  
   return new Promise((resolve, reject) => {
      Categoria.findAll({
        attributes: [["id","value"],["name","label"]],
	      order: [['name','ASC']]

      })
        .then((categoria) =>
          resolve(categoria)
        )
        .catch((reason) => reject(reason));
    });
  }
  
}

export default CategoriaService;
