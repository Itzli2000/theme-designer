import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useState, type MouseEvent } from "react";
import type { Theme } from "../../../store/types";
import { StatusChip, type ThemeStatus } from "../StatusChip";

interface ThemeCardProps {
  theme: Theme;
  onView?: (theme: Theme) => void;
  onEdit?: (theme: Theme) => void;
  onDelete?: (theme: Theme) => void;
  onDuplicate?: (theme: Theme) => void;
  onExport?: (theme: Theme) => void;
  showActions?: boolean;
  elevation?: number;
}

export const ThemeCard = ({
  theme,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onExport,
  showActions = true,
  elevation = 2,
}: ThemeCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: () => void) => {
    handleMenuClose();
    action();
  };

  const getStatus = (): ThemeStatus => {
    // Map your theme status to the standard status
    // This is a placeholder implementation
    return "active"; // You should implement proper status mapping
  };

  const primaryColor = theme.themeConfig?.palette?.primary?.main;
  const secondaryColor = theme.themeConfig?.palette?.secondary?.main;

  return (
    <Card
      elevation={elevation}
      sx={{
        cursor: onView ? "pointer" : "default",
        transition: "all 0.2s",
        "&:hover": onView
          ? {
              elevation: elevation + 2,
              transform: "translateY(-2px)",
            }
          : {},
      }}
      onClick={() => onView?.(theme)}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h3" noWrap>
            {theme.name}
          </Typography>
          {showActions && (
            <IconButton size="small" onClick={handleMenuClick} sx={{ ml: 1 }}>
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

        {theme.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {theme.description}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <StatusChip status={getStatus()} />
          <Typography variant="caption" color="text.secondary">
            {theme.createdBy.firstName} {theme.createdBy.lastName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="caption" color="text.secondary">
            Colors:
          </Typography>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: primaryColor,
              border: "2px solid",
              borderColor: "divider",
            }}
          />
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: secondaryColor,
              border: "2px solid",
              borderColor: "divider",
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {theme.themeConfig?.palette?.mode}
          </Typography>
        </Box>
      </CardContent>

      {showActions && (
        <CardActions sx={{ pt: 0 }}>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(theme);
            }}
          >
            View
          </Button>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(theme);
            }}
          >
            Edit
          </Button>
        </CardActions>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={() => handleAction(() => onView?.(theme))}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction(() => onEdit?.(theme))}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction(() => onDuplicate?.(theme))}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction(() => onExport?.(theme))}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAction(() => onDelete?.(theme))}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};
