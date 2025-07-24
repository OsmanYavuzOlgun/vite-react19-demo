import React, { useState } from "react";
import { useFormState } from "react-dom";

export default function UseFormState() {
  const [state, formAction] = useFormState(sendMessage, null);

  const [legacyMessage, setLegacyMessage] = useState("");
  const [legacyResponse, setLegacyResponse] = useState("");
  const code1 = `const { register, handleSubmit, formState } = useForm();
    const [response, setResponse] = useState("");

    const onSubmit = async (data) => {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.text();
      setResponse(result);
    };

    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <input {...register("email")} placeholder="Email" />
      <button type="submit" disabled={formState.isSubmitting}>Submit</button>
    </form>

    <p>Server returned: {response}</p>

`;

  const code2 = `const [serverResponse, formAction] = useFormState(async (_prev, formData) => {
    const res = await fetch("/api", {
      method: "POST",
      body: formData,
    });
    return await res.text();
  }, null);
  const { register, control } = useForm();
  const { errors, isSubmitting } = useFormState({
    control,
    name: ['username', 'email']
  });
  <form action={formAction}>
    <input {...register("username")} placeholder="Username" />
    {errors.username && <p>{errors.username.message}</p>}

    <input {...register("email")} placeholder="Email" />
    {errors.email && <p>{errors.email.message}</p>}

    <button type="submit" disabled={isSubmitting}>Submit</button>
  </form>
  <p>Server returned: {serverResponse}</p>

`;

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
        Fakat şu an useFormState sayesinde: Formun kendi action attribute'una
        async fonksiyonu bağlayabiliyoruz. Hem form submit işlemi hem de dönen
        sonucu, tek bir hook üzerinden yönetebiliyoruz. Artık useState,
        onSubmit, fetch, setState gibi adımlarla uğraşmaya gerek kalmıyor.
      </p>
      <div>eski hali:</div>
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
        <code>{code1}</code>
      </pre>
      <div>yeni hali:</div>
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
      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        {/* <div
          style={{
            flex: 1,
            border: "2px solid #068b4d",
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
        </div> */}

        <div
          style={{
            flex: 1,
            border: "2px solid #068b4d",
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
