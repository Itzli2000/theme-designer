import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import type { ReactNode } from 'react';
import { useStepperNavigation } from '../../../hooks';

export interface StepConfig {
  label: string;
  icon?: React.ComponentType;
  optional?: boolean;
}

interface StepperWizardProps {
  steps: StepConfig[];
  children: ReactNode[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  onCancel?: () => void;
  validateStep?: (step: number) => boolean;
  isLoading?: boolean;
  showLinearProgress?: boolean;
  allowNonLinear?: boolean;
}

export const StepperWizard = ({
  steps,
  children,
  initialStep = 0,
  onStepChange,
  onComplete,
  onCancel,
  validateStep,
  isLoading = false,
  showLinearProgress = false,
  allowNonLinear = false,
}: StepperWizardProps) => {
  const stepperNav = useStepperNavigation({
    totalSteps: steps.length,
    initialStep,
    onStepChange,
    validateStep,
  });

  const {
    activeStep,
    isLastStep,
    canGoNext,
    canGoPrev,
    nextStep,
    prevStep,
    jumpToStep,
    hasStepErrors,
    getStepErrors,
  } = stepperNav;

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      nextStep();
    }
  };

  const handleStepClick = (step: number) => {
    if (allowNonLinear) {
      jumpToStep(step);
    }
  };

  const currentStepErrors = getStepErrors(activeStep);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Stepper Header */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              completed={stepperNav.isStepCompleted(index)}
            >
              <StepLabel
                error={hasStepErrors(index)}
                onClick={() => handleStepClick(index)}
                sx={{
                  cursor: allowNonLinear ? 'pointer' : 'default',
                  '& .MuiStepLabel-label': {
                    fontWeight: index === activeStep ? 600 : 400,
                  },
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {showLinearProgress && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(activeStep / (steps.length - 1)) * 100}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Step {activeStep + 1} of {steps.length}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Step Content */}
      <Box sx={{ mb: 3 }}>
        {currentStepErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Please fix the following errors:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
              {currentStepErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

        <Box sx={{ minHeight: 400 }}>
          {children[activeStep] || (
            <Typography color="error">
              Step content not found for step {activeStep + 1}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Paper elevation={1} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onCancel && (
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={prevStep}
              disabled={!canGoPrev || isLoading}
            >
              Back
            </Button>

            <Button
              variant="contained"
              endIcon={!isLastStep ? <ArrowForwardIcon /> : undefined}
              onClick={handleNext}
              disabled={!canGoNext || isLoading}
            >
              {isLoading ? 'Processing...' : isLastStep ? 'Complete' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};