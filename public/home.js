const parksContainer = document.getElementById('parksContainer')
const addParkForm = document.getElementById('addParkForm')

const baseURL = `http://localhost:4004`

createParkCards = (parks) => {
    parksContainer.innerHTML = ``;
    parks.map((park) => {
        const parkCard = document.createElement("div");
        parkCard.classList.add('parkCard')
        parkCard.innerHTML = `
        <img alt='biking image' src=${park.image_url} class="park_image"/>
        <p class="park_name">${park.park_name}</p>
        <p class="miles_of_trail">Miles of trails: ${park.miles_of_trail}</p>
        <p class="address">Location: ${park.address}</p>
        <div class="addToFavoritesBtn">
            <button onclick="addToFavorites(${park.park_id})"> &#x2606; Add to Favorites</button>
        </div>
          `;
        parksContainer.appendChild(parkCard);
    });
};

function addToFavorites(newFavPark) {
    const body = {
        park_id: newFavPark,
        notes: "Add your own notes below"
    };
    axios.post(`${baseURL}/favorites`, body).then(res => {
    })
};

const addPark = (newPark) => {
    console.log(newPark)
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