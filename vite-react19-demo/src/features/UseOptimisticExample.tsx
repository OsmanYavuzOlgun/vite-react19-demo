import React, { useOptimistic, useState, useRef, startTransition } from "react";
import type { FormEvent } from "react";

async function deliverMessage(msg: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1500));
  if (msg.toLowerCase().includes("forbidden")) {
    throw new Error("This message is not allowed.");
  }
  return msg;
}

type Message = {
  text: string;
  sending?: boolean;
};

function Thread({
  messages,
  sendMessageAction,
}: {
  messages: Message[];
  sendMessageAction: (formData: FormData) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  function formAction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(formRef.current!);
    const message = formData.get("message")?.toString();
    if (!message) return;

    addOptimisticMessage(message);
    formRef.current?.reset();

    startTransition(async () => {
      await sendMessageAction(formData);
    });
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, newMessage) => [
    { text: newMessage, sending: true },
    ...state,
  ]);

  return (
    <>
      <form onSubmit={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Type something..." />
        <button type="submit">Send</button>
      </form>

      <div style={{ marginTop: 20 }}>
        {optimisticMessages.map((message, index) => (
          <div key={index}>
            {message.text}
            {message.sending && <small> (Sending...)</small>}
          </div>
        ))}
      </div>
    </>
  );
}

export default function UseOptimisticExample() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello", sending: false },
  ]);
  const code4 = `const [optimisticState, addOptimistic] = useOptimistic(
    state,
    // updateFn
    (currentState, optimisticValue) => {
      // merge and return new state
      // with optimistic value
    }
  );
`;
  const [error, setError] = useState<string | null>(null);

  async function sendMessageAction(formData: FormData) {
    const message = formData.get("message") as string;

    try {
      const sentMessage = await deliverMessage(message);
      startTransition(() => {
        setMessages((prev) => [{ text: sentMessage }, ...prev]);
      });
      setError("");
    } catch {
      startTransition(() => {
        setMessages((prev) =>
          prev.filter((m) => m.text !== message && !m.sending)
        );
      });

      setError(`❌ Message failed: "${message}" is not allowed.`);
    }
  }

  return (
    <div>
      <h2>✅ useOptimistic</h2>
      <div style={{ marginBottom: 20, fontWeight: 600 }}>
        useOptimistic, async (örneğin API) işlemi devam ederken kullanıcıya
        farklı bir geçici durum göstermenizi sağlayan bir React hook'udur.
        Gerçek state’i alır ve senin belirttiğin bir fonksiyona göre, işlem
        tamamlanmadan önce geçici (optimistic) bir versiyonunu üretir. Yani
        kullanıcı bir şey yaptığında sonucu beklemeden “olmuş gibi” gösterirsin.
        İşlem tamamlanınca gerçek sonuçla değiştirilir.
      </div>
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
        <code>{code4}</code>
      </pre>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <Thread messages={messages} sendMessageAction={sendMessageAction} />
    </div>
  );
}

// useOptimistic, async (örneğin API) işlemi devam ederken kullanıcıya farklı bir geçici durum göstermenizi sağlayan bir React hook'udur.
// Gerçek state’i alır ve senin belirttiğin bir fonksiyona göre, işlem tamamlanmadan önce geçici (optimistic) bir versiyonunu üretir.
// Yani kullanıcı bir şey yaptığında sonucu beklemeden “olmuş gibi” gösterirsin. İşlem tamamlanınca gerçek sonuçla değiştirilir.

//--> her hangi bir inputa, inputa tanımladığmız fonkisyon kontrolünden önce gidip yazdığımız texti veya istediğimiz şeyi gösterebiliyoruz ve
// ana amaç ise ui tarafında user'a daha da bilgi verebilmek adına yapılıyor, eğer istedğimiz kurala göre yanlış ise buna göre bir error mesajı gösterebiliriz
