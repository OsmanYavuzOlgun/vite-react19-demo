import React, { useState, forwardRef, useRef, useEffect } from "react";

export default function ReactCompilerExample() {
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([1, 2, 3]);

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
        Ayrıca, <strong>forwardRef</strong> gibi ref ile çalışma özellikleri de
        daha sorunsuz ve stabil hale geldi.
      </p>

      <input ref={inputRef} placeholder="Bu input otomatik focuslanır" />
      <input ref={inputRef2} placeholder="Bu input otomatik focuslanır" />

      <br />
      <button onClick={() => setCount((c) => c + 1)}>
        Re-render ({count})
      </button>
      <button onClick={() => setNumbers((prev) => [...prev, prev.length + 1])}>
        Add Number
      </button>
      <p>Original: {numbers.join(", ")}</p>
      <p>Doubled: {doubled.join(", ")}</p>
    </div>
  );
}
