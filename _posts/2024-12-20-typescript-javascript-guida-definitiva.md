---
layout: post
title: "TypeScript: La Guida Definitiva per Sviluppatori JavaScript"
date: 2024-12-20
author: "Oltrematica Team"
linkedin: "oltrematica"
tags: [TypeScript, JavaScript, Web Development, Programming]
reading_time: 15
excerpt: "Tutto quello che devi sapere su TypeScript: dai concetti base alle funzionalità avanzate per scrivere codice JavaScript type-safe."
image: https://picsum.photos/seed/typescript/1200/630
---

TypeScript ha rivoluzionato lo sviluppo JavaScript moderno, aggiungendo un potente sistema di tipi che previene errori e migliora l'esperienza di sviluppo. In questa guida completa, esploreremo tutto ciò che serve per padroneggiare TypeScript.

## Perché TypeScript?

### Vantaggi Principali

1. **Type Safety**: Cattura errori in fase di compilazione
2. **Migliore IDE Support**: Autocompletamento e refactoring intelligente
3. **Documentazione Implicita**: I tipi documentano il codice
4. **Scalabilità**: Gestisce meglio codebase grandi
5. **Retrocompatibilità**: Puoi usare qualsiasi libreria JavaScript

## Setup Iniziale

```bash
# Installazione
npm install -D typescript @types/node

# Inizializza configurazione
npx tsc --init
```

### tsconfig.json Essenziale

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Tipi Base

### Primitive Types

```typescript
let name: string = "Mario";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Arrays e Tuple

```typescript
// Array
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuple - array con lunghezza e tipi fissi
let user: [string, number] = ["Mario", 30];
```

### Object Types

```typescript
// Oggetto semplice
let person: { name: string; age: number } = {
  name: "Mario",
  age: 30
};

// Proprietà opzionali
interface User {
  name: string;
  age?: number; // opzionale
  readonly id: string; // readonly
}
```

## Interfacce e Type Aliases

### Interface

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Estensione
interface Admin extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}
```

### Type Alias

```typescript
type Point = {
  x: number;
  y: number;
};

// Union types
type Status = "pending" | "active" | "inactive";

// Intersection types
type Employee = Person & { employeeId: number };
```

### Interface vs Type

```typescript
// Interface può essere estesa
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// Type usa intersection
type Animal = {
  name: string;
};
type Dog = Animal & {
  breed: string;
};
```

## Generics

I generics permettono di creare componenti riutilizzabili:

```typescript
// Function generic
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");

// Interface generic
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: "1", name: "Mario", email: "mario@example.com" },
  status: 200,
  message: "Success"
};

// Class generic
class DataStore<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItems(): T[] {
    return this.items;
  }
}

const userStore = new DataStore<User>();
```

## Utility Types

TypeScript fornisce utility types built-in:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial - rende tutte le proprietà opzionali
type PartialUser = Partial<User>;

// Required - rende tutte le proprietà obbligatorie
type RequiredUser = Required<User>;

// Pick - seleziona proprietà specifiche
type UserPreview = Pick<User, "id" | "name">;

// Omit - esclude proprietà specifiche
type UserWithoutEmail = Omit<User, "email">;

// Record - crea oggetto con chiavi e valori specificati
type UserRoles = Record<string, "admin" | "user">;

// Readonly - rende tutte le proprietà readonly
type ReadonlyUser = Readonly<User>;
```

## Funzioni Avanzate

### Function Types

```typescript
// Function type
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// Default parameters
function createUser(name: string, role: string = "user"): User {
  return { id: generateId(), name, role };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### Overloading

```typescript
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: boolean): string;
function formatValue(value: any): string {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toFixed(2);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}
```

## Type Guards e Narrowing

```typescript
// typeof guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript sa che è string
  }
  return value.toFixed(2); // TypeScript sa che è number
}

// instanceof guard
class Dog {
  bark() { console.log("Woof!"); }
}
class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// Custom type guard
interface Fish {
  swim: () => void;
}
interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```

## Async/Await con TypeScript

```typescript
// Promise types
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data as User;
}

// Error handling
async function safelyFetchUser(id: string): Promise<User | null> {
  try {
    return await fetchUser(id);
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

## Decorators (Experimental)

```typescript
// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}

// Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

## Best Practices

### 1. Usa Strict Mode

Abilita sempre `strict: true` in tsconfig.json per massima type safety.

### 2. Evita Any

```typescript
// ❌ Evita
function process(data: any) { }

// ✅ Meglio
function process(data: unknown) {
  if (typeof data === "string") {
    // ora puoi usarlo come string
  }
}
```

### 3. Usa Const Assertions

```typescript
// Type: string
let status = "active";

// Type: "active"
let status = "active" as const;

// Oggetto readonly
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;
```

### 4. Type Guards Invece di Type Assertions

```typescript
// ❌ Evita
const user = data as User;

// ✅ Meglio
if (isUser(data)) {
  // TypeScript ora sa che data è User
}
```

## Conclusione

TypeScript è uno strumento essenziale per lo sviluppo JavaScript moderno. Investire tempo nell'apprendimento di TypeScript ripagherà con codice più sicuro, manutenibile e scalabile.

Inizia gradualmente, aggiungi tipi ai nuovi file e, col tempo, la tua produttività e la qualità del codice miglioreranno notevolmente!
