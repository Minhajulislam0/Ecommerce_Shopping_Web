// cart 
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// open cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
}

// close cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
}

// cart working

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// making function
function ready(){
    // Remove items from cart
    let removeCartBtns = document.getElementsByClassName('cart-remove');

    for(let i = 0; i < removeCartBtns.length; i++){
        let button = removeCartBtns[i]
        button.addEventListener('click',removeCartItem)
    }

    // quantity changes
    let quantityInputs = document.getElementsByClassName('cart-product-quantity')
    for (let i = 0; i<quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    // Add to cart
    let addCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i<addCart.length; i++){
        let button = addCart[i]
        button.addEventListener('click', addCartClicked);
    }
    // buy btn
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyBtnClicked);
}

// BUY button 
function buyBtnClicked(){
    alert(`You'r Order Is Placed.` );
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}




// Remove items from cart
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// quqntity changes
function quantityChanged(event){
    let input = event.target;
    if (isNaN(input.value) || input.value < 0){
       input.value = 0 
    }
    updateTotal();
}

// Add to cart
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('Product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert('You have already add this item to your cart');
            return;
        }
    }

// Items to cart
let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">
                                ${title}
                            </div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-product-quantity">
                        </div>

                        <!-- remove cart -->
                        <i class="bx bxs-trash-alt cart-remove"></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-product-quantity')[0].addEventListener('change', quantityChanged);
}


// update total
function updateTotal (){
     let cartContent = document.getElementsByClassName('cart-content')[0];
     let cartBoxes = cartContent.getElementsByClassName('cart-box');
     let total = 0;
     for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-product-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + price * quantity;
        
    }
        // if price contain some cents value
    total = Math.round(total * 100) / 100;        

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}