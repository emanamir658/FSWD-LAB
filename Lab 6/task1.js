

async function fetchUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    // unsuccessful fetching (e.g. 404) -> error
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();

    // check the user object is valid
    if (!user || !user.id || !user.name || !user.email) {
      throw new Error("Invalid user object");
    }

    return user; // successful fetching -> valid user object
  } catch (error) {
    throw new Error("Error: " + error.message); // unsuccessful fetching -> error
  }
}

// Test: success
fetchUser(1)
  .then((user) => console.log("Task 1 Success:", user))
  .catch((err) => console.log("Task 1", err.message));

// Test: failure
fetchUser(9999)
  .then((user) => console.log("Task 1 Success:", user))
  .catch((err) => console.log("Task 1", err.message));