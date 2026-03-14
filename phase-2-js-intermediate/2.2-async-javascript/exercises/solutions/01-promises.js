function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("Invalid user id"));
      else resolve({ id, name: `User${id}`, age: 20 + id });
    }, 100);
  });
}

// 1a.
fetchUser(1).then(user => console.log(user.name));

// 1b.
fetchUser(-1).catch(err => console.log("Error:", err.message));

// 1c.
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .then(users => console.log(users.map(u => u.name)));

// 1d.
Promise.race([fetchUser(1), fetchUser(2)])
  .then(user => console.log("First:", user.name));

// 1e.
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([promise, timeout]);
}

withTimeout(delay(50), 200).then(() => console.log("Fast: OK"));
withTimeout(delay(500), 100).catch(err => console.log("Slow:", err.message));
