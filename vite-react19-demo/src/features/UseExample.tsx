export default function UseComponent() {
  const code = `
import React, { useEffect, useState } from "react";

export default function UseComponent() {
  const [message, setMessage] = useState(null);
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
      <h2>⏰ useEffect + useState ile</h2>
      <p>{loading ? <em>Yükleniyor...</em> : message}</p>
    </div>
  );

  async function fetchMessage() {
    await new Promise((r) => setTimeout(r, 2000));
    return "Merhaba bu mesaj useEffect ile geldi!";
  }
}`;

  const code2 = `
import { use } from "react";

export default function UseComponent() {
  const message = use(fetchMessage());

  return (
    <div>
      <h2>use() örneği</h2>
      <p>
        Mesaj: {message}
      </p>
    </div>
  );

  async function fetchMessage() {
    await new Promise((r) => setTimeout(r, 2000));
    return "Merhaba bu mesaj use() ile geldi!";
  }
}`;
  return (
    <div>
      <h2>❌ use()</h2>
      <p>
        use() fonksiyonu, React 19 ile gelen ve useEffect + useState ihtiyacını
        ortadan kaldıran yeni bir özellik. Promise dönen async işlemleri
        doğrudan render içinde kullanmamıza olanak tanır. Kod daha sade,
        okunabilir ve senkron gibi yazılabilir hale gelir. Özellikle veri
        bekleme ve gösterme işlemlerini basitleştirir.
      </p>
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
        <code>{code}</code>
      </pre>
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
        <code>{code2}</code>
      </pre>
    </div>
  );
}

async function fetchMessage() {
  await new Promise((r) => setTimeout(r, 1000));
  return "Merhaba bu mesaj <use> ile geldi!";
}
