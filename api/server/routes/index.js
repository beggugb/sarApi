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
import pushRoutes from './PushRoutes'
import planRoutes from './PlanPagoRoutes'
import ticketRoutes from './TicketsRoutes'

import siniestrosRoutes from './SiniestrosRoutes'
export default (app) => {
        app.use('/api/clientes',clienteRoutes);  

        app.use('/api/usuarios',usuarioRoutes);                
        app.use('/api/tareas',tareaRoutes);    
        app.use('/api/empresas',empresaRoutes);
        app.use('/api/sucursales', sucursalRoutes);
	app.use('/api/roles', rolRoutes);
        app.use('/api/files',filesRoutes);        
        app.use('/api/coberturas',coberturaRoutes);
        app.use('/api/clausulas',clausulaRoutes);
        app.use('/api/ramos',ramoRoutes);
        app.use('/api/tipos',tipoRoutes);
        app.use('/api/productos',productoRoutes);
        app.use('/api/coberturasp',coberturaProductosRoutes);
        app.use('/api/clausulasp',clausulaProductosRoutes);
        app.use('/api/tasas',tasaRoutes);
        app.use('/api/pcoberturas',pcoberturasRoutes);
        app.use('/api/pclausulas',pclausulasRoutes);
	app.use('/api/companias',companiaRoutes);
        app.use('/api/cotizaciones',cotizacionesRoutes);
	app.use('/api/catalogos',catalogoRoutes);
        app.use('/api/marcas',marcaRoutes);
        app.use('/api/modelos',modeloRoutes);
	app.use('/api/agentes',agenteRoutes);
	app.use('/api/polizas',polizaRoutes);
        app.use('/api/notas',notaRoutes);
        app.use('/api/informes',informesRoutes);
        app.use('/api/ubicaciones',ubicacionRoutes);
        app.use('/api/propagandas',propagandaRoutes);
        app.use('/api/mensajes',mensajeRoutes);
        app.use('/api/push',pushRoutes);
        app.use('/api/siniestros',siniestrosRoutes);
        app.use('/api/pagos',planRoutes);
        app.use('/api/tickets',ticketRoutes);
}
