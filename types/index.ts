type AuthForm = {
  email: string;
  password: string;
};

type EditedTask = {
  id: number;
  title: string;
  description?: string | null;
};

export type { AuthForm, EditedTask };
