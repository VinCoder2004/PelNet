let button = document.getElementById("nigga").addEventListener('click', function(){
    let user = document.getElementById("pokemonName").value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${user}`;

fetch(url)
.then(response => response.json())
.then(data => {
    if(user == ''){
        alert("enter poke");
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

    if(!data.held_items[0]){
        let gamit = document.getElementById("gamit").textContent = "No item found"
    }
    else{
        let gamit = document.getElementById("gamit").textContent = data.held_items[1].item.name;
        let gamits = document.getElementById("gamit");
        gamits.style.display = "block";
    }
})
})