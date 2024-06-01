export type FormState = {
  success: boolean | null;
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};
