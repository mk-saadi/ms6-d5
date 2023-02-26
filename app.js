// # eita nie website link connect kara gelo website theke data neya gelo
const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data, dataLimit);
  } catch (err) {
    console.log(err);
  }
};
// >> {object}, [array]
// >> see how many places "dataLimit" is being used

// # phones-container
// >> eikhane phones ebong details show korbe

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phone-container");
  // >> clear the search field !important
  phonesContainer.textContent = "";

  // >> display 10 rows of phones and show more button

  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    // >> 10 rows of phones
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //   # not found message
  // >> display warning message
  //   if (phones.length === 0) {
  //     const warning = document.createElement("div");
  //     warning.classList.add("alert");
  //     warning.classList.add("alert-warning");
  //     warning.classList.add("position-absolute");
  //     warning.classList.add("top-50");
  //     warning.classList.add("start-50");
  //     warning.classList.add("translate-middle");
  //     warning.classList.add("text-center");
  //     warning.classList.add("display-5");
  //     warning.classList.add("text-danger");
  //     warning.classList.add("font-weight-bold");
  //     warning.textContent = "No phones found";
  //     phonesContainer.appendChild(warning);
  //   };

  // >> another way to do it

  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // # not found message end

  // >> phone er card(body) bananor jonno
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("card-img-top");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card">
      <img src="${phone.image}" class="card-img-top" alt="..." />
      <div class="card-body p-4">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a
          natural lead-in to additional content. This content is a
          little bit longer.
        </p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#phoneDetailModal">Show Details</button>
      </div>
    </div>
      `;
    phonesContainer.appendChild(phoneDiv);
  });

  // ! stop spinner/loader
  toggleSpinner(false);
};

// ! utility
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  // >> "value"- hobe, "innerText"- hobe na
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
};

// # search
// >> connect search field to phone
document.getElementById("btn-search").addEventListener("click", function () {
  // ! start loader
  processSearch(10);
});

// # enter key event handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    console.log(e.key);
    if (e.key === "Enter") {
      // >> code for enter
      processSearch(10);
    }
  });

// # loader/spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// # show all period
// >> not the best way to do it
document.getElementById("btn-show-all").addEventListener("click", function () {
  // >> no limitations, since we want to show all phones,
  processSearch();
});

// # load phone details "loadPhoneDetails('${phone.slug}')"
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url);
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

// ! display phone details(body) in modal
const displayPhoneDetails = (phone) => {
  console.log(phone);
  const phoneDetailModal = document.getElementById("phoneDetailModalLabel");
  phoneDetailModal.innerText = phone.name;
  const phoneDetail = document.getElementById("phone-details");

  // >> if there is a chance that release date is unavailable then use "${phone.releaseDate ? phone.releaseDate: 'No Release date Found'}"
  phoneDetail.innerHTML = `
  <img src="${phone.image}" class="card-img-top" alt="..." />
  <p>Release Date: ${
    phone.releaseDate ? phone.releaseDate : "No Release date Found"
  }</p>
  <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
  <p>Display Size: ${
    phone.mainFeatures.displaySize
      ? phone.mainFeatures.displaySize
      : "No Info Found"
  }</p>
  <p>Sensors:</p>
  <p>1. ${
    phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[0] : "Not Found"
  }</p>
  <p>2. ${
    phone.mainFeatures.sensors[1] ? phone.mainFeatures.sensors[1] : "Not Found"
  }}</p>
  <p>3. ${
    phone.mainFeatures.sensors[2] ? phone.mainFeatures.sensors[2] : "Not Found"
  }</p>
  <p>4. ${
    phone.mainFeatures.sensors[3] ? phone.mainFeatures.sensors[3] : "Not Found"
  }</p>
  <p>5. ${
    phone.mainFeatures.sensors[4] ? phone.mainFeatures.sensors[4] : "Not Found"
  }</p>
  <p>6. ${
    phone.mainFeatures.sensors[5] ? phone.mainFeatures.sensors[5] : "Not Found"
  }</p>
  <p>7. ${
    phone.mainFeatures.sensors[6] ? phone.mainFeatures.sensors[6] : "Not Found"
  }</p>
  <p>Memory: ${phone.mainFeatures.memory}</p>
  <p>BlueTooth: ${phone.others.Bluetooth}</p>
  <p>NFC: ${phone.others.NFC}</p>
  <p>Radio: ${phone.others.Radio}</p>
  <p>GPS: ${phone.others.GPS}</p>
  <p>USB: ${phone.others.USB}</p>
  <p>WLAN: ${phone.others.WLAN}</p>
  `;
  // >> noo need to append child here
  //   <p>${phone.mainFeatures.sensors[0]}</p>
};

// >> dont forget to call function
loadPhone();
