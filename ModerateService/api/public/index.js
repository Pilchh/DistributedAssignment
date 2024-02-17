let isPaused = false;

const updateTypes = async () => {
  const typeDropdown = document.getElementById("jokeType");
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
  const jokeElement = document.getElementById("joke");
  const punchlineElement = document.getElementById("punchline");
  const typeDropdown = document.getElementById("jokeType");
  const typeElement = document.getElementById("type");
  const pElement = document.getElementById("status");

  let data = {
    joke: jokeElement.value,
    punchline: punchlineElement.value,
    type: "",
  };

  if (typeElement === null) {
    data.type = typeDropdown.value;
  } else {
    data.type = typeElement.value;
  }

  await fetch("add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      if (typeElement !== null) {
        typeElement.remove();
        document.getElementById("type-label").remove();
      }

      jokeElement.value = "";
      punchlineElement.value = "";
      pElement.innerText = "Joke added!";
      const jokeStatus = document.getElementById("jokeStatus");

      jokeStatus.innerText = "Waiting for Joke...";
      isPaused = false;
    })
    .catch((err) => console.log(err));
};

const getNext = () => {
  fetch("next").then((data) =>
    data.json().then((joke) => {
      if (joke) {
        isPaused = true;
        const jokeElement = document.getElementById("joke");
        const punchlineElement = document.getElementById("punchline");
        const typeDropdown = document.getElementById("jokeType");
        const jokeStatus = document.getElementById("jokeStatus");

        jokeStatus.innerText = "Joke Found";

        jokeElement.value = joke.joke || "";
        punchlineElement.value = joke.punchline || "";
        typeDropdown.value = joke.type || "";
      }
    }),
  );
};

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
  const jokeElement = document.getElementById("joke");
  const punchlineElement = document.getElementById("punchline");
  const typeElement = document.getElementById("type");
  const pElement = document.getElementById("status");

  jokeElement.value = "";
  punchlineElement.value = "";
  typeElement.value = "";
  pElement.innerText = "Joke deleted.";

  const jokeStatus = document.getElementById("jokeStatus");

  jokeStatus.innerText = "Waiting for Joke...";

  isPaused = false;
};

window.onload = function () {
  updateTypes();
  setInterval(() => {
    if (!isPaused) {
      getNext();
    }
  }, 2000);
};
