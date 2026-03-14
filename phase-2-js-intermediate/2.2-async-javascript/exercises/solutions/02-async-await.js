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

async function loadFirstPost(userId) {
  const user = await fetchUser(userId);
  const post = await fetchPost(user.posts[0]);
  console.log(post.title);
}

async function loadUserWithPosts(userId) {
  const user = await fetchUser(userId);
  const posts = await Promise.all(user.posts.map(fetchPost));
  return { user, posts };
}

async function safeFetchUser(id) {
  try {
    return await fetchUser(id);
  } catch {
    return null;
  }
}

async function fetchSequentially(ids) {
  const results = [];
  for (const id of ids) {
    results.push(await fetchUser(id));
  }
  return results;
}

(async () => {
  await loadFirstPost(1);
  const result = await loadUserWithPosts(2);
  console.log(result.user.name, result.posts.map(p => p.title));
  const user = await safeFetchUser(-1);
  console.log("Safe fetch result:", user);
  const users = await fetchSequentially([1, 2, 3]);
  console.log(users.map(u => u.name));
})();
