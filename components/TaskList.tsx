import { useQueryyTasks } from '@/hooks/useQueryyTasks';
import { List, Loader, ThemeIcon } from '@mantine/core';
import { FC } from 'react';
import { TaskItem } from './TaskItem';
import { IconCircleDashed } from '@tabler/icons-react';

export const TaskList: FC = () => {
  const { data: tasks, status } = useQueryyTasks();
  if (status === 'loading') return <Loader />;
  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed />
        </ThemeIcon>
      }
    >
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </List>
  );
};
