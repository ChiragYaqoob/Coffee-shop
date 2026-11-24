// ========================================
// ELEMENTS
// ========================================

const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

const cartItemsContainer = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const addButtons = document.querySelectorAll(".add-btn");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");


// ========================================
// CART
// ========================================

let cart = JSON.parse(
    localStorage.getItem("brewhausCart")
) || [];


// ========================================
// OPEN CART
// ========================================

function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

}

openCartBtn.addEventListener("click", openCart);


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}

closeCartBtn.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// ========================================
// ADD PRODUCT
// ========================================

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;

        const price = Number(
            button.dataset.price
        );


        const existingProduct = cart.find(
            item => item.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        saveCart();

        updateCart();

        openCart();

    });

});


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "brewhausCart",
        JSON.stringify(cart)
    );

}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    cartItemsContainer.innerHTML = "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    ☕
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add your favorite coffee to get started.
                </p>

            </div>

        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "$0.00";

        return;
    }


    let total = 0;

    let quantityTotal = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        quantityTotal += item.quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <div class="cart-item-price">
                    $${item.price.toFixed(2)}
                </div>

            </div>


            <div class="cart-item-controls">

                <button
                    class="qty-btn"
                    onclick="changeQuantity(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="qty-btn"
                    onclick="changeQuantity(${index}, 1)"
                >
                    +
                </button>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    ×
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(
            itemElement
        );

    });


    cartCount.textContent =
        quantityTotal;

    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


// ========================================
// REMOVE ITEM
// ========================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}


// ========================================
// CHECKOUT
// ========================================

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        let message =
            "☕ BrewHaus Order\n\n";


        let total = 0;


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            message +=
                `${item.name} × ${item.quantity} = $${itemTotal.toFixed(2)}\n`;

        });


        message +=
            `\nTotal: $${total.toFixed(2)}`;


        alert(message);


        cart = [];

        saveCart();

        updateCart();

        closeCart();

    }
);


// ========================================
// MOBILE MENU
// ========================================

menuBtn.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


// Close mobile menu after clicking link

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "active"
            );

        }
    );

});


// ========================================
// INITIALIZE
// ========================================

updateCart();