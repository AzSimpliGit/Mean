
const productsContainer = document.querySelector("#grid");
var sessionContent = (sessionStorage && sessionStorage.length > 0) ? JSON.parse(sessionStorage.getItem("products")) : [] ;

function setLSContent(lsContent) {
    sessionStorage.setItem("products", JSON.stringify(lsContent));
}

function getLSContent() {
    if (sessionStorage && sessionStorage.length > 0) {
        const lsContent = JSON.parse(sessionStorage.getItem("products")) || [];
    return lsContent;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    let elementCollection = document.getElementsByClassName("btn-wishlist");
    if (sessionStorage && sessionStorage.length > 0) {
        sessionContent = JSON.parse(sessionStorage.getItem("products"));
        document.querySelector(".total-count").textContent = sessionContent.length;
        sessionContent.forEach(Item => {
            Array.from(elementCollection).forEach(function (element) {
                if(Item.id === element.dataset.id){
                    element.classList.remove("btn-wishlist");
                    element.classList.add("btn-wishlist-selected");
                }
            });
        });
        saveProduct();
    }
});

function saveProduct(clickedBtn) {
    if (clickedBtn !== null && clickedBtn !== undefined) {
        clickedBtn.classList.remove("btn-wishlist");
        clickedBtn.classList.add("btn-wishlist-selected");
        const productId = clickedBtn.getAttribute("data-id");
        const card = clickedBtn.parentElement;
        const prodImage = card.querySelector("img").src;
        const prodName = card.querySelector("h5").textContent;
        const prodPrice = card.querySelector(".card-price").textContent;

        const lsContent = (sessionStorage && sessionStorage.length > 0) ? getLSContent() : [] ;

        if (lsContent && lsContent.length > 0){
            lsContent.forEach(function(product) {
                if (product.id === productId) {
                isProductInCart = true;
                }
            });
        }       

        let isProductInCart = false;
        if (!isProductInCart) {
            lsContent.push({
                id: productId,
                image: prodImage,
                name: prodName,
                price: prodPrice,
                wishlist: true,
            });

            setLSContent(lsContent);

            if (sessionStorage && sessionStorage.length > 0 && !clickedBtn.classList.contains("btn-wishlist-selected")) {
                lsContent = JSON.parse(sessionStorage.getItem("products")) || [];
                cartCount = lsContent.length;
            }else{
                cartCount = lsContent.length;
            }
            document.querySelector(".total-count").textContent = cartCount;
        }
    }
}

function removeProduct(productId) {
    const lsContent = getLSContent();

    let productIndex;
    lsContent.forEach(function(product, i) {
    if (product.id === productId) {
        productIndex = i;
    }
    });
    lsContent.splice(productIndex, 1);
    
    setLSContent(lsContent);
}

productsContainer.addEventListener("click", function(e) {
    if (e.target.parentElement.classList.contains("btn-wishlist-selected")) {
        e.preventDefault();
        
        if(sessionStorage && sessionStorage.length > 0) {
            const productId = e.target.parentElement.getAttribute("data-id");
            
            removeProduct(productId);;
        }
        e.target.parentElement.classList.remove("btn-wishlist-selected");
        e.target.parentElement.classList.add("btn-wishlist");
        document.querySelector(".total-count").textContent = JSON.parse(sessionStorage.getItem("products")).length;
        return;
    }
    if (e.target.parentElement.classList.contains("btn-wishlist")) {
        e.preventDefault();
        const clickedBtn = e.target.parentElement;
        saveProduct(clickedBtn);
    }
});