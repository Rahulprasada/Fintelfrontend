import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Define types for error response
interface ErrorResponse {
  error?: string;
}

const ConfirmEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(searchParams.get('token') || '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log('URL token:', searchParams.get('token')); // Debug
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Sending token:', token); // Debug
    try {
      const response = await axios.post<{ message: string }>('https://web-production-5afd2.up.railway.app/api/confirm-email/', { token });
      console.log('Response:', response.data);
      navigate('/');
    } catch (error: any) {
      console.error('Email confirmation error:', error);
      console.log('Error response:', error.response?.data); // Debug
      setError((error.response?.data as ErrorResponse)?.error || 'An error occurred');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Confirm Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Confirmation Token"
          value={token}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Confirm
        </Button>
      </form>
    </Box>
  );
};

export default ConfirmEmail;