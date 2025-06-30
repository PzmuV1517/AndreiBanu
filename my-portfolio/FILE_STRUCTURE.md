# File Structure Documentation

This document describes the organized file structure of the portfolio application.

## Directory Structure

```
my-portfolio/
├── src/
│   ├── components/              # React components
│   │   ├── AboutMe/
│   │   │   ├── AboutMe.tsx
│   │   │   ├── AboutMe.css
│   │   │   └── index.ts
│   │   ├── BootSequence/
│   │   │   ├── BootSequence.tsx
│   │   │   └── index.ts
│   │   ├── Contact/
│   │   │   ├── Contact.tsx
│   │   │   ├── Contact.css
│   │   │   └── index.ts
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   └── index.ts
│   │   ├── MyAchievements/
│   │   │   ├── MyAchievements.tsx
│   │   │   ├── MyAchievements.css
│   │   │   └── index.ts
│   │   ├── MyProjects/
│   │   │   ├── MyProjects.tsx
│   │   │   ├── MyProjects.css
│   │   │   └── index.ts
│   │   ├── MySkills/
│   │   │   ├── MySkills.tsx
│   │   │   ├── MySkills.css
│   │   │   └── index.ts
│   │   └── index.ts             # Component barrel exports
│   ├── styles/                  # Global styles
│   │   ├── App.css
│   │   └── index.css
│   ├── utils/                   # Utility functions
│   │   ├── commands.tsx
│   │   ├── logoAscii.ts
│   │   └── index.ts             # Utility barrel exports
│   ├── assets/                  # Static assets
│   │   └── react.svg
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── vite-env.d.ts           # Vite type definitions
├── public/                      # Public assets
│   ├── startup.mp3
│   └── vite.svg
└── [config files...]           # Configuration files
```

## Organization Benefits

### 1. **Component Co-location**
- Each component has its own folder containing the TypeScript file and CSS file
- This makes it easy to find all files related to a specific component
- Reduces the chance of naming conflicts

### 2. **Barrel Exports**
- Each component folder has an `index.ts` file for cleaner imports
- The main `components/index.ts` file exports all components
- Import example: `import { AboutMe, Contact } from './components'`

### 3. **Separation of Concerns**
- **`/components`**: All React components
- **`/styles`**: Global styles and theme files
- **`/utils`**: Utility functions, helpers, and constants
- **`/assets`**: Static assets like images and icons

### 4. **Scalability**
- Easy to add new components by creating a new folder
- Clear structure makes onboarding new developers easier
- Facilitates code reuse and maintenance

## Import Patterns

### Component Imports
```typescript
// Clean component imports
import { AboutMe, Contact, MySkills } from './components';

// Individual component import (if needed)
import AboutMe from './components/AboutMe';
```

### Utility Imports
```typescript
// Clean utility imports
import { commands, logoAscii } from './utils';
```

### Style Imports
```typescript
// Global styles
import './styles/App.css';

// Component-specific styles (within component files)
import './ComponentName.css';
```

## Maintenance Guidelines

1. **New Components**: Create a new folder in `/components` with the component file, CSS file, and index.ts
2. **Shared Utilities**: Add to `/utils` and export from `/utils/index.ts`
3. **Global Styles**: Add to `/styles` directory
4. **Assets**: Place in `/assets` or `/public` depending on usage (imported vs. public URL)

This structure follows React best practices and makes the codebase more maintainable and scalable.
