module.exports = (img,cotizacion,companias,pcob,cobp,pcla,clap,tsa) => {
 const today = new Date();  

 var len = 80 / companias.length
 var lec = 100 / companias.length 
 var td = `<td width="${len}%" class="cob">`
 var tdcf = `<td width="${len}%" class="cof">`
 var tdcn = `<td width="${len}%" class="com">`


  /************************************************************/
  var tasas = "<table class='tables-clausulas'>";
    tasas += "<tr><td width='20%' class='cobe'>Prima Contado</td>";           
    for(var i in tsa){      
      tasas += td+parseFloat(tsa[i].primaContado).toFixed(2)+"$us.</td>";
    }
    tasas += "</tr>";
    tasas += "<tr><td width='20%' class='cobe'>Prima Credito</td>";           
    for(var i in tsa){      
      tasas += td+parseFloat(tsa[i].primaCredito).toFixed(2)+"$us.</td>";
    }
    tasas += "</tr>";
    tasas += "<tr><td width='20%' class='cobe'>Franquicia</td>";           
    for(var i in tsa){      
      tasas += td+parseFloat(tsa[i].franquicia).toFixed(2)+"$us.</td>";
    }
    tasas += "</tr>";           
  tasas += "</table>";
  /************************************************************/

  
 /************************************************************/
 var compania = "<table class='tables-clausulas'>";
 compania += "<tr>"; 
 compania += "<td width='20%' class='cobe'></td>";
 for(var i in companias){           
    compania += td+`<img src="${img+companias[i].Companium.filename}" border="0" alt="logo" width="100" height="40">`+"</td>";        
    
 }
 compania += "</tr>";
 compania += "<tr>"; 
 compania += "<td width='20%' class='cobe'></td>";
 for(var i in companias){             
  compania += td+companias[i].Companium.nombre+"</td>";          
} 
compania += "</tr>";
compania += "</table>";
 /************************************************************/


 /************************************************************/
 var coberturas = "<table class='tables-clausulas'>";
 for(var i in pcob){
    coberturas += "<tr>";       
    coberturas += "<td width='20%' class='cobe'>"+pcob[i].label+"</td>";
    for(var j in cobp){
      if(pcob[i].coberturaId === cobp[j].coberturaId)
      coberturas += td+cobp[j].label+"</td>";
    }      
    coberturas += "</tr>";
 }
 coberturas += "</table>";
 /************************************************************/

 /************************************************************/
 var clausulas = "<table class='tables-clausulas'>";
 for(var i in pcla){
    clausulas += "<tr>";       
    clausulas += "<td width='20%' class='cobe'>"+pcla[i].label+"</td>";
    for(var j in clap){
      if(pcla[i].clausulaId === clap[j].clausulaId)
      clausulas += td+clap[j].label+"</td>";
    }      
    clausulas += "</tr>";
 }
 clausulas += "</table>";
 /************************************************************/

return `<html>
  <head>
    <meta charset="utf8">
    <title>SuitArt Business Card</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        font-family: 'Sackers Gothic Std';
        font-weight: 500;
         font-size: 11px;
        background: rgb(241,241,241);
        -webkit-print-color-adjust: exact;
        box-sizing: border-box;
      }

      .page {
        position: relative;
        height: 100%;
        width: 100%;
        display: block;
        background: white;
        page-break-after: auto;        
        overflow: hidden;
      }

      @media print {
        body {
          background: white;
        }

        .page {
          margin: 0;
          height: 100%;
          width: 100%;
        }
      }

      .contenedor {        
        height: 98%;
        padding: 3px;
      }

    
      .cliente {
        border: 1px solid #c1c1c1;
        border-radius: 5px;
        height: 3%;
        padding: 5px;
        width: 98%;
      }
      .cotizacion {
        border: 1px solid #c1c1c1;
        border-radius: 5px;
        height: 10%;
        padding: 5px;
      }


      .tasas {
        border: 1px solid #c1c1c1;
        border-radius: 5px;
        height: 8%;
        padding: 5px;
        background-color: #ebb18b;
      }

      .detalle {
        border: 1px solid #c1c1c1;
        border-radius: 5px;
        height: 72%;
        padding: 5px;
      }

      .datos {        
        border-radius: 5px;
        height: 100%;        
        width: 20%;
        float: left;
      }
      .companias {        
        height: 100%;        
        width: 80%;
        float: left;
        padding-left: 3px;              
      }
      .tables-companias {        
        width: 100%;        
        height: 72%;
        border-spacing: 0;
        font-size: 11px;
        margin: 0 !important;
      }

      .tables-companias td{
        border: 1px solid #c1c1c1;                 
      }
      .tables-companias-titulos{        
        width: 100%;        
        height: 25%;
        border-spacing: 0;
         font-size: 11px;
      }
      .tables-companias-titulos td{
        border: 1px solid #c1c1c1;                     
        
      }


      .items {
        border: 1px solid #c1c1c1;  
        height: 100%;        
        width: 100%;
        float: left;
      }
      

      .coberturas{          
        background-color: #1b88e4;                
        text-align: center;
        padding: 1px;
        color: #fff;
        font-weight: 600;
      }
      .clausulas{             
        background-color:  #1baae4;      
        text-align: center;
        padding: 1px;
        color: #fff;
        
      }
      .tables-clausulas {        
        width: 100%;                 
        border-spacing: 0;
        font-size: 11px;
        background-color: #fff;
      }

      .tables-clausulas td{
        border: 1px solid #c1c1c1;    
        text-align: center;               
      }
   
      .cobe{
        text-align: left !important; 
        padding-left: 2px;
        font-size: 9px;
      }
      .cob{
        font-size: 9px;
        text-align: center  !important; 
      }
      .cof{
        height: 60px;
        font-size: 9px;
        text-align: center !important;         
      }
      .com{
        height: 20px;
        font-size: 9px;
        text-align: center !important; 
      }

      .table-datos{                
        width: 99%;
        border-spacing: 0;
      }
      

      .table-datos td{                
        font-size: 8px; 
        border: 1px solid #eaeaea;       
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="contenedor">        
        <div class="cliente">                   
          <table class="table-datos">
            <tr>
              <td width="10%"><b>Cliente :</b></td>                            
              <td width="20%">${cotizacion.Cliente.nombres}</td>            
              <td width="10%"><b>Email :</b></td>                            
              <td width="20%">${cotizacion.Cliente.email}</td>            
              <td width="10%"><b>Valor :</b></td>
              <td width="10%">${parseFloat(cotizacion.valor).toFixed(2)} $us.</td>                      
              <td width="10%"><b>Vigencia :</b></td>                                    
              <td width="10%">${cotizacion.fvigencia}</td>
            </tr>
          </table>
        </div>
        <div class="cotizacion">                   
             ${compania}             
        </div>
        <div class="tasas">
        ${tasas}
        </div>
        <div class="detalle">
          <div class="items">
            <div class="coberturas">Coberturas</div>            
            ${coberturas}            
            <div class="clausulas">Clausulas</div>
            ${clausulas}            
          </div>          
        </div>       
      </div>  
    </div>    
  </body>
</html>	`;
};
