import React, { useState, useTransition } from "react";

// Sahte bir API işlemi simülasyonu
const updateQuantity = (newQuantity: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newQuantity);
    }, 1000); // 1 saniye gecikmeli
  });
};

const UseTransitionExample = () => {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const updateQuantityAction = async (newQuantity: number) => {
    // Arka planda async işlemi başlat
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);

      // State güncellemesini ikinci kez transition ile sarmala
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  const code4 = `const [quantity, setQuantity] = useState(1);
const [isPending, startTransition] = useTransition();

const updateQuantityAction = async (newQuantity) => {
  startTransition(async () => {
    const savedQuantity = await updateQuantity(newQuantity);

    startTransition(() => {
      setQuantity(savedQuantity);
    });
  });
};`;

  return (
    <div>
      <h2>✅ useTransition Example</h2>
      <div style={{ marginBottom: 20, fontWeight: 600 }}>
        useTransition, kullanıcı arabirimini engellemeden, yani takılmadan,
        tepki vermeyi geciktirmeden, daha az öncelikli işleri arka planda
        yapmamızı sağlayan bir React Hook’tur.
        <hr />
        const [isPending, startTransition] = useTransition();
        <br />
        <br />
        isPending → Şu anda bekleyen (arka planda yapılan) bir geçiş var mı?
        (loading)
        <br />
        startTransition(fn) → React’e bu işin önceliksiz olduğunu bildirir.
        <hr />
        Çok büyük bir listeyi filtrelerken, ağır UI ve grafik işlerinde, sayfa
        içerisinde ağır input işlemlerinde kullanılır. Normal loading işlerine
        göre input çok daha hızlı tepki verir ve düşük öncelikli işi önceden
        bitirip yüklü olan işi daha hızlı yapar. Normal useState içerisinde
        bulunan loading tarafında iki işte aynı anda yapıldığı için daha yavaş
        olur ve kasma meydana gelir.
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

      <div style={{ marginTop: 24 }}>
        <h3>🛒 Checkout</h3>
        <button onClick={() => updateQuantityAction(quantity + 1)}>
          Add One
        </button>
        <hr />
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        {isPending && (
          <p style={{ color: "orange" }}>⏳ Updating quantity...</p>
        )}
      </div>
    </div>
  );
};

export default UseTransitionExample;
