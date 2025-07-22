export default function UseComponent() {
  const code = `
    export default function UseComponent() {
    const message = fetchMessage();

    return (
    <div>
        <h2><use></h2>
        <p>
        Mesaj: <use value={message} fallback={<em>Yükleniyor...</em>} />
        </p>
    </div>
    );

    async function fetchMessage() {
        await new Promise((r) => setTimeout(r, 2000));
        return "Merhaba bu mesaj <use> ile geldi!";
    }
}`;

  const code2 = `
 import React, { useEffect, useState } from "react";
import { fetchMessage } from "./fetchMessage";

export default function UseComponentOld() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchMessage().then((msg) => {
      if (isMounted) {
        setMessage(msg);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2>🕰️ JSX &lt;use&gt; Yokken</h2>
      <p>{loading ? <em>Yükleniyor...</em> : message}</p>
    </div>
  );
}
`;
  return (
    <div>
      <h2>❌ JSX &lt;use&gt;</h2>
      <p>
        React 19 ile gelen <use></use> elementi, bir Promise (veya async değer)
        tamamlanana kadar otomatik olarak bir “loading” fallback göstermenizi
        sağlar.
      </p>
      <span> use kullanarak:</span>
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
      <span> eski hali:</span>
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
