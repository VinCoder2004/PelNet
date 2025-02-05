let button = document.getElementById("nigga").addEventListener('click', function(){
  change(); // Call the function when the button is clicked
  let user = document.getElementById("pokemonName").value.toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${user}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(user == '') {
      alert("Enter Pokémon");
      revert();
      return;
    }

    let pokie = document.getElementById("pokemonSprite");
    pokie.src = data.sprites.front_default;
    pokie.style.display = "block";
    console.log(data);

    if(data.name) {
      let pangalan = document.getElementById("name").textContent = data.name;
      let first = document.getElementById("name");
      first.style.display = "block";
    } else {
      alert(`${user} does not exist.`);
    }

    // Send search data to the server (search.php)
    fetch("https://xvinyz.infinityfreeapp.com/search.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `pokemon_name=${user}`
    })
    .then(response => response.text())
    .then(result => {
      console.log(result); // Log the response from search.php
    });

    // Handle other data like items, weight, etc...
    // Revert button back
    revert();
  });
});