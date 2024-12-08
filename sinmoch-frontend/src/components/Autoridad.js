import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, TextField, Button, Box, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText, Collapse } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { motion } from 'framer-motion';

const categorias = [
  { categoria: 'Faltas Administrativas No Graves', porcentaje: 30, gravedad: 'baja', detalles: ['Ejemplo 1', 'Ejemplo 2'] },
  { categoria: 'Faltas Administrativas Graves', porcentaje: 40, gravedad: 'media', detalles: ['No cumplir con las funciones, atribuciones y comisiones encomendadas', 'No observar disciplina y respeto en sus funciones', 'No atender instrucciones de sus superiores', 'No presentar en tiempo y forma declaraciones de situación patrimonial y de intereses', 'No registrar, custodiar y cuidar la documentación e información a su responsabilidad, ni evitar su sustracción, destrucción o mal uso', 'No supervisar que los servidores públicos bajo su dirección cumplan sus obligaciones', 'No rendir cuentas sobre el ejercicio de sus funciones', 'No colaborar en los procedimientos judiciales y administrativos en que sea parte', 'No verificar en la contratación de adquisiciones, arrendamientos, servicios o enajenación de bienes, la inexistencia de conflictos de interés', 'No denunciar aquellos actos u omisiones que conozca durante el ejercicio de sus funciones', 'Causar daños y perjuicios a la Hacienda Pública o al patrimonio estatal de manera negligente', 'No entregar los informes trimestrales relativos a la Cuenta Pública'] },
  { categoria: 'Delitos por Hechos de Corrupción', porcentaje: 20, gravedad: 'alta', detalles: ['Ejercicio ilícito de servicio público', 'Abuso de autoridad', 'Desaparición Forzada de personas', 'Coalición de servidores públicos', 'Uso ilícito de atribuciones y facultades', 'Uso ilícito de atribuciones y facultades de particulares', 'Intimidación', 'Ejercicio abusivo de funciones', 'Negación del servicio público', 'Tráfico de influencias', 'Cohecho', 'Cohecho activo', 'Peculado', 'Conclusión'] },
  { categoria: 'Actos de Particulares Vinculados', porcentaje: 10, gravedad: 'media', detalles: ['Soborno', 'Participación ilícita en procedimientos administrativos', 'Tráfico de influencias', 'Utilización de información falsa', 'Colusión', 'Uso indebido de recursos públicos', 'Contratación indebida'] },
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
  </Container>
  );
};

export default ControlDashboard;
