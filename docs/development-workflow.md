# Development Workflow

This document outlines the development workflow, Git practices, and contribution guidelines.

## Git Workflow

### Branch Strategy

- **main** - Production-ready code
- **develop** - Development branch (if using Git Flow)
- **feature/[feature-name]** - Feature branches
- **fix/[bug-name]** - Bug fix branches

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(product): add product search functionality
fix(cart): resolve cart item duplication issue
docs: update project structure documentation
refactor(services): improve API error handling
```

### Running Commits

Use the commit CLI for guided commits:

```bash
pnpm run commit
```

## Development Commands

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run dev          # Start development server
pnpm run dev:next     # Start Next.js only
pnpm run dev:spotlight # Start Sentry Spotlight
```

### Building

```bash
pnpm run build        # Production build
pnpm run build-local  # Local build (for CI)
pnpm run build-stats  # Build with bundle analysis
```

### Code Quality

```bash
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues
pnpm run check:types  # TypeScript type checking
pnpm run check:deps   # Check for unused dependencies
pnpm run check:i18n   # Check i18n translations
```

### Testing

```bash
pnpm run test         # Run unit tests
pnpm run test:e2e     # Run E2E tests
pnpm run storybook    # Start Storybook
pnpm run storybook:test # Run Storybook tests
```

## Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows project structure guidelines
- [ ] All files use kebab-case naming
- [ ] Types are defined in appropriate type files
- [ ] Components are properly typed
- [ ] No TypeScript errors (`pnpm run check:types`)
- [ ] No linting errors (`pnpm run lint`)
- [ ] Tests pass (`pnpm run test`)
- [ ] Components are under 350 lines
- [ ] Reusable logic is extracted to hooks/utils
- [ ] Error and loading states are handled
- [ ] Commit messages follow Conventional Commits

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the guidelines
3. Run quality checks locally
4. Commit using `pnpm run commit`
5. Push and create a Pull Request
6. Address review feedback
7. Merge after approval

