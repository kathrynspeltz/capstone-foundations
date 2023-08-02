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
        <p class="park_name">${park.park_name}</p>
        <p class="address">${park.address}</p>
        <div class="btns-container">
            <button onclick="addToFavorites(${park.id}, 'plus ')"> &#x2606; Add to Favorites</button>
        </div>
          `;
        parksContainer.appendChild(parkCard);
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
    axios.post(`${baseURL}/parks`, body).then(res => createParkCards(res.data))
    addParkName.value = ""
    addParkAddress.value = ""
    addMilesofTrail.value = ""
    addParkURL.value = ""
}

const getParks = () => {
    axios.get(`${baseURL}/parks`).then(res => createParkCards(res.data))
}

document.addEventListener("DOMContentLoaded", getParks)
addParkForm.addEventListener("submit", addPark)