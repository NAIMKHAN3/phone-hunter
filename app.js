const loadHunter = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data, dataLimit))

}
const displayPhone = (phones, dataLimit) => {
  const phoneConteiner = document.getElementById('phone-container');
  phoneConteiner.textContent = ``;
  const showAll = document.getElementById('show-all');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none');
  }
  else {
    showAll.classList.add('d-none');
  }


  // no phone found field
  const noPhone = document.getElementById('no-phone-found');
  if (phones.length === 0) {
    noPhone.classList.remove('d-none');
  }
  else {
    noPhone.classList.add('d-none');
  }

  // for Each loop

  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
        <div class="card p-4 rounded">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
         
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button type="button" onclick ="detailsBtn('${phone.slug}')"class="btn btn-primary">Primary</button>
        </div>
      </div>
        `;
    phoneConteiner.appendChild(phoneDiv);
  });
  toggleSpinner(false);
}
// prossecing
const prossecing = (dataLimit) => {
  const searchField = document.getElementById('input-field');

  const searchText = searchField.value;
  loadHunter(searchText, dataLimit);
  // searchField.value = ``;
  toggleSpinner(true);

}

// search and btn field

document.getElementById('search-btn').addEventListener('click', function () {

  prossecing(10);

})
// enter key handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    prossecing(10);

  }
});

// spinner toggle box

const toggleSpinner = (isloding) => {
  const spinner = document.getElementById('spinner-toggle');
  if (isloding) {
    spinner.classList.remove('d-none');
  }
  else {
    spinner.classList.add('d-none')
  }
}
document.getElementById('show-btn').addEventListener('click', function () {
  prossecing()
})

function detailsBtn(id) {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}


// loadHunter();

