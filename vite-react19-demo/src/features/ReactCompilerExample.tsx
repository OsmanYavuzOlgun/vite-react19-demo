import React, { useState, useRef, useEffect } from "react";

export default function ReactCompilerExample() {
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const code = `const doubled = useMemo(() => numbers.map(n => n * 2), [numbers]);`;
  const code2 = `const doubled = numbers.map((n) => n * 2);`;
  const code3 = `const inputRef2 = useRef(null);

    useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [count]);
  `;
  const code4 = `<input ref={inputRef2} placeholder="Bu input otomatik focuslanır" />`;

  // Normalde useMemo ile yapılırdı:
  const doubled = numbers.map((n) => n * 2); // React Compiler bunu optimize edecek (React 19)
  // --> eski hali const doubled = useMemo(() => numbers.map(n => n * 2), [numbers]);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (inputRef2.current) {
      inputRef2.current.setAttribute("value", "2");
    }
  }, [count]);

  return (
    <div>
      <h2>✅ React Compiler & forwardRef</h2>
      <p>
        React 19 ile gelen <strong>React Compiler</strong> sayesinde, bileşen
        içindeki sabit hesaplamalar (örneğin <code>map</code>) artık otomatik
        olarak optimize edilir. <code>useMemo</code> kullanmamıza gerek kalmaz.
      </p>
      <p>
        React Compiler:
        <br />
        - Fonksiyonunun saf olduğunu,
        <br /> - Hangi prop/state'e bağlı olduğunu,
        <br /> - Değişmediği sürece yeniden çalıştırılmasına gerek olmadığını
        <strong> statik analiz</strong> ile anlıyor ve useMemo gibi
        optimizasyonları kendisi ekliyor.
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
      <button onClick={() => setNumbers((prev) => [...prev, prev.length + 1])}>
        Add Number
      </button>
      <p>Original: {numbers.join(", ")}</p>
      <p>Doubled: {doubled.join(", ")}</p>
      <hr />
      <p>
        Ayrıca, <strong>forwardRef</strong> gibi ref ile çalışma özellikleri de
        daha sorunsuz ve stabil hale geldi.
      </p>

      <input ref={inputRef} placeholder="Bu input otomatik focuslanır" />
      <input ref={inputRef2} placeholder="Bu input otomatik focuslanır" />

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
        <code>{code3}</code>
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
        <code>{code4}</code>
      </pre>
      <br />
    </div>
  );
}
