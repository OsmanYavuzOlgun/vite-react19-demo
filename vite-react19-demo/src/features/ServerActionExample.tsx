// 'use client';

// import React from 'react';

// export default function ServerActionNext() {
//   async function saveData(formData: FormData) {
//     'use server';
//     const name = formData.get('name');
//     await new Promise((r) => setTimeout(r, 1000));
//     return `Hello, ${name}`;
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>✅ Server Actions in Next.js (Tek Dosyada)</h2>

//       <form action={saveData}>
//         <input name="name" placeholder="Type your name" />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

import React from "react";

export default function ServerActionNext() {
  const code = `
'use server';

export async function saveData(formData: FormData) { 
  const name = formData.get('name');
  return \`Hello, \${name}\`;
}

export default function UseOptimisticExample() {
  return (
    <form action={saveData}>
      <input name="name" />
      <button type="submit">Send</button>
    </form>
  );
}
  `;

  return (
    <div>
      <h2>❌ Server Action</h2>
      <section>
        <ul>
          <li>
            <strong>Server Actions</strong>, form verisini doğrudan sunucu
            fonksiyonlarına göndermeye yarar.
          </li>
          <li>
            <code>'use server'</code> etiketiyle işaretlenmiş fonksiyonlar
            sadece <b>sunucuda</b> çalışır.
          </li>
          <li>
            <code>&lt;form action={"serverFn"}&gt;</code> şeklinde yazıldığında,
            form gönderimi doğrudan bu fonksiyona yapılır.
          </li>
          <li>
            <strong>fetch</strong>, <strong>onSubmit</strong>,
            <strong>API route</strong> gibi şeylere gerek kalmaz.
          </li>
          <li>Next.js App Router ortamında çalışır.</li>
          <li>
            Server Actions, form gönderimini doğrudan sunucuya yönlendirmeni
            sağlar. Normalde bir formdan veri göndermek istediğinde fetch gibi
            bir API çağrısı yaparsın ve bu veriyi bir API endpoint’ine (örneğin
            /api/save) gönderirsin. Burada ise ekstra bir endpoint oluşturmana
            gerek yok. form içinde action={"myServerFunction"} diyerek veriyi
            doğrudan server function'a gönderebiliyorsun. Klasik POST
            kullanımında ise: Form verisini toplarsın. fetch ile bir endpoint’e
            gönderirsin. Backend tarafında bu endpoint’i oluşturman gerekir.
            Geri dönen veriyi .json() ile işler, state’e yazarsın. Server
            Actions’da: fetch yazmazsın. JSON.stringify gerekmez. Headers
            ayarlamakla uğraşmazsın. useFormState ya da useActionState ile
            kolayca loading ve response durumunu kontrol edebilirsin. En
            önemlisi: Server Actions sayesinde React artık backend'e veri
            göndermeyi ve işlemeyi kendi diliyle native destekliyor. Bu, kodu
            basitleştiriyor ve mantıksal akışı daha net hale getiriyor.
          </li>
        </ul>
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
        <p>
          <strong>💡</strong> Bileşen <code>'use client'</code> ile işaretlenmiş
          olsa bile, içindeki <code>'use server'</code> fonksiyon ayrı olarak
          sunucuda çalışır.
        </p>
      </section>
    </div>
  );
}
