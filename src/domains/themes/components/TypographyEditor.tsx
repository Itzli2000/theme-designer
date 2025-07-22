import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Slider,
  Button,
  Chip,
  type SelectChangeEvent,
  Alert,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { FontPicker } from './FontPicker';
import { fontsService } from '../services/fonts.service';
import type { MuiThemeConfig } from '../types/theme.types';

interface TypographyVariant {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
}

interface TypographyEditorProps {
  typography?: MuiThemeConfig['typography'];
  onChange: (typography: MuiThemeConfig['typography']) => void;
  googleFonts?: string[];
  onGoogleFontsChange?: (fonts: string[]) => void;
}

const typographyVariants = [
  { key: 'h1', label: 'Heading 1', sample: 'The quick brown fox' },
  { key: 'h2', label: 'Heading 2', sample: 'The quick brown fox jumps' },
  { key: 'h3', label: 'Heading 3', sample: 'The quick brown fox jumps over' },
  { key: 'h4', label: 'Heading 4', sample: 'The quick brown fox jumps over the lazy dog' },
  { key: 'h5', label: 'Heading 5', sample: 'The quick brown fox jumps over the lazy dog' },
  { key: 'h6', label: 'Heading 6', sample: 'The quick brown fox jumps over the lazy dog' },
  { key: 'subtitle1', label: 'Subtitle 1', sample: 'Subtitle text with more content to show the styling' },
  { key: 'subtitle2', label: 'Subtitle 2', sample: 'Secondary subtitle text for hierarchy' },
  { key: 'body1', label: 'Body 1', sample: 'Body text is used for longer passages of text in your design. It should be easy to read and comfortable for extended reading sessions.' },
  { key: 'body2', label: 'Body 2', sample: 'Secondary body text used for supporting content, captions, and supplementary information.' },
  { key: 'button', label: 'Button', sample: 'BUTTON TEXT' },
  { key: 'caption', label: 'Caption', sample: 'Caption text for images, tables, and other secondary content that needs to be smaller and less prominent.' },
  { key: 'overline', label: 'Overline', sample: 'OVERLINE TEXT FOR EMPHASIS' },
];

const fontWeights = [
  { value: 100, label: 'Thin (100)' },
  { value: 200, label: 'Extra Light (200)' },
  { value: 300, label: 'Light (300)' },
  { value: 400, label: 'Regular (400)' },
  { value: 500, label: 'Medium (500)' },
  { value: 600, label: 'Semi Bold (600)' },
  { value: 700, label: 'Bold (700)' },
  { value: 800, label: 'Extra Bold (800)' },
  { value: 900, label: 'Black (900)' },
];


export const TypographyEditor: React.FC<TypographyEditorProps> = ({
  typography = {},
  onChange,
  googleFonts = [],
  onGoogleFontsChange,
}) => {
  // Safe merge function for typography objects
  const mergeTypography = (base: unknown, updates: object) => {
    const baseObj = (base && typeof base === 'object') ? base : {};
    return { ...baseObj, ...updates };
  };
  const [expandedPanels, setExpandedPanels] = useState<string[]>(['general']);
  const [showFontPicker, setShowFontPicker] = useState<string | null>(null);
  const [loadingFonts, setLoadingFonts] = useState(false);

  const handlePanelChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedPanels(prev =>
      isExpanded
        ? [...prev, panel]
        : prev.filter(p => p !== panel)
    );
  };

  const handleGeneralTypographyChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    onChange(mergeTypography(typography, {
      [field]: field === 'fontSize' ? Number(value) : value,
    }));
  };

  const handleVariantChange = (variant: string, field: keyof TypographyVariant) => (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const value = event.target.value;
    const numericFields = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'];
    
    onChange(mergeTypography(typography, {
      [variant]: mergeTypography(typography[variant] || {}, {
        [field]: numericFields.includes(field) && value !== '' ? Number(value) : value,
      }),
    }));
  };

  const handleVariantTextFieldChange = (variant: string, field: keyof TypographyVariant) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const numericFields = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'];
    
    onChange(mergeTypography(typography, {
      [variant]: mergeTypography(typography[variant] || {}, {
        [field]: numericFields.includes(field) && value !== '' ? Number(value) : value,
      }),
    }));
  };

  const handleSliderChange = (variant: string, field: keyof TypographyVariant) => (
    _event: Event,
    value: number | number[]
  ) => {
    onChange(mergeTypography(typography, {
      [variant]: mergeTypography(typography[variant] || {}, {
        [field]: value as number,
      }),
    }));
  };

  const handleFontSelect = async (variant: string, fontFamily: string) => {
    if (!fontFamily) return;

    try {
      setLoadingFonts(true);
      await fontsService.loadFont(fontFamily, ['400', '700']);
      
      onChange(mergeTypography(typography, {
        [variant]: mergeTypography(typography[variant] || {}, {
          fontFamily: `"${fontFamily}", ${getDefaultFallback(fontFamily)}`,
        }),
      }));

      const updatedGoogleFonts = googleFonts.includes(fontFamily) 
        ? googleFonts 
        : [...googleFonts, fontFamily];
      
      onGoogleFontsChange?.(updatedGoogleFonts);
      setShowFontPicker(null);
    } catch (error) {
      console.error('Error loading font:', error);
    } finally {
      setLoadingFonts(false);
    }
  };

  const getDefaultFallback = (fontFamily: string): string => {
    const categories = ['sans-serif', 'serif', 'monospace'];
    return categories.find(cat => fontFamily.toLowerCase().includes(cat.replace('-', ''))) || 'sans-serif';
  };

  const resetVariantToDefault = (variant: string) => {
    const newTypography = { ...typography };
    delete newTypography[variant];
    onChange(newTypography);
  };

  const getCurrentFontFamily = (variant: TypographyVariant | undefined): string => {
    if (!variant?.fontFamily) return '';
    const match = variant.fontFamily.match(/^"([^"]*)"/) || variant.fontFamily.match(/^([^,]*)/);
    return match ? match[1].trim() : '';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Typography Configuration
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Configure your theme's typography. Changes will be applied in real-time to the preview.
      </Alert>

      {/* General Typography Settings */}
      <Accordion 
        expanded={expandedPanels.includes('general')}
        onChange={handlePanelChange('general')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="medium">
            General Settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Base Font Family"
                value={typography.fontFamily || ''}
                onChange={handleGeneralTypographyChange('fontFamily')}
                placeholder="Roboto, sans-serif"
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Base Font Size (px)"
                type="number"
                value={typography.fontSize || 14}
                onChange={handleGeneralTypographyChange('fontSize')}
                inputProps={{ min: 8, max: 24 }}
                size="small"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Typography Variants */}
      {typographyVariants.map(({ key, label, sample }) => {
        const variant = typography[key] as TypographyVariant | undefined;
        const currentFont = getCurrentFontFamily(variant);
        
        return (
          <Accordion 
            key={key}
            expanded={expandedPanels.includes(key)}
            onChange={handlePanelChange(key)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {label}
                </Typography>
                {currentFont && (
                  <Chip 
                    label={currentFont} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            </AccordionSummary>
            
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant={key as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'}
                  sx={{ 
                    p: 2, 
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  {sample}
                </Typography>
              </Box>

              {showFontPicker === key && (
                <Box sx={{ mb: 3 }}>
                  <FontPicker
                    selectedFont={currentFont}
                    onFontSelect={(font) => handleFontSelect(key, font)}
                    previewText={sample}
                    showVariants
                  />
                  <Button 
                    onClick={() => setShowFontPicker(null)} 
                    sx={{ mt: 1 }}
                    size="small"
                  >
                    Close Font Picker
                  </Button>
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setShowFontPicker(showFontPicker === key ? null : key)}
                      disabled={loadingFonts}
                    >
                      {showFontPicker === key ? 'Hide' : 'Change'} Font
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<RefreshIcon />}
                      onClick={() => resetVariantToDefault(key)}
                    >
                      Reset
                    </Button>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Font Size"
                    value={variant?.fontSize || ''}
                    onChange={handleVariantTextFieldChange(key, 'fontSize')}
                    placeholder="1.5rem or 24"
                    size="small"
                    helperText="Use rem, em, px, or number"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Font Weight</InputLabel>
                    <Select
                      value={variant?.fontWeight?.toString() || '400'}
                      label="Font Weight"
                      onChange={handleVariantChange(key, 'fontWeight')}
                    >
                      {fontWeights.map(weight => (
                        <MenuItem key={weight.value} value={weight.value.toString()}>
                          {weight.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Line Height"
                    value={variant?.lineHeight || ''}
                    onChange={handleVariantTextFieldChange(key, 'lineHeight')}
                    placeholder="1.5 or 24px"
                    size="small"
                    helperText="Number or with unit"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ px: 1 }}>
                    <Typography variant="body2" gutterBottom>
                      Letter Spacing: {variant?.letterSpacing || 0}
                    </Typography>
                    <Slider
                      value={Number(variant?.letterSpacing) || 0}
                      onChange={handleSliderChange(key, 'letterSpacing')}
                      min={-2}
                      max={5}
                      step={0.1}
                      marks
                      valueLabelDisplay="auto"
                      size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
      
      {googleFonts.length > 0 && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Google Fonts Used ({googleFonts.length})
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {googleFonts.map(font => (
              <Chip
                key={font}
                label={font}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TypographyEditor;