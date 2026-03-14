function* calculatorSession() {
  let total = 0;
  yield "ready";
  while (true) {
    const input = yield total;
    if (input === "reset") total = 0;
    else if (typeof input === "number") total += input;
  }
}

function* resilientIterator(items) {
  for (const item of items) {
    try { yield item; }
    catch (err) { console.log("error:", err.message); }
  }
}

// Override the original to add cleanup on return
const _resilientIterator = resilientIterator;
function* resilientIteratorWithCleanup(items) {
  try { yield* _resilientIterator(items); }
  finally { console.log("cleanup"); }
}

function* range(start, end) { for (let i = start; i <= end; i++) yield i; }

function* multiRange() {
  yield* range(1, 3);
  yield* range(10, 12);
  yield* range(20, 22);
}

function* take(n, iterable) {
  let count = 0;
  for (const item of iterable) {
    if (count++ >= n) break;
    yield item;
  }
}

async function* paginate(fetchPage, startPage = 1) {
  let page = startPage;
  while (true) {
    const { items, hasMore } = await fetchPage(page++);
    yield* items;
    if (!hasMore) break;
  }
}

const calc = calculatorSession();
console.log(calc.next().value);
console.log(calc.next(10).value);
console.log(calc.next(5).value);
console.log(calc.next("reset").value);
console.log(calc.next(7).value);
console.log(calc.return().value);

const iter = resilientIteratorWithCleanup(["a", "b", "c", "d"]);
console.log(iter.next().value);
console.log(iter.throw(new Error("skip")).value);
console.log(iter.next().value);
iter.return();

console.log([...multiRange()]);

function* naturals() { let n = 1; while (true) yield n++; }
console.log([...take(5, naturals())]);

async function mockFetch(page) {
  const allItems = [1,2,3,4,5,6,7,8,9,10];
  const start = (page - 1) * 3;
  return { items: allItems.slice(start, start + 3), hasMore: start + 3 < allItems.length };
}
(async () => {
  const results = [];
  for await (const item of paginate(mockFetch)) results.push(item);
  console.log(results);
})();
