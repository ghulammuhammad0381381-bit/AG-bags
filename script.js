
let cart = 0;
let total = 0;
let cartItems = [];

// ADD TO CART
function addToCart(price) {

    cart++;
    total = total + price;
    cartItems.push(price);

    document.getElementById("cart-count").innerText = cart;
    document.getElementById("total-price").innerText = total;

    alert("Bag added successfully!");
}

// ORDER FORM
document.addEventListener("DOMContentLoaded", function() {

    let orderForm = document.getElementById("order-form");

    orderForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        let name = document.getElementById("customer-name").value;
        let phone = document.getElementById("customer-phone").value;
        let address = document.getElementById("customer-address").value;

        if (cart === 0) {
            alert("Please add a bag first!");
            return;
        }

        let order = {
            name: name,
            phone: phone,
            address: address,
            items: cartItems,
            total: total
        };

        try {

            let response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            });

            let result = await response.json();

            if (!response.ok) {
                throw new Error("Order failed!");
            }

            alert(result.message);

            orderForm.reset();

            cart = 0;
            total = 0;
            cartItems = [];

            document.getElementById("cart-count").innerText = 0;
            document.getElementById("total-price").innerText = 0;

        } catch (error) {

            alert("Something went wrong! Please try again.");

            console.log(error);

        }

    });

});
