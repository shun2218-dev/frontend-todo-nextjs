'use client';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { UserInfo } from '@/components/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import { IconLogout } from '@tabler/icons-react';
import type { NextPage } from 'next';

export const meatadata = {
  title: 'Task Board',
  description: 'Task Board page after login',
};

const DashboardPage: NextPage = () => {
  const { signOut } = useAuth();
  return (
    <>
      <IconLogout
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <UserInfo />
      <TaskForm />
      <TaskList />
    </>
  );
};

export default DashboardPage;
