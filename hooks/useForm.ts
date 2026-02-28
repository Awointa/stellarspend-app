import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';
import { ZodSchema } from 'zod';

/**
 * Configuration options for the useForm hook.
 * Extends the default React Hook Form options while making the schema required.
 */
interface UseFormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<UseHookFormProps<TFieldValues>, 'resolver'> {
  schema: ZodSchema<any>;
}

/**
 * A reusable wrapper around react-hook-form and zod for consistent form handling.
 * 
 * @param props - Form configuration including the Zod validation schema.
 * @returns An object containing form state, handlers, and errors.
 * 
 * @example
 * ```tsx
 * const schema = zod.object({ name: zod.string().min(1) });
 * const { register, handleSubmit, errors } = useForm({ schema });
 * ```
 */
export function useForm<TFieldValues extends FieldValues = FieldValues>({
  schema,
  ...options
}: UseFormProps<TFieldValues>) {
  return useHookForm<TFieldValues>({
    ...options,
    // @ts-ignore - Zod v4 type compatibility issue with resolver
    resolver: zodResolver(schema),
  });
}

export type { UseFormReturn, FieldValues };
