const updateTypes = async () => {
  const typeDropdown = document.getElementById("jokeType");

  await fetch("types").then((result) => {
    result.json().then((result) => {
      typeDropdown.innerHTML = "";
      result.forEach((type) => {
        let newType = new Option(type.type, type.type);
        typeDropdown.appendChild(newType);
      });
    });
  });
};

const getJoke = async () => {
  const typeDropdown = document.getElementById("jokeType");
  const countInput = document.getElementById("jokeCount");
  const jokesContainer = document.getElementById("jokes");

  await fetch(
    "jokes?" +
      new URLSearchParams({
        type: typeDropdown.value,
        count: countInput.value,
      }),
  ).then((result) => {
    result.json().then((jokes) => {
      jokesContainer.innerText = "";
      jokes.forEach((joke) => {
        let jokePTag = document.createElement("p");
        let jokeContent = document.createTextNode(joke.joke);
        jokePTag.appendChild(jokeContent);

        let punchlinePTag = document.createElement("p");
        let punchlineContent = document.createTextNode(joke.punchline);
        punchlinePTag.appendChild(punchlineContent);

        jokesContainer.appendChild(jokePTag);
        jokesContainer.appendChild(punchlinePTag);
      });
    });
  });
};

window.onload = function () {
  updateTypes();
};
