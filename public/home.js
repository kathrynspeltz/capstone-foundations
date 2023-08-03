const parksContainer = document.getElementById('parksContainer')
const addParkForm = document.getElementById('addParkForm')

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
        <div class="addToFavoritesBtn">
            <button onclick="addToFavorites(${park.park_id})"> &#x2606; Add to Favorites</button>
        </div>
          `;
        parksContainer.appendChild(parkCard);
    });
};

function addToFavorites(newFavPark) {
    console.log(newFavPark)
    const body = {
        park_id: newFavPark,
        notes: "Add your notes here"
    };
    axios.post(`${baseURL}/favorites`, body).then(res => {
    })
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
};

const getParks = () => {
    axios.get(`${baseURL}/parks`).then(res => createParkCards(res.data))
}

addParkForm.addEventListener("submit", addPark)
getParks()