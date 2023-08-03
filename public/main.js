const parksContainer = document.getElementById('parksContainer')
const addParkForm = document.getElementById('addParkForm')
const addToFavorites = document.getElementsByClassName('addToFavorites')
const favParksContainer = document.getElementById('favoritesContainer')

const baseURL = `http://localhost:4004`

createParkCards = (parks) => {
    console.log(parks)
    parksContainer.innerHTML = ``;
    parks.map((park) => {
        const parkCard = document.createElement("div");
        parkCard.classList.add('parkCard')
        parkCard.innerHTML = `
        <img alt='biking image' src=${park.image_url} class="park_image"/>
        <p class="park_name">${park.park_name}</p>
        <p class="address">${park.address}</p>
        <div class="addToFavorites">
            <button onclick="addToFavorites(${park.id}, 'plus')"> &#x2606; Add to Favorites</button>
        </div>
          `;
        parksContainer.appendChild(parkCard);
    });
};
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
        <div class="addToFavorites">
            <button onclick="removeFromFavorites(${park.id}, 'minus ')"> &#x2606; - Remove from Favorites</button>
        </div>
          `;
        favParksContainer.appendChild(parkCard);
    });
};

const addPark = (newPark) => {
    newPark.preventDefault();
    const body = {
        park_name: addParkName.value,
        address: addParkAddress.value,
        miles_of_trail: addMilesofTrail.value,
        image_url: addParkURL.value
    };
    axios.post(`${baseURL}/parks`, body).then(res => {
        const allParks = getParks()
        createParkCards(allParks)
    })
    addParkName.value = ""
    addParkAddress.value = ""
    addMilesofTrail.value = ""
    addParkURL.value = ""
}

const addFavorite = (newFavPark) => {
    const body = {
        park_id: addToFavorites.value,
        notes: null
    };
    axios.post(`${baseURL}/favorites`, body).then(res => {
        const allFavParks = getFavorites()
        createFavParkCards(allFavParks)
    })
}

const getParks = () => {
    axios.get(`${baseURL}/parks`).then(res => createParkCards(res.data))
}

const getFavorites = () => {
    axios.get(`${baseURL}/favorites`).then(res => createFavParkCards(res.data))
}

addParkForm.addEventListener("submit", addPark)
addToFavorites.addEventListener("click", addFavorite)
getParks()
getFavorites()