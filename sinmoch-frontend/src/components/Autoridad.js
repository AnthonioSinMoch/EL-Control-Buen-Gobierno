import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, TextField, Button, Box, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText, Collapse } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const bienes = [
  {
    valorAdquisicion: '100,000 MXN',
    valorActual: '150,000 MXN',
    fechaAdquisicion: '2020-01-15',
    tipoBien: 'Inmueble',
    ingresosNetos: '500,000 MXN',
    deudasObligaciones: '50,000 MXN',
  },
  {
    valorAdquisicion: '200,000 MXN',
    valorActual: '180,000 MXN',
    fechaAdquisicion: '2018-06-23',
    tipoBien: 'Vehículo',
    ingresosNetos: '600,000 MXN',
    deudasObligaciones: '70,000 MXN',
  },
];
const procedimientos = [
  {
    nombreServidor: 'Juan Pérez',
    puesto: 'Jefe de Compras',
    dependencia: 'Secretaría de Finanzas',
    fechaParticipacion: '2024-11-10',
    tipoProcedimiento: 'Licitación Pública',
    montoContratacion: '1,000,000 MXN',
    duracionContrato: '1 año',
    proveedor: 'ABC S.A. de C.V.'
  },
  {
    nombreServidor: 'María López',
    puesto: 'Directora de Proyectos',
    dependencia: 'Secretaría de Obras',
    fechaParticipacion: '2024-05-22',
    tipoProcedimiento: 'Adjudicación Directa',
    montoContratacion: '500,000 MXN',
    duracionContrato: '6 meses',
    proveedor: 'XYZ Ltd.'
  },
];
const sancionados = [
  {
    nombre: 'Carlos García',
    puesto: 'Director de Recursos Humanos',
    dependencia: 'Secretaría de Salud',
    tipoSancion: 'Inhabilitación',
    motivo: 'No presentar declaración patrimonial',
    fechaSancion: '2023-08-15',
    duracionSancion: '2 años',
    montoSancion: '500,000 MXN',
    historialSanciones: 'Primera sanción'
  },
  {
    nombre: 'Ana Pérez',
    puesto: 'Jefa de Compras',
    dependencia: 'Secretaría de Educación',
    tipoSancion: 'Suspensión',
    motivo: 'Irregularidades en contratos',
    fechaSancion: '2024-01-10',
    duracionSancion: '6 meses',
    montoSancion: '200,000 MXN',
    historialSanciones: 'Segunda sanción'
  },
];
const entregasRecepciones = [
  {
    servidorSaliente: 'Laura Sánchez',
    servidorEntrante: 'Miguel Pérez',
    fechaEntregaRecepcion: '2024-01-20',
    inventarioBienes: '10 computadoras, 5 impresoras, 2 vehículos',
    documentacionProyectos: 'Proyecto A: en progreso, Proyecto B: finalizado',
    cuentasEstadosFinancieros: 'Cuenta A: $10,000, Cuenta B: $5,000',
    actasEntregaRecepcion: 'Acta de entrega-recepción firmada el 20/01/2024',
    pendientesCompromisos: 'Completar informe final del Proyecto A',
    observacionesComentarios: 'Estado general de la oficina es bueno'
  },
  {
    servidorSaliente: 'Ana López',
    servidorEntrante: 'Carlos Martínez',
    fechaEntregaRecepcion: '2023-12-15',
    inventarioBienes: '20 escritorios, 15 sillas, 3 proyectores',
    documentacionProyectos: 'Proyecto C: en progreso, Proyecto D: pausado',
    cuentasEstadosFinancieros: 'Cuenta C: $8,000, Cuenta D: $12,000',
    actasEntregaRecepcion: 'Acta de entrega-recepción firmada el 15/12/2023',
    pendientesCompromisos: 'Revisar presupuestos del Proyecto C',
    observacionesComentarios: 'Reparaciones necesarias en la sala de reuniones'
  },
];

const categorias = [
  { categoria: 'Faltas Administrativas No Graves', porcentaje: 30, gravedad: 'baja', detalles: ['Ejemplo 1', 'Ejemplo 2'] },
  { categoria: 'Faltas Administrativas Graves', porcentaje: 40, gravedad: 'media', detalles: ['No cumplir con las funciones, atribuciones y comisiones encomendadas', 'No observar disciplina y respeto en sus funciones', 'No atender instrucciones de sus superiores', 'No presentar en tiempo y forma declaraciones de situación patrimonial y de intereses', 'No registrar, custodiar y cuidar la documentación e información a su responsabilidad, ni evitar su sustracción, destrucción o mal uso', 'No supervisar que los servidores públicos bajo su dirección cumplan sus obligaciones', 'No rendir cuentas sobre el ejercicio de sus funciones', 'No colaborar en los procedimientos judiciales y administrativos en que sea parte', 'No verificar en la contratación de adquisiciones, arrendamientos, servicios o enajenación de bienes, la inexistencia de conflictos de interés', 'No denunciar aquellos actos u omisiones que conozca durante el ejercicio de sus funciones', 'Causar daños y perjuicios a la Hacienda Pública o al patrimonio estatal de manera negligente', 'No entregar los informes trimestrales relativos a la Cuenta Pública'] },
  { categoria: 'Delitos por Hechos de Corrupción', porcentaje: 20, gravedad: 'alta', detalles: ['Ejercicio ilícito de servicio público', 'Abuso de autoridad', 'Desaparición Forzada de personas', 'Coalición de servidores públicos', 'Uso ilícito de atribuciones y facultades', 'Uso ilícito de atribuciones y facultades de particulares', 'Intimidación', 'Ejercicio abusivo de funciones', 'Negación del servicio público', 'Tráfico de influencias', 'Cohecho', 'Cohecho activo', 'Peculado', 'Conclusión'] },
  { categoria: 'Actos de Particulares Vinculados', porcentaje: 10, gravedad: 'media', detalles: ['Soborno', 'Participación ilícita en procedimientos administrativos', 'Tráfico de influencias', 'Utilización de información falsa', 'Colusión', 'Uso indebido de recursos públicos', 'Contratación indebida'] },
];
const contrataciones = [
  {
    ocid: 'ocds-123456-0001',
    numeroContrato: 'CN-2023-001',
    nombreContratista: 'Construcciones XYZ',
    entidadContratante: 'Secretaría de Obras Públicas',
    fechaInicio: '2023-03-01',
    fechaFinalizacion: '2024-03-01',
    montoContrato: '5,000,000 MXN',
    objetoContrato: 'Construcción de una escuela primaria',
    modalidadAdjudicacion: 'Licitación Pública',
    estadoContrato: 'En proceso'
  },
  {
    ocid: 'ocds-123456-0002',
    numeroContrato: 'CN-2023-002',
    nombreContratista: 'Servicios ABC',
    entidadContratante: 'Secretaría de Salud',
    fechaInicio: '2023-05-15',
    fechaFinalizacion: '2023-11-15',
    montoContrato: '2,000,000 MXN',
    objetoContrato: 'Suministro de equipo médico',
    modalidadAdjudicacion: 'Adjudicación Directa',
    estadoContrato: 'Completado'
  },
];

const getColorByGravedad = (gravedad) => {
  switch(gravedad) {
    case 'alta':
      return '#ff4c4c'; // Rojo
    case 'media':
      return '#ffbf00'; // Amarillo
    case 'baja':
      return '#4caf50'; // Verde
    default:
      return '#ffffff'; // Blanco por defecto
  }
};
const ControlDashboard = () => {
  const [open, setOpen] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [seleccionado, setSeleccionado] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    estado: '',
    archivo: null,
  });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleFiltroChange = (event) => {
    const categoriaSeleccionada = event.target.value;
    setFiltro(categoriaSeleccionada);
    const categoria = categorias.find(cat => cat.categoria === categoriaSeleccionada);
    setDetalles(categoria ? categoria.detalles : []);
    setSeleccionado(''); // Reiniciar la selección de detalles al cambiar la categoría
  };

  const handleDetalleClick = (detalle) => {
    setSeleccionado(prevSeleccionado => prevSeleccionado === detalle ? '' : detalle); // Alternar la selección
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'archivo') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el formulario
    console.log(formData);
  };

  const categoriasFiltradas = filtro ? categorias.filter(cat => cat.categoria === filtro) : categorias;
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            El Control del Buen Gobierno
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleToggle}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate style={{ marginTop: '2rem' }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Nombre del Ente Público"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            />
            <input
              accept=".json"
              style={{ display: 'none' }}
              id="upload-json"
              type="file"
              name="archivo"
              onChange={handleChange}
            />
            <label htmlFor="upload-json">
              <Button variant="contained" color="primary" component="span" style={{ marginTop: '1rem' }}>
                Subir Archivo JSON
              </Button>
            </label>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              Guardar
            </Button>
          </Box>
        </motion.div>
      )}

      {/* Filtro de Categorías */}
      <FormControl fullWidth variant="outlined" style={{ marginTop: '2rem' }}>
        <InputLabel>Categorías</InputLabel>
        <Select
          value={filtro}
          onChange={handleFiltroChange}
          label="Categorías"
        >
          <MenuItem value=""><em>Todas</em></MenuItem>
          {categorias.map((cat, index) => (
            <MenuItem key={index} value={cat.categoria}>{cat.categoria}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Visualización de Tarjetas */}
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        <Grid item xs={12} sm={filtro ? 6 : 12}>
          <Grid container spacing={3}>
            {categoriasFiltradas.map((categoria, index) => (
              <Grid item xs={12} sm={filtro ? 12 : 6} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card style={{ backgroundColor: getColorByGravedad(categoria.gravedad) }}>
                    <CardContent>
                      <Typography variant="h5" component="div">{categoria.categoria}</Typography>
                      <Typography variant="body2">{`Porcentaje de faltas: ${categoria.porcentaje}%`}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {filtro && filtro !== '' && (
          <Grid item xs={12} sm={6}>
            <Box>
              <List>
                {detalles.map((detalle, index) => (
                  <div key={index}>
                    <ListItem button onClick={() => handleDetalleClick(detalle)}>
                      <ListItemText primary={detalle} />
                    </ListItem>
                    <Collapse in={seleccionado === detalle} timeout="auto" unmountOnExit>
                      <Box marginLeft={3} marginTop={1} marginBottom={1}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Card style={{ backgroundColor: '#e0e0e0' }}>
                          <CardContent>
                            <Typography variant="h5" component="div">Detalle Seleccionado</Typography>
                            <Typography variant="body2">{detalle}</Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Box>
                  </Collapse>
                </div>
              ))}
            </List>
          </Box>
        </Grid>
      )}
    </Grid>
    <Button variant="contained" color="primary" href="/Reporte" style={{ marginTop: '1rem' }}>
                Reportar una Falta
            </Button>

<TableContainer component={Paper} style={{ marginTop: '2rem' }}>
  <Typography variant="h6" gutterBottom>Evolución del Patrimonio</Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Valor de Adquisición</TableCell>
        <TableCell>Valor Actual</TableCell>
        <TableCell>Fecha de Adquisición</TableCell>
        <TableCell>Tipo de Bien</TableCell>
        <TableCell>Ingresos Netos</TableCell>
        <TableCell>Deudas y Obligaciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {bienes.map((bien, index) => (
        <TableRow key={index}>
          <TableCell>{bien.valorAdquisicion}</TableCell>
          <TableCell>{bien.valorActual}</TableCell>
          <TableCell>{bien.fechaAdquisicion}</TableCell>
          <TableCell>{bien.tipoBien}</TableCell>
          <TableCell>{bien.ingresosNetos}</TableCell>
          <TableCell>{bien.deudasObligaciones}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
<TableContainer component={Paper} style={{ marginTop: '2rem' }}>
  <Typography variant="h6" gutterBottom>Participación en Procedimientos de Contratación</Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombre del Servidor Público</TableCell>
        <TableCell>Puesto</TableCell>
        <TableCell>Dependencia o Entidad</TableCell>
        <TableCell>Fecha de Participación</TableCell>
        <TableCell>Tipo de Procedimiento</TableCell>
        <TableCell>Monto de la Contratación</TableCell>
        <TableCell>Duración del Contrato</TableCell>
        <TableCell>Proveedores o Contratistas</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {procedimientos.map((proc, index) => (
        <TableRow key={index}>
          <TableCell>{proc.nombreServidor}</TableCell>
          <TableCell>{proc.puesto}</TableCell>
          <TableCell>{proc.dependencia}</TableCell>
          <TableCell>{proc.fechaParticipacion}</TableCell>
          <TableCell>{proc.tipoProcedimiento}</TableCell>
          <TableCell>{proc.montoContratacion}</TableCell>
          <TableCell>{proc.duracionContrato}</TableCell>
          <TableCell>{proc.proveedor}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
<TableContainer component={Paper} style={{ marginTop: '2rem' }}>
  <Typography variant="h6" gutterBottom>Sancionados</Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombre del Sancionado</TableCell>
        <TableCell>Cargo o Puesto</TableCell>
        <TableCell>Dependencia o Entidad</TableCell>
        <TableCell>Tipo de Sanción</TableCell>
        <TableCell>Motivo de la Sanción</TableCell>
        <TableCell>Fecha de la Sanción</TableCell>
        <TableCell>Duración de la Sanción</TableCell>
        <TableCell>Monto de la Sanción Económica</TableCell>
        <TableCell>Historial de Sanciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {sancionados.map((sancionado, index) => (
        <TableRow key={index}>
          <TableCell>{sancionado.nombre}</TableCell>
          <TableCell>{sancionado.puesto}</TableCell>
          <TableCell>{sancionado.dependencia}</TableCell>
          <TableCell>{sancionado.tipoSancion}</TableCell>
          <TableCell>{sancionado.motivo}</TableCell>
          <TableCell>{sancionado.fechaSancion}</TableCell>
          <TableCell>{sancionado.duracionSancion}</TableCell>
          <TableCell>{sancionado.montoSancion}</TableCell>
          <TableCell>{sancionado.historialSanciones}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
<TableContainer component={Paper} style={{ marginTop: '2rem' }}>
  <Typography variant="h6" gutterBottom>Información de Contrataciones</Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>OCID</TableCell>
        <TableCell>Número de Contrato</TableCell>
        <TableCell>Nombre del Contratista/Proveedor</TableCell>
        <TableCell>Entidad Contratante</TableCell>
        <TableCell>Fecha de Inicio</TableCell>
        <TableCell>Fecha de Finalización</TableCell>
        <TableCell>Monto del Contrato</TableCell>
        <TableCell>Objeto del Contrato</TableCell>
        <TableCell>Modalidad de Adjudicación</TableCell>
        <TableCell>Estado del Contrato</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {contrataciones.map((contrato, index) => (
        <TableRow key={index}>
          <TableCell>{contrato.ocid}</TableCell>
          <TableCell>{contrato.numeroContrato}</TableCell>
          <TableCell>{contrato.nombreContratista}</TableCell>
          <TableCell>{contrato.entidadContratante}</TableCell>
          <TableCell>{contrato.fechaInicio}</TableCell>
          <TableCell>{contrato.fechaFinalizacion}</TableCell>
          <TableCell>{contrato.montoContrato}</TableCell>
          <TableCell>{contrato.objetoContrato}</TableCell>
          <TableCell>{contrato.modalidadAdjudicacion}</TableCell>
          <TableCell>{contrato.estadoContrato}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
<TableContainer component={Paper} style={{ marginTop: '2rem' }}>
  <Typography variant="h6" gutterBottom>Entrega-Recepción</Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombre del Servidor Saliente</TableCell>
        <TableCell>Nombre del Servidor Entrante</TableCell>
        <TableCell>Fecha de Entrega-Recepción</TableCell>
        <TableCell>Inventario de Bienes</TableCell>
        <TableCell>Documentación de Proyectos</TableCell>
        <TableCell>Cuentas y Estados Financieros</TableCell>
        <TableCell>Actas de Entrega-Recepción</TableCell>
        <TableCell>Pendientes y Compromisos</TableCell>
        <TableCell>Observaciones y Comentarios</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {entregasRecepciones.map((entrega, index) => (
        <TableRow key={index}>
          <TableCell>{entrega.servidorSaliente}</TableCell>
          <TableCell>{entrega.servidorEntrante}</TableCell>
          <TableCell>{entrega.fechaEntregaRecepcion}</TableCell>
          <TableCell>{entrega.inventarioBienes}</TableCell>
          <TableCell>{entrega.documentacionProyectos}</TableCell>
          <TableCell>{entrega.cuentasEstadosFinancieros}</TableCell>
          <TableCell>{entrega.actasEntregaRecepcion}</TableCell>
          <TableCell>{entrega.pendientesCompromisos}</TableCell>
          <TableCell>{entrega.observacionesComentarios}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  </Container>
  );
};

export default ControlDashboard;
