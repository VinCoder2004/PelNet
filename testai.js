function change(){
  let btn = document.getElementById("nigga");
  btn.disabled = true; // disable button when function is called 
  btn.textContent = "Please wait"; // change its text
}

function revert(){
  let btn = document.getElementById("nigga");
  btn.disabled = false; // enable button when function is called 
  btn.textContent = "Get Pokémon Sprite";
}

let button = document.getElementById("nigga").addEventListener('click', function(){
  change(); // call the function when the button is clicked
  let user = document.getElementById("pokemonName").value.toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${user}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (user == '') {
        alert("Enter Pokémon");
        revert();
        return;
      }
      
      let pokie = document.getElementById("pokemonSprite");
      pokie.src = data.sprites.front_default;
      pokie.style.display = "block";
      console.log(data);

      if (data.name) {
        let pangalan = document.getElementById("name").textContent = data.name;
        let first = document.getElementById("name");
        first.style.display = "block";
      } else {
        alert(`${user} does not exist.`);
      }

      if (!data.held_items[0]) {
        let gamit = document.getElementById("gamit").textContent = "No item found";
      } else {
        let gamit = document.getElementById("gamit").textContent = data.held_items[0].item.name;
        let gamits = document.getElementById("gamit");
        gamits.style.display = "block";
      }

      if (!data.weight) {
        let weightElement = document.getElementById("bugAt").textContent = "No weight data found";
      } else {
        let weightElement = document.getElementById("bugAt").textContent = "Weight: " + data.weight / 10 + "kg";
        let weightDisplay = document.getElementById("bugAt");
        weightDisplay.style.display = "block";
      }

      let typeElement = document.getElementById("species");
      typeElement.textContent = `Type: ${data.types[0].type.name}`;
      
      // Now send the Pokémon search data to the database on Infinity
      fetch("https://xvinyz.infinityfreeapp.com/search.php", { // Replace with your actual search.php URL
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `pokemon_name=${user}`
      })
      .then(response => response.text())
      .then(result => {
        console.log("Search stored in DB:", result); // Check response from PHP
      })
      .catch(error => {
        console.error("Error sending search data to database:", error);
      });

      revert(); // Revert button when the fetch is done
    })
    .catch(error => {
      console.error("Error fetching Pokémon data:", error);
      revert();
    });
});