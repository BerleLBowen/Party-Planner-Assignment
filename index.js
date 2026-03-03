
const state = {
  allParties: [],
  selectedParty: null,
};

const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2409-FTB-ET-WEB-PT/events";

async function fetchParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.allParties = json.data;
    render();
  } catch (error) {
    console.error("Failed to fetch parties:", error);
  }
}

async function fetchSingleParty(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const json = await response.json();
    state.selectedParty = json.data;
    render();
  } catch (error) {
    console.error("Failed to fetch single party:", error);
  }
}

function render() {
  const root = document.querySelector("#root");
  root.innerHTML = ""; 

  const listContainer = document.createElement("section");
  listContainer.innerHTML = "<h2>Upcoming Parties</h2>";
  const partyList = document.createElement("ul");

  state.allParties.forEach((party) => {
    const li = document.createElement("li");
    li.textContent = party.name;
    li.style.cursor = "pointer";
    
    li.addEventListener("click", () => {
      fetchSingleParty(party.id);
    });
    
    partyList.appendChild(li);
  });

  listContainer.appendChild(partyList);

  const detailContainer = document.createElement("section");
  detailContainer.innerHTML = "<h2>Party Details</h2>";

  if (!state.selectedParty) {
    const message = document.createElement("p");
    message.textContent = "Please select a party from the list to see more details.";
    detailContainer.appendChild(message);
  } else {
    const details = document.createElement("div");
    details.innerHTML = `
      <h3>${state.selectedParty.name}</h3>
      <p><strong>ID:</strong> ${state.selectedParty.id}</p>
      <p><strong>Date:</strong> ${new Date(state.selectedParty.date).toLocaleString()}</p>
      <p><strong>Location:</strong> ${state.selectedParty.location}</p>
      <p><strong>Description:</strong> ${state.selectedParty.description}</p>
    `;
    detailContainer.appendChild(details);
  }

  root.appendChild(listContainer);
  root.appendChild(detailContainer);
}
fetchParties();