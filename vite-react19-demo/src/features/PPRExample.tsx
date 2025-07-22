export default function UseComponent() {
  const code = `import { Suspense } from "react";
import { UserGreeting } from "./UserGreeting";

export default function Home() {
  return (
    <div>
      <h1>Partial Pre-rendering (PPR)</h1>
      <p>Bu metin statik olarak render edilir.</p>

      <Suspense fallback={<p>Yükleniyor...</p>}>
        <UserGreeting />
      </Suspense>
    </div>
  );
}`;

  const code2 = `// app/UserGreeting.tsx
export async function UserGreeting() {
  const user = await getUserFromDB(); // Simülasyon
  return <p>Hoş geldin, {user.name}!</p>;
}

async function getUserFromDB() {
  await new Promise((r) => setTimeout(r, 1000)); // Yavaş sorgu gibi
  return { name: "Yavuz" };
}
`;
  return (
    <div>
      <h2>❌ Partial Pre-rendering</h2>
      <p>
        Partial Pre-rendering (PPR), hem statik (SSG) hem de dinamik (RSC)
        içeriği aynı sayfada birleştirebilmeyi sağlar. Bu sayede: Sayfa ilk
        açıldığında hızlıca statik içerik görünür. Geri kalan dinamik içerik
        (örneğin kullanıcıya özel bilgiler) arka planda yüklenir. Bu,
        performansı artırır ve kullanıcı deneyimini geliştirir.
      </p>
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

async function fetchMessage() {
  await new Promise((r) => setTimeout(r, 1000));
  return "Merhaba bu mesaj <use> ile geldi!";
}
