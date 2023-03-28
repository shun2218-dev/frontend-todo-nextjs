import { useMutateTask } from '@/hooks/useMutateTask';
import { useStore } from '@/store';
import { List } from '@mantine/core';
import { Task } from '@prisma/client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { FC } from 'react';

export const TaskItem: FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
  id,
  title,
  description,
}) => {
  const update = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();
  return (
    <List.Item>
      <div className="float-left mr-10">
        <IconPencil
          className="mx-1 h-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({ id, title, description });
          }}
        />
        <IconTrash
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteTaskMutation.mutate(id);
          }}
        />
      </div>
      <span>{title}</span>
    </List.Item>
  );
};
