export default function DeferComponent() {
  const code = `
  // app/page.tsx (Next.js App Router ortamında çalışır)
  import { Suspense } from "react";
  import { defer } from "react-server";
  import SlowComponent from "./SlowComponent";

  export default async function DeferComponent() {
    const data = defer({
      fast: "Hızlı veri",
      slow: fetchSlowMessage(), // Yavaş veri
    });

    return (
      <div>
        <strong>Hızlı veri:</strong> {data.fast}
        <Suspense fallback={<p>🐢 Yavaş veri yükleniyor...</p>}>
          <SlowComponent data={data.slow} />
        </Suspense>
      </div>
    );
  }

  async function fetchSlowMessage() {
    await new Promise((r) => setTimeout(r, 3000));
    return "🐢 Bu veri geç geldi (3sn delay)";
  }

  async function SlowComponent({ data }: { data: Promise<string> }) {
    const message = await data;
    return <p><strong>Yavaş veri:</strong> {message}</p>;
  }
`;

  const code2 = `
  // SlowComponent.tsx
  export default async function SlowComponent({ data }: { data: Promise<string> }) {
    const message = await data;
    return <p><strong>Yavaş veri:</strong> {message}</p>;
  }
`;

  return (
    <div>
      <h2>❌ defer()</h2>
      <p>
        React 19 ile gelen <code>defer()</code> fonksiyonu, hızlı gelen veriyi
        hemen, yavaş gelen veriyi ise <code>Suspense</code> ile sonradan
        göstermemizi sağlar. Bu sayede kullanıcıya daha hızlı bir içerik
        deneyimi sunabiliriz.
      </p>
      <span>
        use elementi defer() ile gelen veriler için şu an doğrudan çalışmaz:
      </span>
      <pre
        style={{
          background: "#1e1e1e",
          color: "#f8f8f2",
          padding: "1rem",
          borderRadius: "8px",
          overflowX: "auto",
          fontSize: "0.9rem",
        }}
      >
        <code>{code}</code>
      </pre>
      <span>SlowComponent dosyası:</span>
      <pre
        style={{
          background: "#1e1e1e",
          color: "#f8f8f2",
          padding: "1rem",
          borderRadius: "8px",
          overflowX: "auto",
          fontSize: "0.9rem",
        }}
      >
        <code>{code2}</code>
      </pre>
    </div>
  );
}
