;async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        if (!pokemonName) {
            alert("Please enter a Pokémon name!");
            return;
        }

        // Fetch Pokémon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // Log the response status and JSON data script 
        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        // Parse the response to JSON
        const data = await response.json();
        console.log(data);  // Log the full data for debugging

        // Get the Pokémon sprite (front default)
        const pokemonSprite = data.sprites.front_default;

        if (!pokemonSprite) {
            alert("Sprite not found for this Pokémon.");
            return;
        }

        // Find the image element and update its source
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";  // Make sure the image is visible

    } catch (error) {
        console.error(error);
        alert("Error fetching Pokémon data. Please try again.");
    }
}
