export default function DeferComponent() {
  const code = `export default async function DeferComponentOld() {
  const fast = "Hızlı veri";
  const slow = await fetchSlowMessage();

  return (
    <div>
      <strong>Hızlı veri:</strong> {fast}
      <p><strong>Yavaş veri:</strong> {slow}</p>
    </div>
  );

  async function fetchSlowMessage() {
    await new Promise((r) => setTimeout(r, 3000));
    return "Bu veri geç geldi (3sn delay)";
  }
  }`;

const code3 = `export default async function DeferComponent() {
  const data = defer({
    fast: "Hızlı veri",
    slow: fetchSlowMessage(), // Bu async
  });

  return (
    <div>
      <strong>Hızlı veri:</strong> {data.fast}
      <Suspense fallback={<p>yavaş veri yükleniyor...</p>}>
        <SlowComponent data={data.slow} />
      </Suspense>
    </div>
  );
}

async function fetchSlowMessage() {
  await new Promise((r) => setTimeout(r, 3000));
  return "Bu veri geç geldi (3sn delay)";
}

async function SlowComponent({ data }: { data: Promise<string> }) {
  const message = await data;
  return <p><strong>Yavaş veri:</strong> {message}</p>;
}
`;


  return (
    <div>
      <h2>❌ defer()</h2>
      <p>
        React 19 ile gelen <code>defer()</code> fonksiyonu, hızlı gelen veriyi
        hemen, yavaş gelen veriyi ise sonradan göstermemizi sağlar. Bu sayede
        kullanıcıya daha hızlı bir içerik deneyimi sunabiliriz.
      </p>
      <div>eski hali</div>
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
      <span>yeni hali:</span>
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
        <code>{code3}</code>
      </pre>
    </div>
  );
}
