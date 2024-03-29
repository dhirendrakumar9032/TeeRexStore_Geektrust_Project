// Import the fetchData function from the data module.
import { fetchData } from "./script/data.js";

// Initialize data and shoppingCart arrays from localStorage, or set to defaults if not present.
let data = JSON.parse(localStorage.getItem('data')) || [];
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];


async function main() {
  try {
    const newData = await fetchData();
    if (newData.length > 0) {
      data = newData;
      localStorage.setItem("data", JSON.stringify(data));
      mapItemData(data);
    } else {
      console.log("No data returned");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();

// Adds an item to the shopping cart.
const addItemToCartList = (id) => {
  const existingItemIndex = shoppingCart.findIndex(item => item.id === id);

  if (existingItemIndex !== -1) {
    if(shoppingCart[existingItemIndex].count+1>shoppingCart[existingItemIndex].quantity){
      alert("You can't add more than the available quantity");
      return;
    }else{
      shoppingCart[existingItemIndex].count += 1;
    }
  } else {

    const itemToAdd = data.find(item => item.id === id);
    if (itemToAdd) {
      const newItem = { ...itemToAdd, count: 1 };
      shoppingCart.push(newItem);
    }
  }

  updateCartCounter();
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
};


function updateCartCounter() {
  const counter = document.getElementById("cart-item");
  let count=0;
  shoppingCart.forEach((item)=>count+=item.count)
  if (counter) {
    counter.textContent = `${count}`;
  }
}

function mapItemData(dataToDisplay) {
  const itemContainer = document.getElementById('items-container');
  const nodata = document.getElementById('nodata');

  itemContainer.innerHTML = '';
  nodata.style.display = dataToDisplay.length > 0 ? "none" : "flex";

  dataToDisplay.forEach((dataItem) => {
    const item = document.createElement("div");
    item.classList.add("item");

    const img = document.createElement("img");
    img.src = dataItem.imageURL;
    img.alt = dataItem.name;
    item.appendChild(img);

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const h3 = document.createElement("h3");
    h3.textContent = dataItem.name;
    itemDetails.appendChild(h3);

    const addCart = document.createElement('div');
    addCart.classList.add('add-cart');

    const p = document.createElement("p");
    p.textContent = `Rs ${dataItem.price}`;
    addCart.appendChild(p);

    const btn = document.createElement('button');
    btn.textContent = "Add to Cart";
    btn.addEventListener('click', () => addItemToCartList(dataItem.id));
    addCart.appendChild(btn);

    itemDetails.appendChild(addCart);
    item.appendChild(itemDetails);
    itemContainer.appendChild(item);
  });
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-btn');
  const filterContainer = document.querySelector('.filter');
  const countTag = document.getElementById('count-tag');

  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      const inputValue = searchInput.value.trim().toLowerCase();
      onSearch(inputValue);
    }));
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const inputValue = searchInput.value.trim().toLowerCase();
      onSearch(inputValue);
    });
  }



  if (countTag) {
    countTag.addEventListener('click', () => {
      console.log('Navigating to shoppingCart.html');
      window.location.href = 'shoppingCart.html';
    });
  }

  updateCartCounter();
});

function onSearch(inputValue) {
  const filteredData = data.filter(item => item.name.toLowerCase().includes(inputValue));
  mapItemData(filteredData);
}

const filterContainer = document.querySelector('.filter');
  
filterContainer.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    
    const filteredDataByCategory=filterDataByCategory(getFilterSelections());
    console.log('filteredDataByCategory :', filteredDataByCategory,getFilterSelections());
    mapItemData(filteredDataByCategory);
  }
});

function getFilterSelections() {
const filterCategories = document.querySelectorAll('.filter .color-filter');
const filterSelections = {};

filterCategories.forEach(categoryElement => {
  const category = categoryElement.querySelector('h3').innerText;
  const checkboxes = categoryElement.querySelectorAll('input[type="checkbox"]:checked');
  const selectedValues = Array.from(checkboxes).map(checkbox => checkbox.value.toLowerCase());

  if (selectedValues.length > 0) {
    filterSelections[category] = selectedValues;
  }
});

return filterSelections;
}


const filterDataByCategory=(filters)=> {
return data.filter(item => {
  const colorMatch = !filters.Color || filters.Color.includes(item.color.toLowerCase());
  const genderMatch = !filters.Gender || filters.Gender.includes(item.gender.toLowerCase());
  const priceMatch = !filters.Price || filters.Price.some(price =>  parseInt(price)==250?item.price<251:price==251?item.price<451:item.price>=451);
  const typeMatch = !filters.Type || filters.Type.includes(item.type.toLowerCase());
  return colorMatch && genderMatch && priceMatch && typeMatch;
});
}
