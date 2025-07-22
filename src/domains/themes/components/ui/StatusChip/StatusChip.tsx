import { Chip, type ChipProps } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Error as ErrorIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

export type ThemeStatus = 'active' | 'draft' | 'archived' | 'published' | 'private';

interface StatusChipProps extends Omit<ChipProps, 'color' | 'icon'> {
  status: ThemeStatus;
  showIcon?: boolean;
}

const statusConfig: Record<ThemeStatus, {
  label: string;
  color: ChipProps['color'];
  icon: React.ComponentType;
}> = {
  active: {
    label: 'Active',
    color: 'success',
    icon: CheckCircleIcon,
  },
  draft: {
    label: 'Draft',
    color: 'default',
    icon: ScheduleIcon,
  },
  archived: {
    label: 'Archived',
    color: 'error',
    icon: ErrorIcon,
  },
  published: {
    label: 'Published',
    color: 'primary',
    icon: VisibilityIcon,
  },
  private: {
    label: 'Private',
    color: 'secondary',
    icon: VisibilityOffIcon,
  },
};

const StatusChip = ({
  status,
  showIcon = true,
  size = 'small',
  variant = 'filled',
  ...chipProps
}: StatusChipProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant={variant}
      icon={showIcon ? <Icon /> : undefined}
      {...chipProps}
    />
  );
};

export default StatusChip;