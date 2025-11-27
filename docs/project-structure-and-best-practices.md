# Project Structure and Best Practices

This document outlines the project structure, conventions, and best practices for this Next.js application. Follow these guidelines to maintain consistency and code quality.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [File Naming Conventions](#file-naming-conventions)
4. [Type Management](#type-management)
5. [Service Layer Pattern](#service-layer-pattern)
6. [Component Organization](#component-organization)
7. [State Management](#state-management)
8. [Data Fetching](#data-fetching)
9. [Code Quality Rules](#code-quality-rules)
10. [Best Practices](#best-practices)

## Technology Stack

### Core Technologies

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe programming language
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library (built on Radix UI)

### State Management & Data Fetching

- **Zustand** - Client-side state management (UI state, form state, local preferences)
- **React Query (TanStack Query)** - Server state management (API data, database queries)
- **nuqs** - URL state management (filters, query parameters, pagination)

### Forms & Validation

- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Commitlint** - Commit message validation
- **Semantic Release** - Automated versioning and releases

### CI/CD

- **GitHub Actions** - Continuous Integration and Deployment
- **GitHub** - Project management and version control

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   │   ├── (marketing)/   # Route groups
│   │   │   ├── _components/  # Page-specific components
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── api/           # API routes
│   └── ...
├── components/             # Reusable components
│   ├── ui/                # shadcn/ui components (Button, Input, etc.)
│   ├── icons/             # Icon components
│   ├── animations/        # Animation components
│   └── providers/         # Context providers
├── features/              # Feature-based modules
│   ├── product/
│   │   ├── components/    # Product-specific components
│   │   ├── hooks/        # Product-specific hooks
│   │   └── services/      # Product services
│   ├── cart/
│   ├── checkout/
│   └── ...
├── hooks/                 # Shared reusable hooks
├── lib/                   # Library configurations and utilities
│   ├── utils.ts           # Utility functions (cn, etc.)
│   ├── query-client.ts    # React Query configuration
│   └── ...
├── services/              # API service layer
│   ├── product/
│   │   ├── product.service.ts
│   │   ├── product.types.ts
│   │   └── product.hooks.ts
│   ├── order/
│   ├── user/
│   └── ...
├── stores/                # Zustand stores
├── types/                 # Global types and interfaces
│   ├── product.types.ts
│   ├── order.types.ts
│   ├── user.types.ts
│   ├── auth.types.ts
│   ├── cart.types.ts
│   └── checkout.types.ts
├── utils/                 # Utility functions
└── validations/           # Zod validation schemas
```

## File Naming Conventions

**All files must use kebab-case naming:**

✅ **Correct:**
- `product.service.ts`
- `user-profile.component.tsx`
- `use-debounced-value.ts`
- `app-config.ts`
- `i18n-routing.ts`

❌ **Incorrect:**
- `ProductService.ts` (PascalCase)
- `userProfile.ts` (camelCase)
- `AppConfig.ts` (PascalCase)

### File Naming Patterns

- **Components**: `component-name.tsx`
- **Services**: `service-name.service.ts`
- **Types**: `module-name.types.ts`
- **Hooks**: `use-hook-name.ts`
- **Utils**: `utility-name.ts`
- **Stores**: `use-store-name.ts`

## Type Management

### Single Source of Truth

All types, interfaces, and enums should be defined in the `src/types/` folder, organized by domain:

```typescript
// src/types/product.types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  brand: string;
  category: string;
}

export type ProductStatus = 'active' | 'inactive' | 'draft';

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}
```

### Type Utilities

Use TypeScript utility types for code reuse:

```typescript
// Create variations using utility types
export type ProductPreview = Pick<Product, 'id' | 'name' | 'price' | 'images'>;
export type CreateProduct = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProduct = Partial<Pick<Product, 'name' | 'price' | 'description'>>;
```

### Service-Specific Types

Services can have their own types file that imports from the main types:

```typescript
// src/services/product/product.types.ts
import type { Product, ProductFilters } from '@/types/product.types';

export interface ProductServiceResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export type ProductServiceParams = ProductFilters & {
  page?: number;
  limit?: number;
};
```

## Service Layer Pattern

### Service Structure

Each service should have:
1. **Service file** (`product.service.ts`) - API calls and business logic
2. **Types file** (`product.types.ts`) - Service-specific types
3. **Hooks file** (`product.hooks.ts`) - React Query hooks

### Service File Example

```typescript
// src/services/product/product.service.ts
import type { Product, ProductFilters } from '@/types/product.types';
import type { ProductServiceResponse, ProductServiceParams } from './product.types';
import { apiClient } from '@/lib/api-client';

// Server-side API functions
export async function getProducts(params?: ProductServiceParams): Promise<ProductServiceResponse> {
  const response = await apiClient.get<ProductServiceResponse>('/api/products', { params });
  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await apiClient.get<Product>(`/api/products/${id}`);
  return response.data;
}

export async function createProduct(data: CreateProduct): Promise<Product> {
  const response = await apiClient.post<Product>('/api/products', data);
  return response.data;
}
```

### React Query Hooks

```typescript
// src/services/product/product.hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, getProductById, createProduct } from './product.service';
import type { ProductServiceParams, CreateProduct } from './product.types';

// Query hooks
export const useProducts = (params?: ProductServiceParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

// Mutation hooks
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
```

## Component Organization

### Component Size Rules

- **Maximum 200 lines** for standard components
- **Maximum 300-350 lines** for complex components
- If a component exceeds these limits, break it into smaller components

### Component Location

1. **Page-specific components**: Place in `_components/` folder within the page directory
   ```
   app/[locale]/(marketing)/products/
   ├── _components/
   │   ├── product-list.tsx
   │   └── product-filters.tsx
   ├── layout.tsx
   └── page.tsx
   ```

2. **Feature-specific components**: Place in `features/[feature]/components/`
   ```
   features/product/
   ├── components/
   │   ├── product-card.tsx
   │   └── product-details.tsx
   ```

3. **Reusable UI components**: Place in `components/ui/` (shadcn/ui)
4. **Shared components**: Place in `components/`

### Component Structure

```typescript
// src/components/product-card.tsx
'use client';

import type { Product } from '@/types/product.types';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icon';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export const ProductCard = ({ product, onAddToCart, className }: ProductCardProps) => {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      {/* Component implementation */}
    </div>
  );
};
```

## State Management

### When to Use Zustand

Use Zustand for:
- UI state (modals, dropdowns, sidebar)
- Form state (if not using React Hook Form)
- Client-side preferences (theme, settings)
- Shopping cart state
- Local application state

```typescript
// src/stores/use-cart-store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartItem } from '@/types/cart.types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        removeItem: (itemId) => set((state) => ({ items: state.items.filter(i => i.id !== itemId) })),
        clearCart: () => set({ items: [] }),
      }),
      { name: 'cart-store' }
    )
  )
);
```

### When to Use React Query

Use React Query for:
- Server state (API data)
- Data fetching and caching
- Background refetching
- Optimistic updates
- Mutations (create, update, delete)

## Data Fetching

### Client-Side Data Fetching

Use React Query hooks from service files:

```typescript
'use client';

import { useProducts } from '@/services/product/product.hooks';

export const ProductList = () => {
  const { data, isLoading, error } = useProducts({ category: 'perfume' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render products */}</div>;
};
```

### Server-Side Data Fetching

Use service functions directly in Server Components:

```typescript
// app/[locale]/products/page.tsx
import { getProducts } from '@/services/product/product.service';
import { ProductList } from './_components/product-list';

export default async function ProductsPage() {
  const products = await getProducts({ category: 'perfume' });

  return <ProductList initialData={products} />;
}
```

### API Client Setup

Create a reusable API client:

```typescript
// src/lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for auth, error handling, etc.
```

## URL State Management with nuqs

Use nuqs for URL query parameters:

```typescript
'use client';

import { useQueryStates } from 'nuqs';
import { parseAsInteger, parseAsString, parseAsStringEnum } from 'nuqs';

const filters = {
  page: parseAsInteger.withDefault(1),
  category: parseAsString,
  sort: parseAsStringEnum(['price-asc', 'price-desc', 'name-asc']).withDefault('name-asc'),
};

export const ProductFilters = () => {
  const [params, setParams] = useQueryStates(filters);

  return (
    <div>
      <select value={params.sort} onChange={(e) => setParams({ sort: e.target.value })}>
        {/* Options */}
      </select>
    </div>
  );
};
```

## Code Quality Rules

### Component Length

- **Standard components**: Maximum 200 lines
- **Complex components**: Maximum 300-350 lines
- **Break down** larger components into smaller, focused components

### TypeScript Best Practices

1. **Always use types** - Avoid `any`, use `unknown` if needed
2. **Use utility types** - `Pick`, `Omit`, `Partial`, `Required`, etc.
3. **Single source of truth** - Define types once, reuse everywhere
4. **Type inference** - Let TypeScript infer types when possible
5. **Explicit return types** - For functions that return complex types

### Reusability

- **Extract reusable logic** into custom hooks
- **Create utility functions** for common operations
- **Share components** that are used in multiple places
- **Avoid duplication** - DRY (Don't Repeat Yourself) principle

### File Organization

- **One component per file** (except for related small components)
- **Co-locate related files** (component + test + story)
- **Group by feature** when possible
- **Keep imports organized** (external, internal, relative)

## Best Practices

### 1. Component Composition

Break complex components into smaller, composable pieces:

```typescript
// Instead of one large component
export const ProductPage = () => {
  // 400+ lines of code
};

// Break into smaller components
export const ProductPage = () => {
  return (
    <div>
      <ProductHeader />
      <ProductFilters />
      <ProductList />
      <ProductPagination />
    </div>
  );
};
```

### 2. Custom Hooks for Reusability

Extract reusable logic into custom hooks:

```typescript
// src/hooks/use-product-filters.ts
export const useProductFilters = () => {
  const [filters, setFilters] = useQueryStates(productFilters);
  const { data } = useProducts(filters);

  return {
    filters,
    setFilters,
    products: data?.products,
    isLoading: data?.isLoading,
  };
};
```

### 3. Error Handling

Always handle errors gracefully:

```typescript
const { data, error, isLoading } = useProducts();

if (error) {
  return <ErrorBoundary error={error} />;
}
```

### 4. Loading States

Always show loading states:

```typescript
if (isLoading) {
  return <SkeletonLoader />;
}
```

### 5. Type Safety

Use TypeScript strictly:

```typescript
// ✅ Good - Type-safe
const product: Product = await getProduct(id);

// ❌ Bad - No type safety
const product = await getProduct(id);
```

### 6. Import Organization

Organize imports consistently:

```typescript
// 1. External packages
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal absolute imports (@/)
import { Button } from '@/components/ui/button';
import { useProducts } from '@/services/product/product.hooks';
import type { Product } from '@/types/product.types';

// 3. Relative imports
import { ProductCard } from './product-card';
```

### 7. Naming Conventions

- **Components**: PascalCase (`ProductCard`)
- **Files**: kebab-case (`product-card.tsx`)
- **Hooks**: camelCase starting with `use` (`useProducts`)
- **Functions**: camelCase (`getProducts`)
- **Types/Interfaces**: PascalCase (`Product`, `ProductFilters`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### 8. Comments and Documentation

- **Document complex logic** with comments
- **Use JSDoc** for functions and components
- **Keep comments up-to-date** with code changes

```typescript
/**
 * Fetches products from the API with optional filters
 * @param params - Filter and pagination parameters
 * @returns Promise resolving to products response
 */
export async function getProducts(params?: ProductServiceParams): Promise<ProductServiceResponse> {
  // Implementation
}
```

## Summary

### Quick Reference

| Purpose | Technology | Location |
|---------|-----------|----------|
| Client State | Zustand | `src/stores/` |
| Server State | React Query | `src/services/[module]/[module].hooks.ts` |
| URL State | nuqs | Component level |
| Forms | React Hook Form + Zod | Component level |
| UI Components | shadcn/ui | `src/components/ui/` |
| Types | TypeScript | `src/types/[module].types.ts` |
| Services | API calls | `src/services/[module]/[module].service.ts` |
| Hooks | Custom hooks | `src/hooks/` or `src/services/[module]/[module].hooks.ts` |
| Utils | Utility functions | `src/utils/` or `src/lib/utils.ts` |

### File Naming Checklist

- ✅ Use kebab-case for all files
- ✅ Use descriptive names
- ✅ Include file type suffix (`.service.ts`, `.types.ts`, `.hooks.ts`)
- ✅ Keep names concise but clear

### Component Checklist

- ✅ Maximum 200-350 lines
- ✅ Single responsibility
- ✅ Properly typed with TypeScript
- ✅ Uses reusable components
- ✅ Handles loading and error states
- ✅ Follows import organization

### Service Checklist

- ✅ Service file for API calls
- ✅ Types file for service-specific types
- ✅ Hooks file for React Query integration
- ✅ Uses single source of truth types from `src/types/`
- ✅ Proper error handling
- ✅ Type-safe throughout

---

**Remember**: Consistency is key. Follow these patterns throughout the project to maintain code quality and developer experience.

