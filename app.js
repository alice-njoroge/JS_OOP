//variables
const productsDom = document.querySelector('.products-center');
const cartDom = document.querySelector('.cart-content');
const cartArrLength = document.querySelector('.cart-items');
const shopNow = document.querySelector('.shop-now');



// products class get them from json and display them on the UI
class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json');
            return await result.json();


        } catch (e) {
            return e;
        }
    }

    displayProducts(products) {
        let productsHtmlString = '';
        products.map((product) => {
            let productString = `
        <article class="product">
            <div class="img-container">
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <button class="bag-btn" data-id="${product.id}"><i class="fas fa-shopping-cart"></i>add to bag</button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
        </article>`;
            productsHtmlString += productString;
        });
        productsDom.innerHTML = productsHtmlString;
    }


}

class Cart {
    cartItems = [];

    bagButtons(products) {
        let bagButtons = document.querySelectorAll('.bag-btn');
        bagButtons.forEach((button) => {
            button.addEventListener('click', event => {
                button.innerText = "In bag";
                let productId = event.target.dataset.id;
                let product = products.find(product => product.id === productId);
                product['quantity'] = 1;
                this.putProductInStorage(product);
                this.openCart();
                this.cartUI();

            });
        });
    }

    putProductInStorage(product) {
        let cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            this.cartItems = JSON.parse(cartItems);
        }

        if (!this.cartItems.find(item => item.id === product.id)) {
            this.cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            cartArrLength.innerText = this.cartItems.length
        }

    }

    cartUI() {
        let cartItems = localStorage.getItem('cartItems');
        if (cartItems){
            this.cartItems = JSON.parse(cartItems);
        }else{
            this.cartItems = [];
        }


        let htmlCartString = '';
        this.cartItems.map(product => {
            htmlCartString += `<div class="cart-item">
            <img src="${product.image}" alt="${product.title}">
            <div>
            <h4>${product.title} </h4>
        <h5>${product.price}</h5>
        <span data-id="${product.id}" class="remove-item">remove</span>
            </div>
            <div>
            <i data-id="${product.id}" class="fas fa-chevron-up"></i>
            <p class="item-amount">${product.quantity}</p>
            <i data-id="${product.id}" class="fas fa-chevron-down"></i>
            </div>
            </div>`;
        });
        cartDom.innerHTML = htmlCartString;
    }
    openCart() {
        document.querySelector('.cart').classList.add('showCart');
        document.querySelector('.cart-overlay').classList.add('transparentBcg');
    }

    closeCart() {
        document.querySelector('.cart').classList.remove('showCart');
        document.querySelector('.cart-overlay').classList.remove('transparentBcg');
    }

    cartOverlay() {
        document.querySelector('.cart-overlay').addEventListener('click', event => {
            if (event.target.classList.contains('cart-overlay') || event.target.classList.contains('fa-window-close')) {
                this.closeCart()
            }
            if (event.target.classList.contains('remove-item')){
                let productId = event.target.dataset.id;
                this.removeCartItem(productId);
            }
            if (event.target.classList.contains('clear-cart')){
                localStorage.removeItem("cartItems");
                cartArrLength.innerText = 0;
                this.cartUI();
            }
            if (event.target.classList.contains('fa-chevron-up')){
                let productId = event.target.dataset.id;
                this.chevronUp(productId);
            }
            if (event.target.classList.contains('fa-chevron-down')){
                let productId = event.target.dataset.id;
                this.chevronDown(productId);
            }
        });

    }
    shopNow(){
        shopNow.addEventListener('click', event=>{
            productsDom.scrollIntoView({ behavior: 'smooth', block: 'center' });

        });
    }
    // populate cart items on loading the browser
    viewCartItems(products){
        let cartItems = localStorage.getItem('cartItems');
       if (cartItems){
           this.cartItems = JSON.parse(cartItems);
           cartArrLength.innerText = this.cartItems.length;
           this.cartUI();
       }
    }
    removeCartItem(productId){
      let cartItems = localStorage.getItem('cartItems');
      if (cartItems){
          this.cartItems = JSON.parse(cartItems);
          console.log(this.cartItems);
         if (this.cartItems.length === 1){
             localStorage.removeItem("cartItems");
             cartArrLength.innerText = 0;
         }else{
             let itemIndex =  this.cartItems.findIndex(item => productId === item.id);
             this.cartItems.splice(itemIndex,1);
             localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
             cartArrLength.innerText = this.cartItems.length;
         }
          this.cartUI();
      }

    }
    chevronUp(productId){
        let cartItems = localStorage.getItem('cartItems');
        if (cartItems){
            this.cartItems = JSON.parse(cartItems);
            const index=this.cartItems.findIndex(item => productId  === item.id);
            console.log(index);
            this.cartItems[index].quantity += 1;
             localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
             this.cartUI();
        }

    }
    chevronDown(productId){
        let cartItems = localStorage.getItem('cartItems');
        if (cartItems){
            this.cartItems = JSON.parse(cartItems);
            const index=this.cartItems.findIndex(item => productId  === item.id);
            console.log(index);
            while (this.cartItems[index].quantity > 1){
                this.cartItems[index].quantity -= 1;
                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
                this.cartUI();
            }
        }

    }

    productTotal(){

    }

} // end of cart class

document.addEventListener('DOMContentLoaded', (event) => {

const productsObj = new Products();
const cart = new Cart();
cart.shopNow();
productsObj.getProducts().then(products => {
    productsObj.displayProducts(products);
    cart.bagButtons(products);
    cart.cartOverlay();
    cart.viewCartItems(products);
});
    cartArrLength.addEventListener('click', event=>{
        cart.openCart();
    });
});


