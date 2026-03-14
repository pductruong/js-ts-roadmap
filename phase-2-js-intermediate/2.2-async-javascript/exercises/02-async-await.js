// Exercise 2: async / await
// --------------------------
// Run with: node 02-async-await.js

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("Invalid user id"));
      else resolve({ id, name: `User${id}`, posts: [id * 10, id * 10 + 1] });
    }, 50);
  });
}

function fetchPost(postId) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: postId, title: `Post ${postId}` }), 50);
  });
}

// 2a. Rewrite this promise chain using async/await
// fetchUser(1).then(user => fetchPost(user.posts[0])).then(post => console.log(post.title));
async function loadFirstPost(userId) {
  // YOUR CODE HERE
}

// 2b. Fetch a user and ALL their posts in parallel (not sequentially)
async function loadUserWithPosts(userId) {
  // Hint: get user first, then fetch all posts using Promise.all
  // Return { user, posts }
  // YOUR CODE HERE
}

// 2c. Try to fetch user with id=-1. Handle the error gracefully.
async function safeFetchUser(id) {
  // Return the user or null on error
  // YOUR CODE HERE
}

// 2d. Fetch users 1, 2, 3 sequentially (one after the other) using a loop
async function fetchSequentially(ids) {
  // Return an array of users
  // YOUR CODE HERE
}

// Run tests
(async () => {
  await loadFirstPost(1);       // logs "Post 10"

  const result = await loadUserWithPosts(2);
  console.log(result.user.name, result.posts.map(p => p.title));

  const user = await safeFetchUser(-1);
  console.log("Safe fetch result:", user); // null

  const users = await fetchSequentially([1, 2, 3]);
  console.log(users.map(u => u.name)); // ["User1", "User2", "User3"]
})();
