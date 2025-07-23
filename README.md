# Theme Designer

A powerful, interactive web application for creating and customizing Material-UI themes with real-time preview capabilities. Built with React 19, TypeScript, and Material-UI, this application provides an intuitive interface for designers and developers to create beautiful, consistent themes.

## ✨ Features

### 🎨 Advanced Theme Customization
- **Visual Color Palette Editor**: Interactive color picker with predefined color schemes
- **Typography Customization**: Full control over fonts, sizes, weights, and spacing
- **Google Fonts Integration**: Browse and select from 1000+ Google Fonts with live preview
- **Multi-Device Preview**: Real-time preview across desktop, tablet, and mobile viewports
- **Dark/Light Mode Support**: Toggle between light and dark theme variants

### 🔧 Professional Workflow
- **Step-by-Step Wizard**: Guided theme creation process with validation
- **Theme Management**: Create, edit, duplicate, and organize your themes
- **Export Capabilities**: Export themes as JSON configurations for use in projects
- **Live Preview**: See your changes instantly with interactive component previews
- **Responsive Design**: Fully responsive interface that works on all devices

### 👤 User Management
- **User Authentication**: Secure login and registration system
- **Profile Management**: Personal dashboard and account settings
- **Theme Organization**: Organize and manage your custom themes

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/theme-designer.git
   cd theme-designer
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start designing themes!

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
yarn dev

# Build for production
yarn build

# Run ESLint for code quality
yarn lint

# Preview production build locally
yarn preview
```

### Code Quality
Always run `yarn lint` after making changes to ensure code quality and consistency.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19 with TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **Build Tool**: Vite
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios with custom interceptors
- **Routing**: React Router v7 with lazy loading
- **Font Loading**: WebFont Loader
- **Styling**: Emotion (via MUI)

### Project Structure

```
src/
├── app/                 # Application configuration
│   ├── layout/         # Layout components (AuthLayout, MainLayout)
│   └── router/         # Routing configuration and protection
├── domains/            # Business domains
│   ├── auth/          # Authentication system
│   ├── dashboard/     # User dashboard
│   ├── profile/       # Profile management
│   └── themes/        # Theme designer core functionality
│       ├── components/ # Theme-specific UI components
│       ├── hooks/     # Custom hooks for theme operations
│       ├── pages/     # Theme management pages
│       ├── services/  # API services and Google Fonts integration
│       ├── store/     # Zustand state management
│       ├── types/     # TypeScript definitions
│       └── utils/     # Theme utilities and helpers
└── shared/            # Shared utilities and components
    ├── components/    # Reusable UI components
    ├── services/      # HTTP client and interceptors
    └── utils/         # Utility functions
```

### Key Components

#### Theme Designer Components
- **FontPicker**: Google Fonts browser with search and preview
- **TypographyEditor**: Advanced typography customization interface
- **ColorPicker**: Sophisticated color selection with predefined palettes
- **DevicePreview**: Multi-device responsive preview system
- **StepperWizard**: Guided theme creation workflow
- **ThemePreview**: Live preview of theme changes

#### Core Features
- **Domain-Driven Design**: Organized by business functionality
- **TypeScript Path Aliases**: Clean imports with `@app/*`, `@domains/*`, `@shared/*`
- **Custom Hooks**: Reusable logic for font loading, color management, device preview
- **Centralized HTTP**: Axios client with interceptors for API communication
- **Protected Routes**: Authentication-based route protection

## 🎯 Usage

### Creating a New Theme

1. **Navigate to Theme Creation**: Click "Create New Theme" from the dashboard
2. **Basic Information**: Enter theme name and description
3. **Color Customization**: Select primary, secondary, and accent colors
4. **Typography Setup**: Choose fonts and configure typography scales
5. **Preview & Test**: Review your theme across different devices
6. **Save & Export**: Save your theme and export the configuration

### Customizing Colors
- Use the interactive color picker to select colors
- Choose from predefined color palettes
- Preview color combinations in real-time
- Support for both light and dark variants

### Typography Configuration
- Browse and select from 1000+ Google Fonts
- Configure font weights, sizes, and line heights
- Set up typography hierarchy (headings, body text, captions)
- Preview text samples with your chosen fonts

### Device Preview
- Toggle between desktop, tablet, and mobile views
- See how your theme responds to different screen sizes
- Test component layouts and spacing

## 🔧 Configuration

### Environment Variables
Configure your environment variables in `.env.local`:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_GOOGLE_FONTS_API_KEY=your_google_fonts_api_key
```

### Theme Configuration
Themes are stored as MUI theme configurations with the following structure:

```typescript
interface MuiThemeConfig {
  palette: {
    mode: 'light' | 'dark';
    primary: { main: string; dark?: string; light?: string; };
    secondary: { main: string; dark?: string; light?: string; };
    // ... other palette options
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: { fontSize: string; fontWeight: number; };
    // ... other typography options
  };
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests and ensure code quality (`yarn lint`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- Google Fonts for the extensive font library
- React team for the amazing framework
- All contributors who help improve this project

---

**Happy Theme Designing! 🎨**