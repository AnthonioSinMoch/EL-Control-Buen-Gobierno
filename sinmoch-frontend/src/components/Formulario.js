import React, { useState } from 'react';
import { Container, TextField, Button, Alert, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
const Formulario = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === 'usuario' && password === 'contraseña') {
            setError('');
            //alert('Inicio de sesión exitoso');
            navigate('/autoridad');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                SinMoch
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Entrar
                </Button>
            </form>
            <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '1rem' }}>
                <Link href="/ciudadano">Entrar como ciudadano</Link>
            </Typography>
        </Container>
    );
};

export default Formulario;
