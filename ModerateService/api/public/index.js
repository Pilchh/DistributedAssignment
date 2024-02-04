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

  await fetch("/mod/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => (pElement.innerText = "Joke added!"))
    .catch((err) => console.log(err));
};
