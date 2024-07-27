
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    let totalPrice = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productName = productElement.querySelector('h2').innerText;
            const productPrice = parseFloat(productElement.querySelector('.price').innerText);

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${productName}</h3>
                <p>Preço: R$ ${productPrice.toFixed(2)}</p>
                <button class="remove-from-cart">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            totalPrice += productPrice;
            totalPriceElement.innerText = totalPrice.toFixed(2);

            cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
                cartItemsContainer.removeChild(cartItem);
                totalPrice -= productPrice;
                totalPriceElement.innerText = totalPrice.toFixed(2);
            });
        });
    });
});
