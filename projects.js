// Simple in-page project registry.
// Replace this array with real data or load from a JSON file / API.
const projects = [
  {
    title: "Sample irrigation upgrade",
    location: "Aneth",
    type: "irrigation",
    status: "design",
    fundingStage: "partially-funded",
    lead: "Aneth Chapter, Navajo Nation Water Resources"
  },
  {
    title: "Culinary water system improvements",
    location: "Bluff",
    type: "culinary-water",
    status: "concept",
    fundingStage: "unfunded",
    lead: "Bluff Town Council"
  }
];

const tableBody = document.querySelector("#project-table tbody");
const geoFilter = document.getElementById("filter-geography");
const typeFilter = document.getElementById("filter-type");
const fundingFilter = document.getElementById("filter-funding");

function renderProjects() {
  const geo = geoFilter.value;
  const type = typeFilter.value;
  const funding = fundingFilter.value;

  const filtered = projects.filter(p => {
    const matchGeo = !geo || p.location === geo;
    const matchType = !type || p.type === type;
    const matchFunding = !funding || p.fundingStage === funding;
    return matchGeo && matchType && matchFunding;
  });

  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "No projects match the current filters.";
    tr.appendChild(td);
    tableBody.appendChild(tr);
    return;
  }

  filtered.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.title}</td>
      <td>${p.location}</td>
      <td>${formatType(p.type)}</td>
      <td>${formatStatus(p.status)}</td>
      <td>${formatFunding(p.fundingStage)}</td>
      <td>${p.lead}</td>
    `;
    tableBody.appendChild(tr);
  });
}

function formatType(t) {
  switch (t) {
    case "irrigation": return "Irrigation";
    case "culinary-water": return "Culinary water";
    case "transportation-flood": return "Transportation / flood";
    case "water-quality": return "Water quality";
    case "community-dev": return "Community development";
    default: return t;
  }
}

function formatStatus(s) {
  switch (s) {
    case "concept": return "Concept";
    case "scoping": return "Scoping / feasibility";
    case "design": return "Design / permitting";
    case "funding": return "Funding application";
    case "implementation": return "Implementation";
    case "completed": return "Completed";
    default: return s;
  }
}

function formatFunding(f) {
  switch (f) {
    case "unfunded": return "Unfunded";
    case "partially-funded": return "Partially funded";
    case "fully-funded": return "Fully funded";
    default: return f;
  }
}

[geoFilter, typeFilter, fundingFilter].forEach(el => {
  el.addEventListener("change", renderProjects);
});

// Initial render
renderProjects();
