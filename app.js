//variables
const productsDom =  document.querySelector('.products-center');

// products display
class Products {
    async getProducts() {
        try{
            let result = await  fetch('products.json');
            let products = await result.json();

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
            productsDom.innerHTML= productsHtmlString;

        } catch (e) {
            console.log(e);
        }

    }


}

const products = new Products();
products.getProducts();
