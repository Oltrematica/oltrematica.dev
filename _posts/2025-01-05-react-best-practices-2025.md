---
layout: post
title: "React Best Practices 2025: Guida Essenziale"
date: 2025-01-05
author: "Oltrematica Team"
linkedin: "oltrematica"
tags: [React, JavaScript, Frontend, Best Practices]
reading_time: 10
excerpt: "Le migliori pratiche per sviluppare applicazioni React moderne, performanti e mantenibili nel 2025."
image: https://picsum.photos/seed/react/1200/630
---

React continua a evolversi e con esso le best practices per sviluppare applicazioni moderne. Ecco una guida completa alle pratiche essenziali per il 2025.

## 1. Usa Function Components e Hooks

I class components sono ormai deprecati. Usa sempre function components con hooks:

```javascript
// ✅ Buono
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return <div>{user?.name}</div>;
}

// ❌ Evita
class UserProfile extends React.Component {
  // ...
}
```

## 2. Custom Hooks per Logica Riutilizzabile

Estrai logica complessa in custom hooks:

```javascript
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}
```

## 3. Ottimizza le Performance

### useMemo e useCallback

Usa `useMemo` per valori computati costosi e `useCallback` per funzioni passate come props:

```javascript
function ProductList({ products }) {
  const expensiveValue = useMemo(
    () => computeExpensiveValue(products),
    [products]
  );

  const handleClick = useCallback(
    (id) => {
      console.log('Clicked:', id);
    },
    []
  );

  return <div>{/* ... */}</div>;
}
```

### React.memo

Memoizza componenti che non cambiano frequentemente:

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* rendering costoso */}</div>;
});
```

## 4. Gestione dello State

### Context API per State Globale

{% raw %}
```javascript
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```
{% endraw %}

### State Colocation

Mantieni lo state il più vicino possibile a dove viene utilizzato:

```javascript
// ✅ Buono - state locale dove serve
function SearchForm() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// ❌ Evita - state globale non necessario
```

## 5. Error Boundaries

Implementa error boundaries per gestire errori gracefully:

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Qualcosa è andato storto.</h1>;
    }
    return this.props.children;
  }
}
```

## 6. TypeScript

Usa TypeScript per type safety:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserProfileProps {
  userId: number;
  onUpdate?: (user: User) => void;
}

function UserProfile({ userId, onUpdate }: UserProfileProps) {
  // TypeScript garantisce type safety
}
```

## 7. Testing

Scrivi test significativi con React Testing Library:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';

test('displays user name', async () => {
  render(<UserProfile userId={1} />);

  const name = await screen.findByText(/john doe/i);
  expect(name).toBeInTheDocument();
});
```

## 8. Code Splitting

Usa React.lazy per code splitting:

```javascript
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

## Conclusione

Seguire queste best practices ti aiuterà a creare applicazioni React moderne, performanti e mantenibili. Ricorda che le pratiche evolvono: rimani sempre aggiornato con la documentazione ufficiale!
