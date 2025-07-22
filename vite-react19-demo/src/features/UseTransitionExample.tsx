import React, { useState, useTransition } from "react";

const UseTransitionExample = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    startTransition(() => {
      const newList = Array.from(
        { length: 5000 },
        (_, i) => `${value} - item ${i}`
      );
      setList(newList);
    });
  };

  return (
    <div>
      <h2>✅ useTransition Example</h2>
      <div style={{ marginBottom: 20, fontWeight: 600 }}>
        useTransition, kullanıcı arabirimini engellemeden, yani takılmadan,
        tepki vermeyi geciktirmeden, daha az öncelikli işleri arka planda
        yapmamızı sağlayan bir React Hook’tur.
        <br />
        <br />
        isPending → Şu anda bekleyen (arka planda yapılan) bir geçiş var mı?
        <br />
        startTransition(fn) → React’e bu işin önceliksiz olduğunu bildirir.
        <br />
        <br />
        Çok büyük bir listeyi filtrelerken, ağır UI ve grafik işlerinde, sayfa
        içerisinde ağır input işlemlerinde kullanılır. Normal loading işlerine
        göre input çok daha hızlı tepki verir ve düşük öncelikli işi önceden
        bitirip yüklü olan işi daha hızlı yapar. Normal useState içerisinde
        bulunan loading tarafında iki işte aynı anda yapıldığı için daha yavaş
        olur ve kasma meydana gelir.
      </div>
      <input
        value={input}
        onChange={handleChange}
        placeholder="Type to filter..."
      />
      {isPending && <p>Updating list... (low priority)</p>}
      <ul>
        {list.slice(0, 20).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default UseTransitionExample;
