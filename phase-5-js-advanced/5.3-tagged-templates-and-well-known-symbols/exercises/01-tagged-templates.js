// Exercise 1: Tagged Template Literals
// --------------------------------------

// 1a. Build an html`` tag that HTML-escapes interpolated values
// to prevent XSS.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function html(strings, ...values) {
  // YOUR CODE HERE: join strings and HTML-escaped values
}

// 1b. Build a sql`` tag that safely parameterizes values
// Returns { query: string, params: any[] }
// Replaces interpolated values with $1, $2, ... placeholders
function sql(strings, ...values) {
  // YOUR CODE HERE
}

// 1c. Build a highlight`` tag that wraps interpolated values in <mark> tags
function highlight(strings, ...values) {
  // YOUR CODE HERE
}

// 1d. Build a dedent`` tag that removes common leading whitespace
// (useful for multiline template strings in indented code)
function dedent(strings, ...values) {
  const raw = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");
  const lines = raw.split("\n").filter((_, i, arr) => i > 0 || arr.length > 1);
  const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[1].length));
  return lines.map(l => l.slice(indent)).join("\n").trim();
}

// Tests
const userInput = '<script>alert("xss")</script>';
const name = "Alice";
console.log(html`<p>Hello ${name}, you said: ${userInput}</p>`);
// <p>Hello Alice, you said: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</p>

const userId = 42;
const status = "active";
const query = sql`SELECT * FROM users WHERE id = ${userId} AND status = ${status}`;
console.log(query.query);  // "SELECT * FROM users WHERE id = $1 AND status = $2"
console.log(query.params); // [42, "active"]

const term = "JavaScript";
console.log(highlight`Learn ${term} and ${term} today!`);
// "Learn <mark>JavaScript</mark> and <mark>JavaScript</mark> today!"

const block = dedent`
    Hello
    World
    Goodbye
`;
console.log(block);
// Hello
// World
// Goodbye
