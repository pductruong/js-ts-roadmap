async function apiRequest(url) {
  throw new Error(`Network timeout connecting to ${url}`);
}

async function fetchUser(id) {
  try {
    return await apiRequest(`/api/users/${id}`);
  } catch (err) {
    throw new Error(`Failed to fetch user ${id}`, { cause: err });
  }
}

async function fetchUserProfile(id) {
  try {
    return await fetchUser(id);
  } catch (err) {
    throw new Error(`Failed to load user profile for id ${id}`, { cause: err });
  }
}

function printErrorChain(err, depth = 0) {
  console.log(`${"  ".repeat(depth)}Error: ${err.message}`);
  if (err.cause) printErrorChain(err.cause, depth + 1);
}

async function fetchFromMirrors(mirrors) {
  const errors = [];
  for (const url of mirrors) {
    try { return await fetchMirror(url); }
    catch (err) { errors.push(err); }
  }
  throw new AggregateError(errors, "All mirrors failed");
}

async function fetchMirror(url) {
  if (url.includes("bad")) throw new Error(`Mirror ${url} unreachable`);
  return `data from ${url}`;
}

fetchUserProfile(1).catch(err => printErrorChain(err));
fetchFromMirrors(["bad-mirror-1", "bad-mirror-2"]).catch(err => {
  console.log(err instanceof AggregateError);
  console.log(err.message);
  console.log(err.errors.length);
});
fetchFromMirrors(["bad-mirror-1", "good-mirror"]).then(data => console.log(data));
