//variables
const productsDom = document.querySelector('.products-center');

// products display
class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json');
            return await result.json();

        } catch (e) {
            console.log(e);
        }


    }

}

class UI {
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

const productsObj = new Products();
const ui = new UI;
productsObj.getProducts().then(products => ui.displayProducts(products));

