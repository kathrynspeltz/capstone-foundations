const parksContainer = document.querySelector('#parks-container')

const baseURL = `http://localhost:4004`

createParkCards = (parks) => {
    parks.map((park) => {
        const parkCard = document.createElement("div");
        parkCard.innerHTML = `
        <img alt='park cover image' src=${park.image_URL} class="park-cover-image"/>
        <p class="park_name">${park.park_name}</p>
        <p class="address">${park.address}</p>
        <div class="btns-container">
            <button onclick="addToFavorites(${park.id}, 'plus')">Add to Favorites</button>
        </div>
          `;
        parksContainer.appendChild(parkCard);
    });
};


const getParks = () => {
    axios.get(`${baseURL}/parks`).then(res => createParkCards(res.data))
}

getParks()