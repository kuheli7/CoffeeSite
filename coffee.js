let allCoffees = [];
const resultDiv = document.getElementById('coffeeApiResult');
const searchInput = document.getElementById('coffeeSearchInput');
const searchBtn = document.getElementById('coffeeSearchBtn');
const sortSelect = document.getElementById('coffeeSort');

fetch('https://api.sampleapis.com/coffee/hot')
  .then(res => res.json())
  .then(data => {
    allCoffees = data;
    displayCoffees(allCoffees.slice(0, 8));
  });

function displayCoffees(list) {
  resultDiv.innerHTML = '';
  if (!list.length) {
    resultDiv.innerHTML = '<div class="col-span-full text-yellow-100">No coffees found.</div>';
    return;
  }
  list.forEach(coffee => {
    const card = document.createElement('div');
    card.className = 'bg-black bg-opacity-60 rounded-lg shadow p-4 flex flex-col items-center';
    card.innerHTML = `
      <img src="${coffee.image || 'logo.jpg'}" alt="${coffee.title}" class="w-28 h-28 object-cover rounded-full mb-3 border-2 border-yellow-700 bg-white">
      <h3 class='text-lg font-bold text-yellow-300 mb-1 text-center'>${coffee.title}</h3>
      <p class='text-yellow-100 text-sm mb-2 text-center'>${coffee.description || ''}</p>
      <p class='text-yellow-200 text-xs text-center'><span class="font-semibold">Ingredients:</span> ${(coffee.ingredients || []).join(', ')}</p>
    `;
    resultDiv.appendChild(card);
  });
}

function filterAndSort() {
  let filtered = [...allCoffees];
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(c => c.title.toLowerCase().includes(searchTerm));
  }
  const sortOrder = sortSelect.value;
  filtered.sort((a, b) => {
    if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
    if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  displayCoffees(filtered.slice(0, 8));
}

searchBtn.addEventListener('click', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') filterAndSort();
});

