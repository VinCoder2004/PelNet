function change(){
  let btn = document.getElementById("nigga");
  btn.disabled = true; // Disable button when function is called 
  btn.textContent = "Please wait"; // Change its text
}

function revert(){
  let btn = document.getElementById("nigga");
  btn.disabled = false; // Enable button when function is called 
  btn.textContent = "Get Pokémon Sprite";
}

// This function sends the Pokémon name to the server (PHP) to save it in the database
function recordSearch(pokemonName) {
    fetch('https://xvinyz.infinityfreeapp.com/search.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'pokemon_name=' + pokemonName  // Send the Pokémon name as POST data
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // You can log or display the response from the server
    })
    .catch(error => console.error('Error:', error));
}

let button = document.getElementById("nigga").addEventListener('click', function(){
  change(); // Call the function when clicked
  let user = document.getElementById("pokemonName").value.toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${user}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(user == ''){
        alert("Enter Pokémon name");
        revert();
        return;
    }

    let pokie = document.getElementById("pokemonSprite");
    pokie.src = data.sprites.front_default;
    pokie.style.display = "block";
    
    if(data.name){
        let pangalan = document.getElementById("name").textContent = data.name;
        let first = document.getElementById("name");
        first.style.display = "block";
    } else {
        alert(`${user} doesn't exist.`);
    }

    if(!data.held_items[0]){
        document.getElementById("gamit").textContent = "No item found";
    } else {
        document.getElementById("gamit").textContent = data.held_items[0].item.name;
        document.getElementById("gamit").style.display = "block";
    }
    
    if (!data.weight) {
        document.getElementById("bugAt").textContent = "No weight data found";
    } else {
        document.getElementById("bugAt").textContent = "Weight: " + data.weight / 10 + "kg";
        document.getElementById("bugAt").style.display = "block";
    }

    let typeElement = document.getElementById("species");
    typeElement.textContent = `Type: ${data.types[0].type.name}`;

    // Send the search to the database
    recordSearch(user); // Call the function to record the search in the database
    
    revert(); // Revert when the fetch is done
  })
})