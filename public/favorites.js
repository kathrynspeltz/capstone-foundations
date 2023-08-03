
const favParksContainer = document.getElementById('favoritesContainer')

const baseURL = `http://localhost:4004`

createFavParkCards = (parks) => {
    console.log(parks)
    favParksContainer.innerHTML = ``;
    parks.map((park) => {
        const parkCard = document.createElement("div");
        parkCard.classList.add('parkCard')
        parkCard.innerHTML = `
        <img alt='biking image' src=${park.image_url} class="park_image"/>
        <p class="park_name">${park.park_name}</p>
        <p class="address">${park.address}</p>
        <p class="parkNotes">${park.notes}</p>
        <button onclick="removeFromFavorites(${park.favorites_id})">Remove from Favorites</button>
        <br>
        <button onclick="updateFavoritesNotes(${park.favorites_id})">Update Your Notes</button>
          `;
        favParksContainer.appendChild(parkCard);
    });
};

function removeFromFavorites(id) {
    axios.delete(`http://localhost:4004/favorites/${id}`)
        .then(() => getFavorites())
        .catch(err => console.log(err))
}

updateFavoritesNotes(id) {

}

const getFavorites = () => {
    axios.get(`${baseURL}/favorites`).then(res => createFavParkCards(res.data)).catch(err => console.log(err))
}

getFavorites()