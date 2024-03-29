let shoppingCartData = JSON.parse(localStorage.getItem('shoppingCart')) || [];
console.log({ shoppingCartData });

document.getElementById('product').addEventListener('click', () => {
    window.location.href = 'index.html';
});

function updateCartCounter() {
    const counter = document.getElementById("cart-item");
    if (counter) {
      counter.textContent = `${shoppingCartData.length}`;
    }
  }

updateCartCounter();

const renderShoppingCart = (data) => {
    const shoppingCartContainer = document.getElementById('shopping-cart');
    shoppingCartContainer.innerHTML = ''; 

    data.forEach((item) => {
        const shoppingCartList = document.createElement('div');
        shoppingCartList.className = 'shopping-cart-list';

        const img = document.createElement('img');
        img.className = 'item-img';
        img.src = item.imageURL;
        img.alt = item.name;
        shoppingCartList.appendChild(img);

        const nameAndPrice = document.createElement('div');
        nameAndPrice.className = 'name-price';

        const name = document.createElement('p');
        name.textContent = item.name;
        nameAndPrice.appendChild(name);

        const price = document.createElement('p');
        price.textContent = `Rs ${item.price}`;
        nameAndPrice.appendChild(price);

        shoppingCartList.appendChild(nameAndPrice);

        const itemQuantity = document.createElement('div');
        itemQuantity.className = 'item-quantity';
        shoppingCartList.appendChild(itemQuantity);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            removeItemFromCart(item);
        });

        shoppingCartList.appendChild(deleteBtn);

        shoppingCartContainer.appendChild(shoppingCartList);
    });
};

const removeItemFromCart = (itemToRemove) => {
    shoppingCartData = shoppingCartData.filter(item => item !== itemToRemove);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartData));
    updateCartCounter();
    renderShoppingCart(shoppingCartData); 
    totalAmount();
};

renderShoppingCart(shoppingCartData); 


const totalAmount =()=>{
    let total = 0;
    const totalAmount=document.getElementById('total-amount');
    totalAmount.innerText='';
    shoppingCartData.forEach(item => {
        total += item.price;
    });
    const h3 = document.createElement('h3');
    h3.textContent='Total Amount: '
    const totalPrice=document.createElement('div');
    totalPrice.classList.add('price');
    totalPrice.textContent-''
    totalPrice.textContent = `Rs ${total}`;
    totalAmount.appendChild(h3);
    totalAmount.appendChild(totalPrice);
}

if(shoppingCartData.length){
    totalAmount();
}else{
    const totalAmount=document.getElementById('total-amount');
    totalAmount.style.display = 'none';
}
