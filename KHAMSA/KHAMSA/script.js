// --- Cart Logic ---
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCountSpan = document.querySelector('.cart-count');
const cartTotalSpan = document.getElementById('cart-total-price');
let cartCount = 0;
let totalAmount = 0;

function toggleCart() {
    cartSidebar.classList.toggle('active');
}

function addToCart(name, price, imageSrc) {
    cartCount++;
    cartCountSpan.innerText = cartCount;

    let priceNumber = parseFloat(price.replace('Pkr', ''));
    totalAmount += priceNumber;
    cartTotalSpan.innerText = 'Pkr' + totalAmount.toFixed(2);

    const itemHTML = `
        <div class="cart-item">
            <img src="${imageSrc}" alt="${name}">
            <div>
                <h4 style="font-family:'Cormorant Garamond'; font-size:1.1rem;">${name}</h4>
                <p style="color:#888; font-size:0.9rem;">${price}</p>
            </div>
        </div>
    `;

    cartItemsContainer.insertAdjacentHTML('afterbegin', itemHTML);
    if(!cartSidebar.classList.contains('active')) toggleCart();
}

// --- Filter Logic ---
function filterSelection(category) {
    const products = document.getElementsByClassName("product-card");
    const btns = document.querySelectorAll(".filters button");
    
    btns.forEach(btn => {
        if(btn.innerText.toLowerCase().includes(category) || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    for (let i = 0; i < products.length; i++) {
        if (category === 'all') {
            products[i].style.display = "block";
            setTimeout(() => products[i].style.opacity = "1", 50);
        } else {
            if (products[i].classList.contains(category)) {
                products[i].style.display = "block";
                setTimeout(() => products[i].style.opacity = "1", 50);
            } else {
                products[i].style.display = "none";
                products[i].style.opacity = "0";
            }
        }
    }
}

// --- Scroll Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.fade-up');
hiddenElements.forEach((el) => observer.observe(el));