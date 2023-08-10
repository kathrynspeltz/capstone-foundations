const parksContainer = document.getElementById('parksContainer')
const addParkForm = document.getElementById('addParkForm')
const addToFavoritesBtn = document.getElementsByClassName('addToFavoritesBtn')
const filterParkForm = document.getElementById('sortParksForm2')

const baseURL = `http://3.17.152.76`

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
        <div>
            <button class="addToFavoritesBtn" onclick="addToFavorites(${park.park_id})"> &#x2606; Add to Favorites</button>
        </div>
          `;
        parksContainer.appendChild(parkCard);
    });
};

function addToFavorites(newFavPark) {
    const body = {
        park_id: newFavPark,
        notes: " Add your own notes in the form below"
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
        image_url: addParkURL.value,
        region: addParkRegion.value
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

const filterParks = (sortParks) => {
    sortParks.preventDefault()
    console.log("filterParks started!")
    axios.get(`${baseURL}/parks`).then(res => sortParksForm(res.data))
    function sortParksForm(arr) {
        let regionFilter = regionSelection.value
        let sortOrder = orderSelection.value
        const filter1 = arr.filter((arr) => arr.region === regionFilter)
        filter1.sort((a, b) => a.miles_of_trail - b.miles_of_trail)
        if (sortOrder === "asc") {
            createParkCards(filter1)
        } else {
            filter1.reverse()
            createParkCards(filter1)
        }
    }
}

const getParks = () => {
    axios.get(`${baseURL}/parks`).then(res => createParkCards(res.data))
}


const changeFavoritesButton = () => {
    addToFavoritesBtn.textContent = "Added to Favorites!"
}

getParks()
addParkForm.addEventListener("submit", addPark)
filterParkForm.addEventListener("submit", filterParks)
