import React, { useActionState } from "react";

async function sendMessage(_prev: string | null, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const msg = formData.get("message")?.toString();
  return msg || "Nothing entered.";
}

export default function UseActionStateExample() {
  const [state, formAction, isPending] = useActionState(sendMessage, null);

  return (
    <div>
      <h2>✅ useActionState</h2>
      <p>
        useFormState ile aynı mantıkta çalışan ama useFormState'e göre daha
        gelişmiş olan bir hooktur. Formu sadece bir state ile değil aynı zamanda
        pending kontrolü sağlamaya da yardımcı olur. Bu durum da usability
        açısından kullanıcıya yardımcı olur. Aynı zamanda useFormState'e göre
        daha yüklü formları daha rahat handle edebilir.
      </p>
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
  );
}
