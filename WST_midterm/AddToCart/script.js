const cart = [];
const totalPriceElement = document.getElementById('total-price');
const shippingFeeElement = document.getElementById('shipping-fee');
const shippingDestination = document.getElementById('shipping-destination');

document.getElementById('add-product').addEventListener('click', () => {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);

    if (name && !isNaN(price) && quantity > 0) {
        cart.push({ name, price, quantity });
        updateCart();
        clearInputs();
    } else {
        alert("Please enter valid product details.");
    }
});

shippingDestination.addEventListener('change', updateCart);

function updateCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editItem(index));
        li.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(index));
        li.appendChild(deleteButton);

        cartList.appendChild(li);
    });

    const shippingFee = calculateShippingFee();
    total += shippingFee;

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    shippingFeeElement.textContent = `Shipping Fee: $${shippingFee}`;
    document.getElementById('checkout').style.display = cart.length > 0 ? 'block' : 'none';
}

function calculateShippingFee() {
    const destination = shippingDestination.value;
    switch (destination) {
        case 'local':
            return 1;
        case 'national':
            return 2;
        case 'international':
            return 3;
        default:
            return 0;
    }
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        const total = calculateTotal();
        alert(`Thank you for your purchase!\nTotal amount: $${total.toFixed(2)}`);
        clearCart();
    } else {
        alert("Your cart is empty.");
    }
});

function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    total += calculateShippingFee();
    return total;
}

function clearCart() {
    cart.length = 0;
    updateCart();
}


function editItem(index) {
    const item = cart[index];
    document.getElementById('product-name').value = item.name;
    document.getElementById('product-price').value = item.price;
    document.getElementById('product-quantity').value = item.quantity;

    deleteItem(index);
}

function deleteItem(index) {
    cart.splice(index, 1); 
    updateCart();
}


function clearInputs() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '';
}
