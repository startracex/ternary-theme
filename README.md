# ternary-theme

Control your light, dark, and automatic themes.

## Examples

### React context

```tsx
"use client";
import type { ReactNode } from "react";
import { ThemeProvider, type TernaryTheme } from "ternary-theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider
          onThemeInitialize={() => {
            return (localStorage.getItem("theme") || "auto") as TernaryTheme;
          }}
          onThemeChange={(theme, resolvedTheme) => {
            document.documentElement.style.colorScheme = resolvedTheme;
            localStorage.setItem("theme", theme);
          }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
"use client";
import { useTheme } from "ternary-theme";

export default function Page() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <>
      {theme};{resolvedTheme}
      <div>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("auto")}>Auto</button>
      </div>
    </>
  );
}
```

### React hook

```tsx
"use client";
import { useTheme } from "ternary-theme/hook.js";

export default function Page() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <>
      {theme};{resolvedTheme}
      <div>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("auto")}>Auto</button>
      </div>
    </>
  );
}
```
