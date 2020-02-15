//variables
const productsDom = document.querySelector('.products-center');


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
                let productId = event.target.dataset.id;
                let product = products.find(product => product.id === productId);
                this.putProductInStorage(product);
            });
        });
    }

    putProductInStorage(product) {
        let cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            this.cartItems = JSON.parse(cartItems);
        }

       if (!this.cartItems.find(item =>item.id === product.id)){
           this.cartItems.push(product);
           localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

       }

    }

}

const productsObj = new Products();
const cart = new Cart();
productsObj.getProducts().then(products => {
    productsObj.displayProducts(products);
    cart.bagButtons(products);
});


