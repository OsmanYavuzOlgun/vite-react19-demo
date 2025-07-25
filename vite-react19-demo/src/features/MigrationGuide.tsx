import React from "react";

export default function MigrationGuide() {
  const codeInstallReact = `npm install react@19 react-dom@19`;

  const codeViteConfig = `// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
;`;

  return (
    <div>
      <h2>🧭 React 19 Migration Guide (Vite ile)</h2>
      <h2>🔧 1. Gereksinimler</h2>
      <ul>
        <li>
          <strong>Node.js:</strong>
          <code>≥ 18.17.0 (20 &gt; best result )</code>
        </li>
        <li>
          <strong>React:</strong> <code>^19.0.0</code>
        </li>
      </ul>

      <h2>📦 2. React 19 Kurulumu</h2>
      <pre>
        <code>{codeInstallReact}</code>
      </pre>

      <h2>⚙️ 3. Vite Config Ayarı</h2>
      <pre>
        <code>{codeViteConfig}</code>
      </pre>

      <h2>📘 Not:</h2>
      <ul>
        <li>
          <strong>Server Actions, defer ve partial pre rendering</strong>
          yalnızca <strong>Next.js App Router</strong> ortamında çalışır.
        </li>
      </ul>
    </div>
  );
}
