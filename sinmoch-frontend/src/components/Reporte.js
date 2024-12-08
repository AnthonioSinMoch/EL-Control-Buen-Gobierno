import React, { useState } from 'react';
import { Container, TextField, Button, Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

const Reporte = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    descripcionFisica: '',
    nombreDependencia: '',
    narracionHechos: '',
    fechaHechos: '',
    horaHechos: '',
    ciudad: '',
    tipoFalta: '',
    elementosProbatorios: '',
    correoDenunciante: '',
    telefono: '',
    esAnonima: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el formulario
    console.log(formData);
  };
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>Reporte de Denuncia</Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Nombre(s)"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Primer Apellido"
          name="primerApellido"
          value={formData.primerApellido}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Segundo Apellido"
          name="segundoApellido"
          value={formData.segundoApellido}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Descripción Física"
          name="descripcionFisica"
          value={formData.descripcionFisica}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Nombre de la Dependencia o Entidad"
          name="nombreDependencia"
          value={formData.nombreDependencia}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Narración de los Hechos Denunciados"
          name="narracionHechos"
          multiline
          rows={4}
          value={formData.narracionHechos}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Fecha en que Ocurrieron los Hechos"
          name="fechaHechos"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.fechaHechos}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Hora"
          name="horaHechos"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formData.horaHechos}
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
          label="Tipo de Falta Administrativa"
          name="tipoFalta"
          value={formData.tipoFalta}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Elementos Probatorios"
          name="elementosProbatorios"
          value={formData.elementosProbatorios}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Correo Electrónico del Denunciante"
          name="correoDenunciante"
          value={formData.correoDenunciante}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox checked={formData.esAnonima} onChange={handleChange} name="esAnonima" />}
          label="Denuncia Anónima"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default Reporte;
