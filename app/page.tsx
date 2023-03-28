'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import {
  IconDatabase,
  IconShield,
  IconExclamationCircle,
} from '@tabler/icons-react';
import {
  Alert,
  Anchor,
  Button,
  Center,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';

const Home: NextPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { signIn, signUp, setError, error, form } = useAuth();
  const handleSubmit = async () => {
    const authForm = {
      email: form.values.email,
      password: form.values.password,
    };
    if (isRegister) {
      await signUp(authForm);
    } else {
      await signIn(authForm);
    }
  };
  return (
    <div>
      <Center>
        <IconShield color="blue" size={48} />
      </Center>
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<IconExclamationCircle />}
          title="Authorization Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt="md"
          id="email"
          label="Email"
          placeholder="example@gmail.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          id="Password"
          label="Password"
          placeholder="password"
          description="Must be min 5 chars"
          {...form.getInputProps('password')}
        />
        <Group mt="xl" position="apart">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister((prev) => !prev);
              setError('');
            }}
          >
            {isRegister
              ? 'Do you have an account? Login'
              : "You don't have an account? Register"}
          </Anchor>
          <Button
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Home;
