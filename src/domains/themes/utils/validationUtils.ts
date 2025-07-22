import { z } from 'zod';

export const themeBasicInfoSchema = z.object({
  name: z
    .string()
    .min(3, 'Theme name must be at least 3 characters')
    .max(50, 'Theme name must be less than 50 characters')
    .trim(),
  description: z
    .string()
    .max(200, 'Description must be less than 200 characters')
    .optional(),
});

export const colorSchema = z
  .string()
  .regex(/^#([0-9A-F]{3}){1,2}$/i, 'Invalid hex color format');

export const typographySchema = z.object({
  fontFamily: z.string().min(1, 'Font family is required'),
  fontSize: z.number().min(8).max(72),
  fontWeight: z.number().optional(),
  lineHeight: z.number().optional(),
});

export const themeConfigSchema = z.object({
  palette: z.object({
    mode: z.enum(['light', 'dark']),
    primary: z.object({
      main: colorSchema,
    }),
    secondary: z.object({
      main: colorSchema,
    }),
  }),
  typography: typographySchema,
});

export const createThemeSchema = z.object({
  name: themeBasicInfoSchema.shape.name,
  description: themeBasicInfoSchema.shape.description,
  themeConfig: themeConfigSchema,
  googleFonts: z.array(z.string()).optional().default([]),
});

export type ThemeFormData = z.infer<typeof createThemeSchema>;
export type ThemeBasicInfo = z.infer<typeof themeBasicInfoSchema>;
export type TypographyConfig = z.infer<typeof typographySchema>;

export const validateStep = (step: number, data: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  
  try {
    switch (step) {
      case 0: // Basic Info
        themeBasicInfoSchema.parse(data);
        break;
      case 1: // Colors
        if (!data.themeConfig?.palette?.primary?.main) {
          errors.push('Primary color is required');
        }
        if (!data.themeConfig?.palette?.secondary?.main) {
          errors.push('Secondary color is required');
        }
        break;
      case 2: // Typography
        if (data.themeConfig?.typography) {
          typographySchema.parse(data.themeConfig.typography);
        }
        break;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(...error.errors.map(err => err.message));
    }
  }
  
  return errors;
};