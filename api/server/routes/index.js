import KeyToken from './keyToken'
import KeyTokens from './keyTokens'
import usuarioRoutes from './UsuarioRoutes'
import tareaRoutes from './TareasRoutes'
import clienteRoutes from './ClientesRoutes'
import empresaRoutes from './EmpresasRoutes'
import sucursalRoutes from './SucursalesRoutes'
import rolRoutes from './RolesRoutes'
import informesRoutes from './InformesRoutes'
import filesRoutes from './FilespRoutes'
import coberturaRoutes from './CoberturasRoutes'
import clausulaRoutes from './ClausulasRoutes'
import ramoRoutes from './RamosRoutes'
import tipoRoutes from './TiposRoutes'
import productoRoutes from './ProductosRoutes'
import coberturaProductosRoutes from './CoberturasProductosRoutes'
import clausulaProductosRoutes from './ClausulasProductosRoutes'
import tasaRoutes from './TasasRoutes'
import pcoberturasRoutes from './PcoberturasRoutes'
import pclausulasRoutes from './PclausulasRoutes'
import companiaRoutes from './CompaniasRoutes'
import cotizacionesRoutes from './CotizacionesRoutes'
import catalogoRoutes from './CatalogoRoutes'
import marcaRoutes from './MarcasRoutes'
import modeloRoutes from './ModelosRoutes'
import agenteRoutes from './AgentesRoutes'
import polizaRoutes from './PolizasRoutes'
import notaRoutes from './NotasRoutes'
import ubicacionRoutes from './UbicacionesRoutes'
import propagandaRoutes from './PropagandasRoutes'
import mensajeRoutes from './MensajesRoutes'


export default (app) => {
        app.use('/api/clientes',clienteRoutes);  

        app.use('/api/usuarios',KeyTokens,usuarioRoutes);                
        app.use('/api/tareas',KeyTokens, tareaRoutes);    
        app.use('/api/empresas',KeyTokens, empresaRoutes);
        app.use('/api/sucursales',KeyTokens, sucursalRoutes);
	app.use('/api/roles',KeyTokens, rolRoutes);
        app.use('/api/files',KeyTokens,filesRoutes);        
        app.use('/api/coberturas',KeyTokens,coberturaRoutes);
        app.use('/api/clausulas',KeyTokens,clausulaRoutes);
        app.use('/api/ramos',KeyTokens,ramoRoutes);
        app.use('/api/tipos',KeyTokens,tipoRoutes);
        app.use('/api/productos',KeyTokens,productoRoutes);
        app.use('/api/coberturasp',KeyTokens,coberturaProductosRoutes);
        app.use('/api/clausulasp',KeyTokens,clausulaProductosRoutes);
        app.use('/api/tasas',KeyTokens,tasaRoutes);
        app.use('/api/pcoberturas',KeyTokens,pcoberturasRoutes);
        app.use('/api/pclausulas',KeyTokens,pclausulasRoutes);
	app.use('/api/companias',KeyTokens,companiaRoutes);
        app.use('/api/cotizaciones',KeyTokens,cotizacionesRoutes);
	app.use('/api/catalogos',KeyTokens,catalogoRoutes);
        app.use('/api/marcas',KeyTokens,marcaRoutes);
        app.use('/api/modelos',KeyTokens,modeloRoutes);
	app.use('/api/agentes',KeyTokens,agenteRoutes);
	app.use('/api/polizas',KeyTokens,polizaRoutes);
        app.use('/api/notas',KeyTokens,notaRoutes);
        app.use('/api/informes',KeyTokens,informesRoutes);
        app.use('/api/ubicaciones',KeyTokens,ubicacionRoutes);
        app.use('/api/propagandas',KeyTokens,propagandaRoutes);
        app.use('/api/mensajes',KeyTokens,mensajeRoutes);
        
}
