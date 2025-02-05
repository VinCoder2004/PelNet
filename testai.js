function change(){
  let btn = document.getElementById("nigga");
  btn.disabled = true; //disable button when function is called 
  btn.textContent = "Please wait"; // change its text
}

function revert(){
  let btn = document.getElementById("nigga");
  btn.disabled = false; //enable button when function is called 
  btn.textContent = "Get Pokémon Sprite";
}

let button = document.getElementById("nigga").addEventListener('click', function(){
  change(); //call the function when click
    let user = document.getElementById("pokemonName").value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${user}`;

fetch(url)
.then(response => response.json())
.then(data => {
    if(user == ''){
        alert("enter pokemon");
        revert();
        return;
    }
    let pokie = document.getElementById("pokemonSprite");
    pokie.src = data.sprites.front_default;
    pokie.style.display = "block"
    console.log(data);
    if(data.name){
        let pangalan = document.getElementById("name").textContent = data.name;
        let first = document.getElementById("name");
        first.style.display = "block";
    } 
    else{
        alert(`${user} don't exist.`);
    }

    // Add to database after successful search
    // Send the search query to the PHP backend
    fetch('search.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `pokemon=${user}`
    })
    .then(response => response.text())
    .then(result => {
      console.log(result); // Log result from PHP
    });

    if(!data.held_items[0]){
        let gamit = document.getElementById("gamit").textContent = "No item found"
    }
    else{
        let gamit = document.getElementById("gamit").textContent = data.held_items[0].item.name;
        let gamits = document.getElementById("gamit");
        gamits.style.display = "block";
   }
    
    if (!data.weight) {
  let weightElement = document.getElementById("bugAt").textContent = "No weight data found";
} 
else {
  let weightElement = document.getElementById("bugAt").textContent = "Weight: " + data.weight / 10 + "kg";
  let weightDisplay = document.getElementById("bugAt");
  weightDisplay.style.display = "block";
}
let typeElement = document.getElementById("species");
typeElement.textContent =`Type: ${data.types[0].type.name}`;
revert(); //revert when the fetch is done
})
})