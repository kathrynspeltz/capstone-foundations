
const favParksContainer = document.getElementById('favoritesContainer')
const updateFavoritesNotesForm = document.getElementById('addParkNotesForm')
const parkSelector = document.getElementById('parkSelector')

const baseURL = `http://3.17.152.76`

createFavParkCards = (parks) => {
    favParksContainer.innerHTML = ``;
    parks.map((park) => {
        const parkCard = document.createElement("div");
        parkCard.classList.add('parkCard')
        parkCard.innerHTML = `
        <img alt='biking image' src=${park.image_url} class="park_image"/>
        <p class="park_name">${park.park_name}</p>
        <p class="miles_of_trail">Miles of trails:${park.miles_of_trail}</p>
        <p class="address">Location: ${park.address}</p>
        <p class="parkNotes">Notes: ${park.notes}</p>
        <button onclick="removeFromFavorites(${park.favorites_id})">Remove from Favorites</button>
         <div> `;
        favParksContainer.appendChild(parkCard);
    });
}

createParksDropdownOptions = (parks) => {
    parks.forEach((park) => {
        const option = document.createElement('option')
        option.setAttribute('value', park.favorites_id)
        option.textContent = park.park_name
        parkSelector.appendChild(option)
    });
}

function removeFromFavorites(id) {
    axios.delete(`http://3.17.152.76/favorites/${id}`)
        .then(() => getFavorites())
        .catch(err => console.log(err))
}

function updateFavoritesNotes(notes) {
    console.log(notes)
    notes.preventDefault();
    const id = parkSelector.value
    console.log(parkSelector.value)
    const body = {
        notes: notesEntry.value
    };
    console.log(notesEntry.value)
    axios.put(`http://3.17.152.76/favorites/${id}`, body)
        .then(res => {
            const allFavParks = getFavorites()
            createFavParkCards(allFavParks)
        })
        .catch(err => console.log(err))

    parkSelector.value = ""
    notesEntry.value = ""


}

const getFavorites = () => {
    axios.get(`${baseURL}/favorites`).then(res => createFavParkCards(res.data)).catch(err => console.log(err))
}

const getFavorites2 = () => {
    axios.get(`${baseURL}/favorites`).then(res => createParksDropdownOptions(res.data)).catch(err => console.log(err))
}

updateFavoritesNotesForm.addEventListener("submit", updateFavoritesNotes)
getFavorites()
getFavorites2()