
// Async operation 1: fetch a user
async function getUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
}

// Async operation 2: fetch a post
async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
}

// Validation functions
const isValidUser = (u) => u && u.id && u.name && u.email;
const isValidPost = (p) => p && p.id && p.title && p.body;

// Main promise = the promise returned by Promise.all
const mainPromise = Promise.all([getUser(1), getPost(1)]).then(([user, post]) => {
  if (isValidUser(user) && isValidPost(post)) {
    return { user, post }; // accept the main promise
  }
  throw new Error("Fetched details are not valid"); // reject the main promise
});

mainPromise
  .then((data) => console.log("Task 2 Accepted:", data))
  .catch((err) => console.log("Task 2 Rejected:", err.message));