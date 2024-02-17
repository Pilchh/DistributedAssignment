const updateTypes = async () => {
  const typeDropdown = document.getElementById("jokeType");

  await fetch("types").then((result) => {
    result.json().then((result) => {
      typeDropdown.innerHTML = "";
      let anyType = new Option("Any", "-1");
      typeDropdown.appendChild(anyType);
      result.forEach((type) => {
        let newType = new Option(type.type, type.type_id);
        typeDropdown.appendChild(newType);
      });
    });
    ``;
  });
};

const getJoke = async () => {
  const typeDropdown = document.getElementById("jokeType");
  const jokesContainer = document.getElementById("jokes");
  await fetch(
    "jokes?" +
      new URLSearchParams({
        type: typeDropdown.value,
        count: 1,
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

        setTimeout(() => {
          jokesContainer.appendChild(punchlinePTag);
        }, 2000);
      });
    });
  });
};

window.onload = function () {
  updateTypes();
};
