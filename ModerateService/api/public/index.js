let isPaused = false;

const updateTypes = async () => {
  const typeDropdown = document.getElementById("jokeType");
  await fetch("types")
    .then((result) => {
      result.json().then((result) => {
        typeDropdown.innerHTML = "";
        result.forEach((type) => {
          let newType = new Option(type.type, type.type_id);
          typeDropdown.appendChild(newType);
        });
      });
    })
    .catch((err) => console.log(err));
  try {
    await fetch("http://localhost:3000/types").then((result) => {
      result.json().then((result) => {
        typeDropdown.innerHTML = "";
        result.forEach((type) => {
          let newType = new Option(type.type, type.type_id);
          typeDropdown.appendChild(newType);
        });
      });
    });
  } catch (err) {
    console.log("Jokes API is down... using saved types");
  }
};

const submitJoke = async () => {
  const jokeElement = document.getElementById("joke");
  const punchlineElement = document.getElementById("punchline");
  const typeElement = document.getElementById("type");
  const pElement = document.getElementById("status");

  let data = {
    joke: jokeElement.value,
    punchline: punchlineElement.value,
    type: typeElement.value,
  };

  await fetch("add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      pElement.innerText = "Joke added!";
      isPaused = false;
    })
    .catch((err) => console.log(err));
};

const getNext = () => {
  fetch("next").then((data) =>
    data.json().then((joke) => {
      if (joke) {
        console.log(joke);
        isPaused = true;

        const jokeElement = document.getElementById("joke");
        const punchlineElement = document.getElementById("punchline");
        const typeElement = document.getElementById("type");

        jokeElement.value = joke.joke;
        punchlineElement.value = joke.punchline;
        typeElement.value = joke.type;
      }
    }),
  );
};

window.onload = function () {
  setInterval(() => {
    if (!isPaused) {
      getNext();
    }
  }, 2000);
};
