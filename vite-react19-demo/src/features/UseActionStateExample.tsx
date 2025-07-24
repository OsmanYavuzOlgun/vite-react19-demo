import React from "react";
import { useActionState } from "react";

// Simüle edilmiş async backend fonksiyonu
async function sendMessage(_prev: string | null, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const msg = formData.get("message")?.toString();
  return msg || "Nothing entered.";
}

export default function UseActionStateExample() {
  const [state, formAction, isPending] = useActionState(sendMessage, null);

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
<p>Server returned: {response}</p>`;

  const code2 = `const [state, formAction, isPending] = useActionState(async (_prev, formData) => {
  const res = await fetch("/api", {
    method: "POST",
    body: formData,
  });
  return await res.text();
}, null);

<form action={formAction}>
  <input name="message" placeholder="Type here..." />
  <button type="submit" disabled={isPending}>
    {isPending ? "Sending..." : "Send"}
  </button>
</form>
<p>Server returned: {state}</p>`;

  return (
    <div>
      <h2>✅ useActionState (React 19)</h2>
      <p style={{ fontWeight: 600, marginBottom: 20 }}>
        <code>useActionState</code>, <code>useFormState</code>'e benzer ama daha
        gelişmiş bir yapıdır. <br />
        Form gönderimini, sonucu ve loading durumunu aynı anda kontrol etmeyi
        kolaylaştırır. Ayrıca daha büyük formlarda daha iyi performans sağlar.
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

      <div>yeni hali (useActionState):</div>
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

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          border: "2px solid #068b4d",
          borderRadius: "8px",
          background: "#111",
        }}
      >
        <h3>Live Form</h3>
        <form action={formAction}>
          <input
            type="text"
            name="message"
            placeholder="Type your message"
            style={{ marginRight: "0.5rem" }}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>
        <p>Server returned: {state}</p>
      </div>
    </div>
  );
}
