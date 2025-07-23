# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production (runs TypeScript compiler and Vite build)
- `yarn lint` - Run ESLint for code linting
- `yarn preview` - Preview production build locally

**Important**: Always run `yarn lint` after making changes to ensure code quality.

## Project Architecture

This is a React + TypeScript theme designer application using Vite as the build tool.

### Key Technologies
- **Frontend**: React 19, TypeScript, Material-UI (MUI)
- **Routing**: React Router v7 with lazy loading
- **State Management**: Zustand for global state
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with custom interceptors
- **Styling**: Emotion (via MUI), MUI Color Input component
- **Fonts**: WebFont Loader for dynamic font loading

### Directory Structure

The codebase follows a domain-driven design pattern:

```
src/
├── app/           # Application-level configuration
│   ├── layout/    # Layout components (AuthLayout, MainLayout)
│   └── router/    # Routing configuration and protection
├── domains/       # Business domains
│   ├── auth/      # Authentication (login, register, stores, services)
│   ├── dashboard/ # Dashboard functionality
│   ├── profile/   # User profile management
│   └── themes/    # Theme management (CRUD operations)
└── shared/        # Shared utilities and components
    ├── components/# Reusable UI components
    ├── services/  # HTTP client and interceptors
    └── utils/     # Utility functions
```

### Path Aliases

The project uses TypeScript path aliases configured in both `tsconfig.json` and `vite.config.ts`:
- `@app/*` → `src/app/*`
- `@domains/*` → `src/domains/*`  
- `@shared/*` → `src/shared/*`

### Domain Structure Pattern

Each domain follows a consistent structure:
- `pages/` - React components for routes
- `services/` - API calls and business logic
- `stores/` or `store/` - Zustand state management
- `hooks/` - Custom React hooks
- `schemas/` - Zod validation schemas
- `providers/` - React context providers (auth domain)
- `types/` - TypeScript type definitions

### Authentication & Routing

- Uses `ProtectedRoute` component for route protection
- Authentication state managed via Zustand
- Lazy-loaded routes with React.Suspense
- Auth routes (`/login`, `/register`) use `AuthLayout`
- Protected routes use `MainLayout` with nested routing

### State Management

- Zustand stores located in each domain's `stores/` or `store/` directory
- Auth store handles user authentication state
- Theme store manages theme-related state
- Stores follow consistent naming: `{domain}.store.ts`

### HTTP Layer

- Custom Axios client in `src/shared/services/http/`
- Interceptors for request/response handling
- Centralized error handling and authentication tokens

### Theme Designer Specific Features

- **FontPicker Component**: Integrates with Google Fonts API for font selection and loading
- **TypographyEditor**: Advanced typography customization with live preview
- **ColorPicker**: Uses `mui-color-input` for sophisticated color selection
- **DevicePreview**: Multi-device responsive theme preview system
- **StepperWizard**: Multi-step theme creation workflow
- **Theme Configuration**: MUI theme configuration with custom palette and typography
- **Font Loading**: Dynamic font loading using WebFont Loader with fallback handling
- **Theme Utils**: Color manipulation and theme validation utilities in `src/domains/themes/utils/`

### Key Patterns

- **Component Organization**: Domain-specific UI components in `{domain}/components/ui/` folders
- **Service Layer**: External API integrations (Google Fonts, theme services) in `{domain}/services/`
- **Custom Hooks**: Reusable logic for font loading, color palettes, device preview, etc.
- **Form Handling**: React Hook Form with Zod validation for all user inputs
- **Theme Management**: Centralized theme state with persistence and preview capabilities