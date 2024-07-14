document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartTableBody = document.querySelector('#cart-items tbody');
    const cartTotalElement = document.querySelector('#cart-total');

    // Função para atualizar a tabela do carrinho
    function updateCart() {
        cartTableBody.innerHTML = ''; // Limpa a tabela do carrinho

        let total = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');

            // Adiciona a coluna do produto
            const productCell = document.createElement('td');
            productCell.textContent = item.name;
            row.appendChild(productCell);

            // Adiciona a coluna da quantidade
            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            // Adiciona a coluna do preço
            const priceCell = document.createElement('td');
            priceCell.textContent = `R$${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            // Adiciona a coluna do total do item
            const totalCell = document.createElement('td');
            const itemTotal = item.price * item.quantity;
            totalCell.textContent = `R$${itemTotal.toFixed(2)}`;
            row.appendChild(totalCell);

            // Adiciona a coluna do botão remover
            const removeCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-from-cart');
            removeButton.dataset.index = cart.indexOf(item);
            removeCell.appendChild(removeButton);
            row.appendChild(removeCell);

            cartTableBody.appendChild(row);

            total += itemTotal;
        });

        cartTotalElement.textContent = `R$${total.toFixed(2)}`;
    }

    // Adiciona um produto ao carrinho
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        updateCart();
    }

    // Remove um produto do carrinho
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Manipula o clique no botão "Adicionar ao Carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            const productElement = button.closest('.product');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('Descrição do produto ', '').replace('.', ''));

            addToCart({
                id: productId,
                name: productName,
                price: productPrice
            });
        });
    });

    // Manipula o clique no botão "Remover" do carrinho
    cartTableBody.addEventListener('click', event => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.dataset.index;
            removeFromCart(parseInt(index));
        }
    });
});
