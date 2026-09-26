type Locale = "en" | "gu";

const copy = {
  en: {
    title: "Page not found",
    body: "The page may have moved or the link may be incorrect.",
    home: "Go to home",
    contact: "Contact GarbhaSetu",
  },
  gu: {
    title: "પૃષ્ઠ મળ્યું નથી",
    body: "પૃષ્ઠનું સ્થાન બદલાયું હોઈ શકે છે અથવા લિંક ખોટી હોઈ શકે છે.",
    home: "મુખ્ય પૃષ્ઠ પર જાઓ",
    contact: "ગર્ભસેતુનો સંપર્ક કરો",
  },
} as const;

export function notFoundResponse(locale: Locale) {
  const text = copy[locale];
  const prefix = locale === "en" ? "/en" : "";
  const html = `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>${text.title} · GarbhaSetu</title>
  <style>
    @font-face{font-family:GarbhaGujarati;src:url('/fonts/noto-sans-gujarati.woff2') format('woff2');font-weight:100 900;font-display:swap}
    *{box-sizing:border-box}body{margin:0;background:#f6f0e4;color:#2a211c;font-family:GarbhaGujarati,Arial,sans-serif}
    main{min-height:100vh;display:grid;place-items:center;padding:2rem;text-align:center;background:radial-gradient(ellipse at top,#eadcc6,transparent 55%)}
    section{max-width:38rem}.code{color:#8d5414;letter-spacing:.16em}h1{margin:.75rem 0 0;color:#541f2c;font-family:Georgia,serif;font-size:clamp(2.5rem,8vw,4rem);font-weight:500}
    p{margin:1rem auto 0;max-width:32rem;color:#5c4d43;line-height:1.75}.actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;margin-top:2rem}
    a{border:1px solid #7a3040;border-radius:999px;padding:.7rem 1.1rem;color:#7a3040;text-decoration:none}a:first-child{background:#7a3040;color:#f6f0e4}
    a:focus-visible{outline:3px solid #8d5414;outline-offset:3px}
  </style>
</head>
<body><main><section><div class="code">404</div><h1>${text.title}</h1><p>${text.body}</p><div class="actions"><a href="${prefix || "/"}">${text.home}</a><a href="${prefix}/contact">${text.contact}</a></div></section></main></body>
</html>`;

  return new Response(html, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
