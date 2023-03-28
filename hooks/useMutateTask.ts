import { useStore } from '@/store';
import { EditedTask } from '@/types';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = useMutation(
    async (task: Omit<EditedTask, 'id'>) => {
      const { data } = await axios.post<Task>(
        `${process.env.NEXT_PUBLIC_API_URL}/todo`,
        task
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks']);
        if (previousTodos) {
          queryClient.setQueryData(['tasks'], [data, ...previousTodos]);
        }
        reset();
      },
      onError: (err: any) => {
        reset();
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/');
        }
      },
    }
  );

  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`,
        task
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks']);
        if (previousTodos) {
          queryClient.setQueryData(
            ['tasks'],
            previousTodos.map((task) => (task.id === data.id ? data : task))
          );
        }
        reset();
      },
      onError: (err: any) => {
        reset();
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/');
        }
      },
    }
  );
  const deleteTaskMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`);
    },
    {
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks']);
        if (previousTodos) {
          queryClient.setQueryData(
            ['tasks'],
            previousTodos.filter((task) => task.id !== variables)
          );
        }
        reset();
      },
      onError: (err: any) => {
        reset();
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/');
        }
      },
    }
  );
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
