import React, { useRef } from "react";

export default function RefDomExample() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const code = `
import React, { useRef, forwardRef } from "react";

// Bölüm component'i ref alabilmek için forwardRef ile sarmalanıyor
const TargetSection = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    style={{
      padding: "2rem",
      border: "2px solid #068b4d",
      borderRadius: "8px",
      backgroundColor: "transparent",
    }}
  >
    <h3>🎯 Hedef Bölüm</h3>
    <p>Scroll ile bu alana geldin ve geçici olarak renklendi!</p>
  </div>
));

export default function RefDomExampleOld() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
      sectionRef.current.style.backgroundColor = "#068b4d";
      sectionRef.current.style.transition = "background-color 1s";

      setTimeout(() => {
        sectionRef.current!.style.backgroundColor = "transparent";
      }, 1500);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🕰️ forwardRef ile DOM Etkileşimi (React 18)</h2>
      <p>
        Bu örnekte "forwardRef" kullanılarak alt bileşene ref geçirilir. React
        19 öncesi bu zorunluydu.
      </p>

      <button onClick={handleScroll}>👇 Aşağıya Git & Animasyonu Göster</button>

      <div style={{ height: "800px" }}></div>

      <TargetSection ref={sectionRef} />
    </div>
  );
}`;
  const code2 = `const handleScroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
      sectionRef.current.style.backgroundColor = "#068b4d";
      sectionRef.current.style.transition = "background-color 1s";

      setTimeout(() => {
        sectionRef.current!.style.backgroundColor = "transparent";
      }, 1500);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✅ ref ile DOM Etkileşimi</h2>
      <p>
        Bu örnekte bir butona tıklanıldığında, belirli bir bölüme scroll yapılır
        ve geçici bir animasyon uygulanır.
      </p>

      <button onClick={handleScroll}>👇 Aşağıya Git & Animasyonu Göster</button>

      <div style={{ height: "800px" }}></div>

      <div
        ref={sectionRef}
        style={{
          padding: "2rem",
          border: "2px solid #068b4d",
          borderRadius: "8px",
          backgroundColor: "transparent",
        }}
      >
        <h3>🎯 Hedef Bölüm</h3>
        <p>Scroll ile bu alana geldin ve geçici olarak renklendi!</p>
      </div>
    </div>
  `;
  const handleScroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
      sectionRef.current.style.backgroundColor = "#068b4d";
      sectionRef.current.style.transition = "background-color 1s";

      setTimeout(() => {
        sectionRef.current!.style.backgroundColor = "transparent";
      }, 1500);
    }
  };

  return (
    <div>
      <h2>✅ ref ile DOM Etkileşimi</h2>
      <p>
        Bu örnekte bir butona tıklanıldığında, belirli bir bölüme scroll yapılır
        ve geçici bir animasyon uygulanır.
      </p>
      <button onClick={handleScroll}>👇 Aşağıya Git & Animasyonu Göster</button>
      <div>Eski hali:</div>
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
      <div>Yeni hali:</div>
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
        ref={sectionRef}
        style={{
          padding: "2rem",
          border: "2px solid #068b4d",
          borderRadius: "8px",
          backgroundColor: "transparent",
        }}
      >
        <h3>🎯 hello!</h3>
      </div>
    </div>
  );
}
