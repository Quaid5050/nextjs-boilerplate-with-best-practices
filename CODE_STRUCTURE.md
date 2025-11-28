# 📁 Code Structure

## Project structure

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
│   ├── actions                     # Reusable actions
│   └── workflows                   # GitHub Actions workflows
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── docs                            # Project documentation
│   ├── project-structure-and-best-practices.md
│   └── development-workflow.md
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── components                  # React components
│   │   ├── ui                      # shadcn/ui components
│   │   ├── icons                   # Icon components
│   │   └── providers               # Context providers
│   ├── features                    # Feature-based modules
│   ├── hooks                       # Shared reusable hooks
│   ├── lib                         # Library configurations
│   ├── libs                        # 3rd party libraries configuration
│   ├── locales                     # Locales folder (i18n messages)
│   ├── services                    # API service layer
│   ├── stores                      # Zustand stores
│   ├── styles                      # Styles folder
│   ├── templates                   # Templates folder
│   ├── types                       # Type definitions
│   ├── utils                       # Utilities folder
│   └── validations                 # Validation schemas
├── tests
│   ├── e2e                         # E2E tests, also includes Monitoring as Code
│   └── integration                 # Integration tests
├── next.config.ts                  # Next JS configuration
└── tsconfig.json                   # TypeScript configuration
```

## Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Project Structure and Best Practices](./docs/project-structure-and-best-practices.md)** - Complete guide on project structure, conventions, and best practices
- **[Development Workflow](./docs/development-workflow.md)** - Git workflow, commit guidelines, and development process

These documents cover:
- Technology stack and when to use each tool
- File naming conventions (kebab-case)
- Type management (single source of truth)
- Service layer pattern
- Component organization rules
- State management guidelines
- Code quality standards

## Customization

You can easily configure Next js Boilerplate by searching the entire project for `FIXME:` to make quick customizations. Here are some of the most important files to customize:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your website favicon
- `src/utils/app-config.ts`: configuration file
- `src/templates/base-template.tsx`: default theme
- `next.config.ts`: Next.js configuration
- `.env`: default environment variables

You have full access to the source code for further customization. The provided code is just an example to help you start your project. The sky's the limit 🚀.

