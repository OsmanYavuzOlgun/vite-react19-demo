import React, { useState } from "react";
import { useFormState } from "react-dom";

export default function UseFormState() {
  const [state, formAction] = useFormState(sendMessage, null);

  const [legacyMessage, setLegacyMessage] = useState("");
  const [legacyResponse, setLegacyResponse] = useState("");

  const handleLegacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fakeApiCall(legacyMessage);
    setLegacyResponse(res);
    setLegacyMessage("");
  };

  return (
    <div>
      <h2>✅ useFormState example</h2>
      <p style={{ fontWeight: 600, marginBottom: 20 }}>
        React 19 öncesinde form state durumu daha complex bir durumdaydı:
        <br />
        <br />
        1- useState ile form verisini ve sonucu tutardık,
        <br />
        2 - on submit ile datayı toplar gerekli fetch işlemi yapılırdı,
        <br />3 - ve son olarak bunu state'e setleyip önyüz'de gösterirdik.
        Fakat şu an useFormState sayesinde:
        Formun kendi action attribute'una async fonksiyonu bağlayabiliyoruz. Hem form
        submit işlemi hem de dönen sonucu, tek bir hook üzerinden
        yönetebiliyoruz. Artık useState, onSubmit, fetch, setState gibi
        adımlarla uğraşmaya gerek kalmıyor.
      </p>

      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        <div
          style={{
            flex: 1,
            border: "2px solid #00ff88",
            padding: "1rem",
            borderRadius: "8px",
            background: "#111",
          }}
        >
          <h3>🕰️ useState + fetch</h3>
          <form onSubmit={handleLegacySubmit}>
            <input
              value={legacyMessage}
              onChange={(e) => setLegacyMessage(e.target.value)}
              placeholder="Type here..."
              style={{ marginRight: "0.5rem" }}
            />
            <button type="submit">Send</button>
          </form>
          <p>Server returned: {legacyResponse}</p>
        </div>

        <div
          style={{
            flex: 1,
            border: "2px solid #00ff88",
            padding: "1rem",
            borderRadius: "8px",
            background: "#111",
          }}
        >
          <h3>⚡ useFormState (React 19)</h3>
          <form action={formAction}>
            <input
              name="message"
              placeholder="Type here..."
              style={{ marginRight: "0.5rem" }}
            />
            <button type="submit">Send</button>
          </form>
          <p>Server returned: {state}</p>
        </div>
      </div>
    </div>
  );
}

async function sendMessage(_prev: string | null, formData: FormData) {
  await new Promise((r) => setTimeout(r, 1));
  return formData.get("message")?.toString() || "Nothing entered.";
}

async function fakeApiCall(message: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1));
  return message;
}
