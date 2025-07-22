import { useState, useCallback } from 'react';
import type { Theme } from '../store/types';
import { 
  createEmptyTheme, 
  validateThemeName, 
  validateThemeDescription,
  hasThemeChanges,
  mergeThemeConfig
} from '../utils/themeUtils';
import { validateStep } from '../utils/validationUtils';
import type { MuiThemeConfig } from '../types/theme.types';

interface UseThemeFormOptions {
  initialTheme?: Theme | null;
}

export const useThemeForm = (options: UseThemeFormOptions = {}) => {
  const { initialTheme } = options;
  
  const [formData, setFormData] = useState<Partial<Theme>>(() => 
    initialTheme ? { ...initialTheme } : createEmptyTheme()
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const updateField = useCallback((field: keyof Theme, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set([...prev, field]));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const updateThemeConfig = useCallback((updates: Record<string, unknown>) => {
    setFormData(prev => ({
      ...prev,
      themeConfig: mergeThemeConfig(prev.themeConfig as MuiThemeConfig, updates as Partial<MuiThemeConfig>)
    }));
  }, []);

  const validateField = useCallback((field: keyof Theme, value: unknown) => {
    let error: string | null = null;

    switch (field) {
      case 'name':
        error = validateThemeName(value);
        break;
      case 'description':
        error = validateThemeDescription(value);
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
      return true;
    }
  }, []);

  const validateFormStep = useCallback((step: number) => {
    const stepErrors = validateStep(step, formData);
    return stepErrors.length === 0;
  }, [formData]);

  const validateAll = useCallback(() => {
    const allErrors: Record<string, string> = {};
    
    // Validate name
    const nameError = validateThemeName(formData.name || '');
    if (nameError) allErrors.name = nameError;
    
    // Validate description
    const descError = validateThemeDescription(formData.description || '');
    if (descError) allErrors.description = descError;

    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialTheme ? { ...initialTheme } : createEmptyTheme());
    setErrors({});
    setTouchedFields(new Set());
  }, [initialTheme]);

  const hasChanges = useCallback(() => {
    return hasThemeChanges(initialTheme, formData);
  }, [initialTheme, formData]);

  return {
    formData,
    errors,
    touchedFields,
    updateField,
    updateThemeConfig,
    validateField,
    validateFormStep,
    validateAll,
    resetForm,
    hasChanges,
    isValid: Object.keys(errors).length === 0,
  };
};