import { useState, useCallback } from 'react';

interface UseStepperNavigationOptions {
  totalSteps: number;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  validateStep?: (step: number) => boolean;
}

export const useStepperNavigation = (options: UseStepperNavigationOptions) => {
  const { 
    totalSteps, 
    initialStep = 0, 
    onStepChange,
    validateStep 
  } = options;
  
  const [activeStep, setActiveStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<number, string[]>>({});

  const goToStep = useCallback((step: number) => {
    if (step < 0 || step >= totalSteps) return;
    
    setActiveStep(step);
    onStepChange?.(step);
  }, [totalSteps, onStepChange]);

  const nextStep = useCallback(() => {
    if (activeStep >= totalSteps - 1) return false;

    // Validate current step if validator provided
    if (validateStep && !validateStep(activeStep)) {
      return false;
    }

    // Mark current step as completed
    setCompletedSteps(prev => new Set([...prev, activeStep]));
    setErrors(prev => ({ ...prev, [activeStep]: [] }));
    
    const nextStepIndex = activeStep + 1;
    setActiveStep(nextStepIndex);
    onStepChange?.(nextStepIndex);
    
    return true;
  }, [activeStep, totalSteps, validateStep, onStepChange]);

  const prevStep = useCallback(() => {
    if (activeStep <= 0) return false;
    
    const prevStepIndex = activeStep - 1;
    setActiveStep(prevStepIndex);
    onStepChange?.(prevStepIndex);
    
    return true;
  }, [activeStep, onStepChange]);

  const jumpToStep = useCallback((step: number) => {
    // Allow jumping to any completed step or the next step
    const canJump = completedSteps.has(step) || step === activeStep + 1 || step <= activeStep;
    
    if (canJump && step >= 0 && step < totalSteps) {
      goToStep(step);
      return true;
    }
    
    return false;
  }, [activeStep, completedSteps, totalSteps, goToStep]);

  const markStepAsCompleted = useCallback((step: number) => {
    setCompletedSteps(prev => new Set([...prev, step]));
    setErrors(prev => ({ ...prev, [step]: [] }));
  }, []);

  const markStepAsIncomplete = useCallback((step: number) => {
    setCompletedSteps(prev => {
      const newCompleted = new Set(prev);
      newCompleted.delete(step);
      return newCompleted;
    });
  }, []);

  const setStepErrors = useCallback((step: number, stepErrors: string[]) => {
    setErrors(prev => ({ ...prev, [step]: stepErrors }));
  }, []);

  const reset = useCallback(() => {
    setActiveStep(initialStep);
    setCompletedSteps(new Set());
    setErrors({});
  }, [initialStep]);

  const isStepCompleted = useCallback((step: number) => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const isStepOptional = useCallback(() => {
    // Override this based on your business logic
    return false;
  }, []);

  const hasStepErrors = useCallback((step: number) => {
    return (errors[step] || []).length > 0;
  }, [errors]);

  const getStepErrors = useCallback((step: number) => {
    return errors[step] || [];
  }, [errors]);

  return {
    activeStep,
    completedSteps: Array.from(completedSteps),
    errors,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === totalSteps - 1,
    canGoNext: activeStep < totalSteps - 1,
    canGoPrev: activeStep > 0,
    nextStep,
    prevStep,
    goToStep,
    jumpToStep,
    markStepAsCompleted,
    markStepAsIncomplete,
    setStepErrors,
    reset,
    isStepCompleted,
    isStepOptional,
    hasStepErrors,
    getStepErrors,
  };
};