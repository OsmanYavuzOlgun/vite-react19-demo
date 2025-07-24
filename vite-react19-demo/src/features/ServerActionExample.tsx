import React from "react";

// ("use client");

// ✅ Server Action function (runs on the server)
export async function getUserGreeting(formData: FormData) {
  "use server";
  const name = formData.get("name");

  // Fake backend fetch
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();

  return `Merhaba ${name || "kullanıcı"}, sunucudan gelen kullanıcı adı: ${
    user.name
  }`;
}

export default function ServerActionNext() {
  const serverActionCode = `'use server';

export async function getUserGreeting(formData: FormData) {
  const name = formData.get('name');
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await res.json();
  return \`Merhaba \${name || 'kullanıcı'}, sunucudan gelen kullanıcı adı: \${user.name}\`;
}

<form action={getUserGreeting}>
  <input name="name" />
  <button type="submit">Send</button>
</form>
  `;

  const oldWayCode = `async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');

  const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await res.json();

  alert(
    \`Merhaba \${name || 'kullanıcı'}, sunucudan gelen kullanıcı adı: \${user.name}\`
  );
}

<form onSubmit={handleSubmit}>
  <input name="name" />
  <button type="submit">Send</button>
</form>`;

  return (
    <div>
      <h2>Server Actions</h2>
      <ul>
        <li>
          <strong>Server Actions</strong>, form verisini doğrudan sunucu
          fonksiyonlarına göndermeye yarar.
        </li>
        <li>
          <code>'use server'</code> etiketiyle işaretlenmiş fonksiyonlar sadece{" "}
          <b>sunucuda</b> çalışır.
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
          sağlar. Normalde bir formdan veri göndermek istediğinde fetch gibi bir
          API çağrısı yaparsın ve bu veriyi bir API endpoint’ine (örneğin
          /api/save) gönderirsin. Burada ise ekstra bir endpoint oluşturmana
          gerek yok. form içinde action={"myServerFunction"} diyerek veriyi
          doğrudan server function'a gönderebiliyorsun. Klasik POST kullanımında
          ise: Form verisini toplarsın. fetch ile bir endpoint’e gönderirsin.
          Backend tarafında bu endpoint’i oluşturman gerekir. Geri dönen veriyi
          .json() ile işler, state’e yazarsın. Server Actions’da: fetch
          yazmazsın. JSON.stringify gerekmez. Headers ayarlamakla uğraşmazsın.
          useFormState ya da useActionState ile kolayca loading ve response
          durumunu kontrol edebilirsin. En önemlisi: Server Actions sayesinde
          React artık backend'e veri göndermeyi ve işlemeyi kendi diliyle native
          destekliyor. Bu, kodu basitleştiriyor ve mantıksal akışı daha net hale
          getiriyor.
        </li>
      </ul>
      <h3>eski hali</h3>
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
        <code>{oldWayCode}</code>
      </pre>

      <h3>yeni hali</h3>
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
        <code>{serverActionCode}</code>
      </pre>
    </div>
  );
}
