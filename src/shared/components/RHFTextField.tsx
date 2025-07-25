import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { TextField, type TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
} & Partial<TextFieldProps>;

export function RHFTextField<T extends FieldValues>({
  name,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
