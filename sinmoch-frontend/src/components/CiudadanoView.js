import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';

const Faltas = [
    { nombre: 'Cohecho', descripcion: 'Acto de sobornar a un funcionario público...', entidad: 'Secretaría de Hacienda', monto: 5000, estado: 'CDMX', estatus: 'Abierto', fecha: '2024-11-01', involucrado: 'Juan Pérez' },
    { nombre: 'Desvío de recursos públicos', descripcion: 'Uso indebido de recursos asignados...', entidad: 'Secretaría de Salud', monto: 10000, estado: 'Jalisco', estatus: 'En Investigación', fecha: '2024-10-15', involucrado: 'María López' },
];

const Entidades = [
    { nombre: 'Empresa A', descripcion: 'Descripción de Empresa A...' },
    { nombre: 'Empresa B', descripcion: 'Descripción de Empresa B...' },
];

const CiudadanoView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterEntidad, setFilterEntidad] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterEstatus, setFilterEstatus] = useState('');
    const [searchEntidadTerm, setSearchEntidadTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleFilterEntidadChange = (event) => {
        setFilterEntidad(event.target.value);
    };

    const handleFilterEstadoChange = (event) => {
        setFilterEstado(event.target.value);
    };

    const handleFilterEstatusChange = (event) => {
        setFilterEstatus(event.target.value);
    };

    const handleSearchEntidadChange = (event) => {
        setSearchEntidadTerm(event.target.value);
    };

    const filteredFaltas = Faltas.filter(falta => {
        return (
            falta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType ? falta.nombre === filterType : true) &&
            (filterEntidad ? falta.entidad === filterEntidad : true) &&
            (filterEstado ? falta.estado === filterEstado : true) &&
            (filterEstatus ? falta.estatus === filterEstatus : true)
        );
    });

    const filteredEntidades = Entidades.filter(entidad =>
        entidad.nombre.toLowerCase().includes(searchEntidadTerm.toLowerCase())
    );

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Filtrado y Búsqueda Avanzada
            </Typography>
            <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Buscar Falta"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Tipo de Falta</InputLabel>
                        <Select
                            value={filterType}
                            onChange={handleFilterTypeChange}
                            label="Tipo de Falta"
                        >
                            <MenuItem value=""><em>Ninguno</em></MenuItem>
                            <MenuItem value="Cohecho">Cohecho</MenuItem>
                            <MenuItem value="Desvío de recursos públicos">Desvío de recursos públicos</MenuItem>
                            {/* Añadir más tipos de faltas aquí */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Entidad</InputLabel>
                        <Select
                            value={filterEntidad}
                            onChange={handleFilterEntidadChange}
                            label="Entidad"
                        >
                            <MenuItem value=""><em>Ninguna</em></MenuItem>
                            <MenuItem value="Secretaría de Hacienda">Secretaría de Hacienda</MenuItem>
                            <MenuItem value="Secretaría de Salud">Secretaría de Salud</MenuItem>
                            {/* Añadir más entidades aquí */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={filterEstado}
                            onChange={handleFilterEstadoChange}
                            label="Estado"
                        >
                            <MenuItem value=""><em>Ninguno</em></MenuItem>
                            <MenuItem value="CDMX">CDMX</MenuItem>
                            <MenuItem value="Jalisco">Jalisco</MenuItem>
                            {/* Añadir más estados aquí */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Estatus</InputLabel>
                        <Select
                            value={filterEstatus}
                            onChange={handleFilterEstatusChange}
                            label="Estatus"
                        >
                            <MenuItem value=""><em>Ninguno</em></MenuItem>
                            <MenuItem value="Abierto">Abierto</MenuItem>
                            <MenuItem value="En Investigación">En Investigación</MenuItem>
                            {/* Añadir más estatus aquí */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom>
                Buscar Empresas o Entidades
            </Typography>
            <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
                <Grid item xs={12}>
                    <TextField
                        label="Buscar Empresa o Entidad"
                        variant="outlined"
                        fullWidth
                        value={searchEntidadTerm}
                        onChange={handleSearchEntidadChange}
                    />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Resultados de Entidades
            </Typography>
            <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
                {filteredEntidades.map((entidad, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {entidad.nombre}
                                </Typography>
                                <Typography variant="body2">
                                    {entidad.descripcion}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h4" gutterBottom>
                Posibles Faltas Administrativas y de Corrupción
            </Typography>
            <Grid container spacing={3}>
                {filteredFaltas.map((falta, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {falta.nombre}
                                    </Typography>
                                    <Typography variant="body2">
                                        {falta.descripcion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" href="/reportar-falta" style={{ marginTop: '1rem' }}>
                Reportar una Falta
            </Button>
        </Container>
    );
};

export default CiudadanoView;
