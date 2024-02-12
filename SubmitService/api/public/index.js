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
    await fetch("http://20.77.67.244/joke/types/").then((result) => {
      if (result.status === 200 || result.status === 304) {
        result.json().then((result) => {
          typeDropdown.innerHTML = "";
          result.forEach((type) => {
            let newType = new Option(type.type, type.type_id);
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
  const typeElement = document.getElementById("type");
  const pElement = document.getElementById("status");

  let data = {
    joke: jokeElement.value,
    punchline: punchlineElement.value,
    type: typeElement.value,
  };

  await fetch("submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => (pElement.innerText = "Joke submitted!"))
    .catch((err) => console.log(err));
};
