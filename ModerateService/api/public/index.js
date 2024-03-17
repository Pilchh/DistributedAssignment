let isPaused = false;

/*
 * Function uses backup types by default
 * and the uses jokes API if it can be
 * called
 */
const updateTypes = async () => {
  const typeDropdown = document.getElementById("jokeType");

  // Get types using saved backup
  await fetch("types")
    .then((result) => {
      result.json().then((result) => {
        typeDropdown.innerHTML = "";
        result.forEach((type) => {
          let newType = new Option(type.type, type.type);
          typeDropdown.appendChild(newType);
        });
      });
    })
    .catch((err) => console.log(err));
  try {
    // Try to call jokes types endpoint
    await fetch("https://20.77.67.244/joke/types/").then((result) => {
      if (result.status === 200 || result.status === 304) {
        result.json().then((result) => {
          typeDropdown.innerHTML = "";
          result.forEach((type) => {
            let newType = new Option(type.type, type.type);
            typeDropdown.appendChild(newType);
          });
        });
      }
    });
  } catch (err) {
    console.log("Jokes API is down... using saved types");
  }
};

const submitJoke = async () => {
  // Get elements
  const jokeElement = document.getElementById("joke");
  const punchlineElement = document.getElementById("punchline");
  const typeDropdown = document.getElementById("jokeType");
  const typeElement = document.getElementById("type");
  const pElement = document.getElementById("status");

  // Construct object
  let data = {
    joke: jokeElement.value,
    punchline: punchlineElement.value,
    type: "",
  };

  // If the add new type element is not on the page
  if (typeElement === null) {
    // Use type from dropdown
    data.type = typeDropdown.value;
  } else {
    // Use type from input
    data.type = typeElement.value;
  }

  // Send POST request to add joke
  await fetch("add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      // Remove add new type input element
      if (typeElement !== null) {
        typeElement.remove();
        document.getElementById("type-label").remove();
      }

      // Clear input boxes
      jokeElement.value = "";
      punchlineElement.value = "";

      // Display success message
      pElement.innerText = "Joke added!";
      const jokeStatus = document.getElementById("jokeStatus");

      jokeStatus.innerText = "Waiting for Joke...";

      // Continue polling
      isPaused = false;
    })
    .catch((err) => console.log(err));
};

const getNext = () => {
  fetch("mod").then((data) =>
    data.json().then((joke) => {
      if (joke) {
        // Stop polling
        isPaused = true;

        // Get front-end elements
        const jokeElement = document.getElementById("joke");
        const punchlineElement = document.getElementById("punchline");
        const typeDropdown = document.getElementById("jokeType");
        const jokeStatus = document.getElementById("jokeStatus");

        // Update header
        jokeStatus.innerText = "Joke Found";

        // Display content
        jokeElement.value = joke.joke || "";
        punchlineElement.value = joke.punchline || "";
        typeDropdown.value = joke.type || "";
      }
    }),
  );
};

/*
 * Add the new type input box onto front end
 */
const addTypeInput = () => {
  const container = document.getElementById("inputs");
  let label = document.createElement("label");
  label.innerText = "Create a New Type ";
  label.id = "type-label";
  let input = document.createElement("input");
  input.type = "text";
  input.id = "type";

  container.appendChild(label);
  container.appendChild(input);
};

const deleteJoke = () => {
  // Get elements
  const jokeElement = document.getElementById("joke");
  const punchlineElement = document.getElementById("punchline");
  const typeElement = document.getElementById("type");
  const pElement = document.getElementById("status");

  // Clear elements
  jokeElement.value = "";
  punchlineElement.value = "";
  pElement.innerText = "Joke deleted.";

  if (typeElement !== null) {
    typeElement.value = "";
  }

  const jokeStatus = document.getElementById("jokeStatus");

  jokeStatus.innerText = "Waiting for Joke...";

  // Continue polling
  isPaused = false;
};

window.onload = function () {
  // Load types on page load
  updateTypes();

  // Call getNext every 2 seconds if isPaused is false
  setInterval(() => {
    if (!isPaused) {
      getNext();
    }
  }, 2000);
};
