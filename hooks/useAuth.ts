import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { AuthForm } from '@/types';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No email provided'),
  password: Yup.string()
    .required('No password provided')
    .min(5, 'Password should be min 5 chars'),
});

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [error, setError] = useState('');
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const signIn = async ({ email, password }: AuthForm) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });
      form.reset();
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };
  const signUp = async ({ email, password }: AuthForm) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        password,
      });
      await signIn({ email, password });
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };
  const signOut = async () => {
    try {
      queryClient.removeQueries(['tasks']);
      queryClient.removeQueries(['user']);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.push('/');
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };
  return { signUp, signIn, signOut, setError, error, form };
};
