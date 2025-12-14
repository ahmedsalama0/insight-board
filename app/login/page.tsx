'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/app/schemas/loginSchema';
import { login } from '../services/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const result = await login(data.email, data.password);
      localStorage.setItem('token', result.token);
      router.push('/dashboard');
      setLoading(false);
    } catch (err) {
      alert('Your credentials is unrecognized - Signup instead!');
      reset();
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={12}
      p={4}
      boxShadow={3}
      borderRadius={2}
      bgcolor={'#fff'}
    >
      <Typography variant="h5" mb={3} textAlign="center" color="#333">
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Box>
  );
}
