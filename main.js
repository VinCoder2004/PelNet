async function fetchData() {
    const loadingMessage = document.getElementById("loadingMessage");
    loadingMessage.style.display = "block";  // Show loading message

    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        if (!pokemonName) {
            alert("Please enter a Pokémon name!");
            loadingMessage.style.display = "none";
            return;
        }

        // Fetch Pokémon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // Log the response status
        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        // Parse the response to JSON
        const data = await response.json();
        console.log(data);  // Log the full data for debugging

        // Get the Pokémon sprite (front default)
        const pokemonSprite = data.sprites.front_default;
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
        if (!pokemonSprite) {
            alert("Sprite not found for this Pokémon.");
            loadingMessage.style.display = "none";
            return;
        }

        // Find the image element and update its source
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";  // Make sure the image is visible
    } catch (error) {
        console.error(error);
        alert("Error fetching Pokémon data. Please try again.");
    } finally {
        loadingMessage.style.display = "none";  // Hide loading message
    }
}