                    
const cartContent = document.querySelector("#cart-content");
const clearCartBtn = document.querySelector("#clear-cart");
const totalPriceContainer = document.querySelector("#total-price");

function setLSContent(lsContent) {
    sessionStorage.setItem("products", JSON.stringify(lsContent));
}

function getLSContent() {
    if (sessionStorage && sessionStorage.length > 0) {
        const lsContent = JSON.parse(sessionStorage.getItem("products")) || [];
    return lsContent;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    displayProducts();
    displayCartTotal();
});

function calculateTotal(prices) {
    return prices.reduce(function (prev, next) {
        return prev + next;
    }, 0);
}
function getCartItemPrices() {
    const prices = [];
    let nums = cartContent.querySelectorAll("tr td:nth-child(3)");
    if (nums.length > 0) {
        for (let cell = 0; cell < nums.length; cell++) {
            let num = nums[cell].innerText;
            num = num.replace(/[^\d]/g, "");
            num = parseFloat(num);
            prices.push(num);
        }
        return prices;
    } else {
        return;
    }
}

function displayCartTotal() {
    const prices = getCartItemPrices();
    let total = 0;
    if (prices) {
        total = calculateTotal(prices);
        totalPriceContainer.innerHTML = `<span class="total">Total: $${total.toFixed(
            2
        )}</span>`;
    } else {
        totalPriceContainer.innerHTML = '<span class="total">Total: $0</span>';
    }
}

function displayProducts() {
    const lsContent = getLSContent();
    let productMarkup = "";
    if (lsContent !== null) {
        for (let product of lsContent) {
        
        productMarkup += `
            <tr>
            <td><img class="wish-image" src="${product.image}" alt="${
            product.name
        }" width="120"></td>
            <td>
            ${product.name}
            </td>
            <td>${product.price}</td>
            <td><a href="#" data-id="${product.id}" ><i class="fa fa-trash trash-icon"></i></a></td>
            </tr>
        `;
        }
    } else {
        productMarkup = "Your cart is empty.";
    }
    cartContent.querySelector("tbody").innerHTML = productMarkup;
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
    displayProducts();
}

function clearCart() {
    const lsContent = getLSContent();
    lsContent.splice(0, lsContent.length);
    setLSContent(lsContent);
    displayProducts();
}

cartContent.querySelector("tbody").addEventListener("click", function(e) {
    e.preventDefault();
    const clickedBtn = e.target;
    if (e.target.classList.contains("trash-icon")) {
    const productId = clickedBtn.parentElement.getAttribute("data-id");
    removeProduct(productId);
    displayCartTotal();
    }
});

clearCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    clearCart();
});
clearCartBtn.addEventListener("click", displayCartTotal);
