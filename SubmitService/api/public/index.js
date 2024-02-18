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
  const pElement = document.getElementById("status");

  let data = {
    joke: jokeElement.value,
    punchline: punchlineElement.value,
    type: typeDropdown.value,
  };

  await fetch("sub", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      pElement.innerText = "Joke submitted!";
      jokeElement.value = "";
      punchlineElement.value = "";
    })
    .catch((err) => console.log(err));
};

window.onload = function () {
  updateTypes();
};
