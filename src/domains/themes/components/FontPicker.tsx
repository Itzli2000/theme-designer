import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  type SelectChangeEvent,
} from '@mui/material';
import { Search as SearchIcon, TextFields as FontIcon } from '@mui/icons-material';
import { fontsService, type GoogleFont } from '../services/fonts.service';

interface FontPickerProps {
  selectedFont?: string;
  onFontSelect: (fontFamily: string) => void;
  previewText?: string;
  showVariants?: boolean;
  category?: string;
  onCategoryChange?: (category: string) => void;
}

export const FontPicker: React.FC<FontPickerProps> = ({
  selectedFont,
  onFontSelect,
  previewText = 'The quick brown fox jumps over the lazy dog',
  showVariants = false,
  category = '',
  onCategoryChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingFonts, setLoadingFonts] = useState<Set<string>>(new Set());

  const categories = fontsService.getFontCategories();

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      setLoading(true);
      setError(null);
      const googleFonts = await fontsService.getGoogleFonts();
      setFonts(googleFonts);
    } catch (err) {
      setError('Failed to load fonts. Please try again.');
      console.error('Error loading fonts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFonts = useMemo(() => {
    return fonts.filter(font => {
      const matchesSearch = searchQuery === '' || 
        font.family.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === '' || font.category === category;
      return matchesSearch && matchesCategory;
    }).slice(0, 50); // Limit results for performance
  }, [fonts, searchQuery, category]);

  const handleFontSelect = async (fontFamily: string) => {
    try {
      setLoadingFonts(prev => new Set(prev).add(fontFamily));
      await fontsService.loadFont(fontFamily, ['400', '700']);
      onFontSelect(fontFamily);
    } catch (err) {
      console.error('Error loading font:', err);
    } finally {
      setLoadingFonts(prev => {
        const newSet = new Set(prev);
        newSet.delete(fontFamily);
        return newSet;
      });
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const newCategory = event.target.value;
    onCategoryChange?.(newCategory);
  };

  const FontPreview: React.FC<{ font: GoogleFont; isSelected: boolean }> = ({ 
    font, 
    isSelected 
  }) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const isLoading = loadingFonts.has(font.family);

    useEffect(() => {
      setFontLoaded(fontsService.isFontLoaded(font.family));
    }, [font.family]);

    return (
      <ListItem disablePadding>
        <ListItemButton
          selected={isSelected}
          onClick={() => handleFontSelect(font.family)}
          disabled={isLoading}
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            py: 2,
            gap: 1,
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              width: '100%',
              alignItems: 'center' 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FontIcon fontSize="small" />
              <Typography variant="body2" fontWeight="medium">
                {font.family}
              </Typography>
              <Chip 
                label={font.category} 
                size="small" 
                variant="outlined"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
            {isLoading && <CircularProgress size={16} />}
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              fontFamily: fontLoaded ? `"${font.family}", ${font.category}` : 'inherit',
              fontSize: '1.1rem',
              width: '100%',
              opacity: fontLoaded ? 1 : 0.7,
            }}
          >
            {previewText}
          </Typography>
          
          {showVariants && font.variants.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
              {font.variants.slice(0, 8).map(variant => (
                <Chip
                  key={variant}
                  label={variant}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    height: 18, 
                    fontSize: '0.65rem',
                    '& .MuiChip-label': { px: 0.5 }
                  }}
                />
              ))}
              {font.variants.length > 8 && (
                <Chip
                  label={`+${font.variants.length - 8}`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    height: 18, 
                    fontSize: '0.65rem',
                    '& .MuiChip-label': { px: 0.5 }
                  }}
                />
              )}
            </Box>
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search fonts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
          size="small"
        />
        
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedFont && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Selected Font:
          </Typography>
          <Chip
            label={selectedFont}
            onDelete={() => onFontSelect('')}
            sx={{ mb: 1 }}
          />
          <Divider />
        </Box>
      )}

      <Paper 
        variant="outlined" 
        sx={{ 
          maxHeight: 400, 
          overflow: 'auto',
          '& .MuiList-root': { p: 0 }
        }}
      >
        <List>
          {filteredFonts.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="No fonts found" 
                secondary="Try adjusting your search or category filter"
              />
            </ListItem>
          ) : (
            filteredFonts.map((font, index) => (
              <React.Fragment key={font.family}>
                <FontPreview 
                  font={font} 
                  isSelected={selectedFont === font.family}
                />
                {index < filteredFonts.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
      
      {filteredFonts.length >= 50 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          Showing first 50 results. Use search to narrow down your selection.
        </Typography>
      )}
    </Box>
  );
};

export default FontPicker;