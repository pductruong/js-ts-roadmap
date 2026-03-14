function escapeHtml(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

function html(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (i < values.length ? escapeHtml(values[i]) : ""), "");
}

function sql(strings, ...values) {
  const params = [];
  const query = strings.reduce((acc, str, i) => {
    if (i < values.length) { params.push(values[i]); return acc + str + `$${params.length}`; }
    return acc + str;
  }, "");
  return { query, params };
}

function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (i < values.length ? `<mark>${values[i]}</mark>` : ""), "");
}

function dedent(strings, ...values) {
  const raw = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");
  const lines = raw.split("\n").filter((_, i, arr) => i > 0 || arr.length > 1);
  const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[1].length));
  return lines.map(l => l.slice(indent)).join("\n").trim();
}

const userInput = '<script>alert("xss")</script>';
console.log(html`<p>Hello ${"Alice"}, you said: ${userInput}</p>`);
const q = sql`SELECT * FROM users WHERE id = ${42} AND status = ${"active"}`;
console.log(q.query, q.params);
console.log(highlight`Learn ${"JavaScript"} and ${"JavaScript"} today!`);
console.log(dedent`
    Hello
    World
    Goodbye
`);
