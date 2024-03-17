const updateTypes = async () => {
  const typeDropdown = document.getElementById("jokeType");

  await fetch("types").then((result) => {
    result.json().then((result) => {
      // Reset content of type dropdown
      typeDropdown.innerHTML = "";

      // Create the any type with value of -1
      let anyType = new Option("Any", "-1");
      typeDropdown.appendChild(anyType);

      // Add each type from API response
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
  // Fetch /jokes with parameters from type and count
  await fetch(
    "jokes?" +
      new URLSearchParams({
        type: typeDropdown.value,
        count: 1,
      }),
  ).then((result) => {
    result.json().then((jokes) => {
      // Reset displayed jokes
      jokesContainer.innerText = "";

      // For each joke returned create new p tags with
      // joke and punchline content
      jokes.forEach((joke) => {
        let jokePTag = document.createElement("p");
        let jokeContent = document.createTextNode(joke.joke);
        jokePTag.appendChild(jokeContent);

        let punchlinePTag = document.createElement("p");
        let punchlineContent = document.createTextNode(joke.punchline);
        punchlinePTag.appendChild(punchlineContent);

        jokesContainer.appendChild(jokePTag);

        // Display the punchline 2 seconds later
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
