import { FC, FormEvent } from 'react';
import { Button, Center, TextInput } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { useStore } from '@/store';
import { useMutateTask } from '@/hooks/useMutateTask';

export const TaskForm: FC = () => {
  const editedTask = useStore((state) => state.editedTask);
  const update = useStore((state) => state.updateEditedTask);
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, title, description } = editedTask;
    if (id === 0) {
      createTaskMutation.mutate({
        title,
        description,
      });
    } else {
      updateTaskMutation.mutate({
        id,
        title,
        description,
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="title"
          value={editedTask.title}
          onChange={(e) => update({ ...editedTask, title: e.target.value })}
        />
        <TextInput
          mt="md"
          placeholder="description"
          value={editedTask.description || ''}
          onChange={(e) =>
            update({ ...editedTask, description: e.target.value })
          }
        />
        <Center mt="lg">
          <Button
            disabled={editedTask.title === ''}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {editedTask.id === 0 ? 'Create' : 'Update'}
          </Button>
        </Center>
      </form>
    </>
  );
};
