// Telegram Web App инициализация
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Данные о товарах с дополнительными полями
const products = {
    1: {
        brand: "Creed", // НЕВИДИМОЕ ПОЛЕ ДЛЯ ПОИСКА
        name: "Creed Aventus",
        description: "Ананас, берёза, амбра. Стойкость 12+ часов. Классический мужской аромат, созданный в 2010 году. Идеален для особых случаев.",
        volumes: [
            { size: "50ml", price: 32000, oldPrice: 48000 },
            { size: "100ml", price: 42000, oldPrice: 60000 }
        ],
        catalogImage: "/static/images/11.jpg",
        productImage: "/static/images/11.jpg",
        additionalImages: [ // ДОПОЛНИТЕЛЬНЫЕ ФОТО
            "/static/images/12.jpg",
            "/static/images/13.jpg"
        ],
        badge: "🔥"
    },
    2: {
        brand: "Tom Ford",
        name: "Tom Ford Noir Extreme",
        description: "Восточно-пряный, ваниль, сандал. Роскошный вечерний аромат для уверенных мужчин.",
        volumes: [
            { size: "50ml", price: 28000, oldPrice: 42000 },
            { size: "100ml", price: 38000, oldPrice: 55000 }
        ],
        catalogImage: "/static/images/21.jpg",
        productImage: "/static/images/21.jpg",
        additionalImages: [
            "/static/images/22.jpg"
        ],
        badge: "NEW"
    },
    3: {
        brand: "Dior",
        name: "Dior Sauvage",
        description: "Свежий, пряный, амброксан. Стойкость 10+ часов. Современный классик.",
        volumes: [
            { size: "50ml", price: 26000, oldPrice: 40000 },
            { size: "100ml", price: 36000, oldPrice: 48000 }
        ],
        catalogImage: "/static/images/31.jpg",
        productImage: "/static/images/31.jpg",
        additionalImages: [
            "/static/images/32.jpg"
        ],
        badge: "🔥"
    },
    4: {
        brand: "Chanel",
        name: "Chanel Bleu",
        description: "Цитрусовый, древесный. Стойкость 8+ часов. Универсальный аромат на каждый день.",
        volumes: [
            { size: "50ml", price: 24000, oldPrice: 35000 },
            { size: "100ml", price: 34000, oldPrice: 45000 }
        ],
        catalogImage: "/static/images/41.WEBP",
        productImage: "/static/images/41.WEBP",
        additionalImages: [
            "/static/images/42.WEBP",
            "/static/images/43.WEBP",
            "/static/images/44.WEBP"
        ],
        badge: "⭐"
    },
    // КАК ДОБАВЛЯТЬ НОВЫЕ ТОВАРЫ:
    // 5: {
    //     brand: "Название бренда",
    //     name: "Название товара",
    //     description: "Описание товара",
    //     volumes: [
    //         { size: "50ml", price: ЦЕНА, oldPrice: СТАРАЯ_ЦЕНА },
    //         { size: "100ml", price: ЦЕНА, oldPrice: СТАРАЯ_ЦЕНА }
    //     ],
    //     catalogImage: "/static/images/ИМЯ_ФАЙЛА.tiff",
    //     productImage: "/static/images/ИМЯ_ФАЙЛА.tiff",
    //     additionalImages: [
    //         "/static/images/ИМЯ_ФАЙЛА_1.tiff",
    //         "/static/images/ИМЯ_ФАЙЛА_2.tiff"
    //     ],
    //     badge: "🔥" // или "NEW", "⭐", etc.
    // },
    // Дублируйте этот блок и меняйте цифру и данные
};

// Глобальные переменные
let cart = [];
let currentProduct = null;
let selectedVolumeIndex = 0;
let currentDelivery = 'pickup';
let userTelegramTag = '';

// Элементы DOM
const productCards = document.querySelectorAll('.product-card');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const productPage = document.getElementById('productPage');
const backBtn = document.getElementById('backBtn');
const checkoutButton = document.getElementById('checkoutButton');
const orderModal = document.getElementById('orderModal');
const addToCartBtn = document.getElementById('addToCartBtn');

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    initTelegramUser();
    initEventListeners();
    loadCart();
    
    // Устанавливаем разные изображения для товаров в каталоге
    setupCatalogImages();
    
    // Скрываем все модалки при загрузке
    closeCartModal();
    closeOrderModal();
    hideProductPage();
});

// Установка разных изображений для товаров в каталоге
function setupCatalogImages() {
    console.log('Устанавливаем изображения для каталога');
    
    productCards.forEach(card => {
        const productId = parseInt(card.dataset.productId);
        const product = products[productId];
        
        if (product) {
            // Устанавливаем изображение
            const imgElement = card.querySelector('.product-image img');
            if (imgElement) {
                imgElement.src = product.catalogImage;
                imgElement.alt = product.name;
            }
            
            // Устанавливаем невидимое поле бренда для поиска
            const brandElement = document.createElement('div');
            brandElement.className = 'product-brand';
            brandElement.textContent = product.brand;
            card.appendChild(brandElement);
            
            // Устанавливаем цены
            const priceContainer = card.querySelector('.product-price-container');
            if (priceContainer) {
                const volume = product.volumes[0]; // Первый объем по умолчанию
                const discountPercent = Math.round((1 - volume.price / volume.oldPrice) * 100);
                
                priceContainer.innerHTML = `
                    <div class="price-row">
                        <span class="old-price">${volume.oldPrice.toLocaleString('ru-RU')}₽</span>
                        <span class="current-price">${volume.price.toLocaleString('ru-RU')}₽</span>
                        <span class="discount-badge">-${discountPercent}%</span>
                    </div>
                    <div class="product-name">${product.name}</div>
                `;
            }
        }
    });
}

function initTelegramUser() {
    if (tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        userTelegramTag = user.username ? `@${user.username}` : `ID: ${user.id}`;
        document.getElementById('userTagValue').textContent = userTelegramTag;
    }
}

function initEventListeners() {
    console.log('Инициализация обработчиков событий');
    
    // Клик по карточке товара
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Клик по карточке товара');
            const productId = parseInt(this.dataset.productId);
            showProductPage(productId);
        });
    });
    
    // Кнопка "Назад" на странице товара
    backBtn.addEventListener('click', hideProductPage);
    
    // Кнопка корзины
    cartButton.addEventListener('click', openCartModal);
    
    // Кнопка "Добавить в корзину"
    addToCartBtn.addEventListener('click', addCurrentProductToCart);
    
    // Кнопка "Оформить заказ" в корзине
    checkoutButton.addEventListener('click', openOrderModal);
    
    // Доставка
    document.querySelectorAll('.delivery-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.delivery-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDelivery = this.dataset.delivery;
            
            const addressField = document.getElementById('addressField');
            addressField.style.display = currentDelivery !== 'pickup' ? 'block' : 'none';
        });
    });
    
    // Отправка формы заказа
    document.getElementById('orderForm').addEventListener('submit', submitOrder);
    
    // Клик вне модалок для закрытия
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) closeCartModal();
        if (e.target === orderModal) closeOrderModal();
    });
}

// Корзина
function addCurrentProductToCart() {
    console.log('Клик на "Добавить в корзину"');
    
    if (!currentProduct) {
        console.error('Нет текущего продукта');
        return;
    }
    
    const product = products[currentProduct];
    if (!product) {
        console.error('Продукт не найден:', currentProduct);
        return;
    }
    
    const selectedVolume = product.volumes[selectedVolumeIndex];
    if (!selectedVolume) {
        console.error('Объем не найден');
        return;
    }
    
    const cartItem = {
        id: Date.now(),
        productId: currentProduct,
        name: product.name,
        volume: selectedVolume.size,
        price: selectedVolume.price,
        oldPrice: selectedVolume.oldPrice,
        quantity: 1
    };
    
    console.log('Добавляем в корзину:', cartItem);
    
    // Проверяем, есть ли уже такой товар
    const existingIndex = cart.findIndex(item => 
        item.productId === cartItem.productId && item.volume === cartItem.volume
    );
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity++;
    } else {
        cart.push(cartItem);
    }
    
    saveCart();
    updateCartUI();
    
    // Уведомление
    tg.showPopup({
        title: '✅ Добавлено',
        message: `${product.name} (${selectedVolume.size}) добавлен в корзину`,
        buttons: [{ type: 'ok' }]
    });
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    // Обновляем счетчик
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Обновляем список товаров
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">Корзина пуста</div>';
        cartTotalPrice.textContent = '0₽';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-volume">${item.volume} × ${item.quantity} шт.</div>
            </div>
            <div class="cart-item-right">
                <div class="cart-item-price">${itemTotal.toLocaleString('ru-RU')}₽</div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                    Удалить
                </button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    cartTotalPrice.textContent = `${totalPrice.toLocaleString('ru-RU')}₽`;
}

function saveCart() {
    localStorage.setItem('parfumCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('parfumCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Функция для смены дополнительных изображений
function changeAdditionalImage(imageIndex) {
    const product = products[currentProduct];
    if (!product || !product.additionalImages || !product.additionalImages[imageIndex]) return;
    
    const mainImage = document.getElementById('productPageImage');
    mainImage.src = product.additionalImages[imageIndex];
    
    // Обновляем активный класс
    document.querySelectorAll('.additional-image').forEach((img, index) => {
        img.classList.toggle('active', index === imageIndex);
    });
}

// Страница товара
function showProductPage(productId) {
    console.log('Показываем страницу товара ID:', productId);
    
    currentProduct = productId;
    const product = products[productId];
    
    if (!product) {
        console.error('Продукт не найден:', productId);
        return;
    }
    
    console.log('Найден продукт:', product);
    console.log('Дополнительные изображения:', product.additionalImages);
    
    // Заполняем данные
    document.getElementById('productPageTitle').textContent = product.name;
    document.getElementById('productPageName').textContent = product.name;
    document.getElementById('productPageDescription').textContent = product.description;
    
    // Устанавливаем основное изображение
    const productImage = document.getElementById('productPageImage');
    if (productImage) {
        productImage.src = product.productImage;
        productImage.alt = product.name;
    }
    
    // Устанавливаем дополнительные изображения если они есть
    const additionalImagesContainer = document.getElementById('productImagesSection');
    if (additionalImagesContainer) {
        additionalImagesContainer.innerHTML = '';
        
        if (product.additionalImages && product.additionalImages.length > 0) {
            console.log('Дополнительных изображений:', product.additionalImages.length);
            
            // ВСЕ ИЗОБРАЖЕНИЯ (основное + дополнительные)
            const allImages = [product.productImage, ...product.additionalImages];
            let currentImageIndex = 0;
            
            // Заголовок блока
            const title = document.createElement('div');
            title.className = 'images-section-title';
            title.textContent = 'Фотографии товара';
            additionalImagesContainer.appendChild(title);
            
            // Большое основное фото
            const mainImageContainer = document.createElement('div');
            mainImageContainer.className = 'main-product-image';
            mainImageContainer.innerHTML = `<img id="mainDisplayImage" src="${product.productImage}" alt="${product.name}">`;
            additionalImagesContainer.appendChild(mainImageContainer);
            
            // Счетчик фото
            const counter = document.createElement('div');
            counter.className = 'image-counter';
            counter.id = 'imageCounter';
            counter.textContent = `Фото 1 из ${allImages.length}`;
            additionalImagesContainer.appendChild(counter);
            
            // Миниатюры
            const thumbnailsContainer = document.createElement('div');
            thumbnailsContainer.className = 'additional-images-container';
            
            allImages.forEach((imageUrl, index) => {
                const thumb = document.createElement('div');
                thumb.className = `image-thumbnail ${index === 0 ? 'active' : ''}`;
                thumb.dataset.index = index;
                
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `${product.name} ${index + 1}`;
                img.onerror = function() {
                    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23111"/><text x="50" y="55" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle">Нет фото</text></svg>';
                };
                
                const number = document.createElement('div');
                number.className = 'thumbnail-number';
                number.textContent = index + 1;
                
                thumb.appendChild(img);
                thumb.appendChild(number);
                
                thumb.addEventListener('click', () => {
                    changeImage(index);
                });
                
                thumbnailsContainer.appendChild(thumb);
            });
            
            additionalImagesContainer.appendChild(thumbnailsContainer);
            
            // Индикаторы (точки)
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'image-dots-container';
            
            allImages.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = `image-dot ${index === 0 ? 'active' : ''}`;
                dot.dataset.index = index;
                
                dot.addEventListener('click', () => {
                    changeImage(index);
                });
                
                dotsContainer.appendChild(dot);
            });
            
            additionalImagesContainer.appendChild(dotsContainer);
            
            // Кнопки навигации
            const navContainer = document.createElement('div');
            navContainer.className = 'image-nav-buttons';
            navContainer.innerHTML = `
                <button class="nav-btn prev-btn" id="prevImageBtn">
                    ← Предыдущее
                </button>
                <button class="nav-btn next-btn" id="nextImageBtn">
                    Следующее →
                </button>
            `;
            
            additionalImagesContainer.appendChild(navContainer);
            
            // Функция смены изображения
            function changeImage(index) {
                if (index < 0) index = allImages.length - 1;
                if (index >= allImages.length) index = 0;
                
                currentImageIndex = index;
                document.getElementById('mainDisplayImage').src = allImages[index];
                document.getElementById('imageCounter').textContent = `Фото ${index + 1} из ${allImages.length}`;
                
                // Обновляем активные миниатюры
                document.querySelectorAll('.image-thumbnail').forEach(thumb => {
                    const thumbIndex = parseInt(thumb.dataset.index);
                    thumb.classList.toggle('active', thumbIndex === index);
                });
                
                // Обновляем активные точки
                document.querySelectorAll('.image-dot').forEach(dot => {
                    const dotIndex = parseInt(dot.dataset.index);
                    dot.classList.toggle('active', dotIndex === index);
                });
            }
            
            // Обработчики кнопок
            document.getElementById('prevImageBtn').addEventListener('click', () => {
                changeImage(currentImageIndex - 1);
            });
            
            document.getElementById('nextImageBtn').addEventListener('click', () => {
                changeImage(currentImageIndex + 1);
            });
            
            // Свайпы для мобильных
            let touchStartX = 0;
            let touchEndX = 0;
            
            mainImageContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            mainImageContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Свайп влево → следующее фото
                        changeImage(currentImageIndex + 1);
                    } else {
                        // Свайп вправо → предыдущее фото
                        changeImage(currentImageIndex - 1);
                    }
                }
            }
            
            additionalImagesContainer.style.display = 'block';
        } else {
            console.log('Нет дополнительных изображений');
            additionalImagesContainer.style.display = 'none';
            
            // Все равно показываем основное фото
            const mainImageContainer = document.createElement('div');
            mainImageContainer.className = 'main-product-image';
            mainImageContainer.innerHTML = `<img src="${product.productImage}" alt="${product.name}">`;
            additionalImagesContainer.appendChild(mainImageContainer);
            additionalImagesContainer.style.display = 'block';
        }
    }
    
    // Остальной код остается...
    // Заполняем объемы
    const volumeOptions = document.getElementById('volumeOptions');
    volumeOptions.innerHTML = '';
    
    product.volumes.forEach((volume, index) => {
        const discountPercent = Math.round((1 - volume.price / volume.oldPrice) * 100);
        
        const option = document.createElement('div');
        option.className = `volume-option ${index === 0 ? 'active' : ''}`;
        option.innerHTML = `
            <div>${volume.size}</div>
            <div style="font-size: 0.8em; color: #666; text-decoration: line-through;">${volume.oldPrice.toLocaleString('ru-RU')}₽</div>
            <div style="color: #00bfff; font-weight: bold;">${volume.price.toLocaleString('ru-RU')}₽</div>
            <div style="font-size: 0.7em; color: #ff0080;">-${discountPercent}%</div>
        `;
        option.addEventListener('click', () => selectVolume(index));
        volumeOptions.appendChild(option);
    });
    
    // Устанавливаем первый объем
    selectVolume(0);
    
    // Показываем страницу товара и скрываем главную
    productPage.style.display = 'block';
    document.querySelector('.container').style.display = 'none';
}

// Вспомогательные функции для создания элементов
function createImageThumbnail(imageUrl, altText, index, isActive) {
    const container = document.createElement('div');
    container.className = `additional-image-thumb ${isActive ? 'active' : ''}`;
    container.style.cssText = `
        width: 80px;
        height: 80px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid ${isActive ? '#00bfff' : 'transparent'};
        flex-shrink: 0;
    `;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;
    img.onerror = function() {
        this.style.display = 'none';
        this.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;color:#666;font-size:0.8em;">Нет фото</div>';
    };
    
    container.appendChild(img);
    container.addEventListener('click', () => {
        document.getElementById('productPageImage').src = imageUrl;
        document.querySelectorAll('.additional-image-thumb').forEach(thumb => {
            thumb.style.borderColor = 'transparent';
        });
        container.style.borderColor = '#00bfff';
        
        // Обновляем точки
        const dots = document.querySelectorAll('.image-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });
    
    return container;
}

function createDotIndicator(index, isActive) {
    const dot = document.createElement('div');
    dot.className = `image-dot ${isActive ? 'active' : ''}`;
    dot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${isActive ? '#00bfff' : '#333'};
        cursor: pointer;
    `;
    dot.addEventListener('click', () => {
        changeAdditionalImage(index);
        document.querySelectorAll('.image-dot').forEach(d => {
            d.style.background = '#333';
        });
        dot.style.background = '#00bfff';
    });
    return dot;
}

// Функция для смены изображений
function changeAdditionalImage(imageIndex) {
    const product = products[currentProduct];
    if (!product) return;
    
    let imageUrl;
    if (imageIndex === 0) {
        imageUrl = product.productImage;
    } else {
        imageUrl = product.additionalImages[imageIndex - 1];
    }
    
    if (imageUrl) {
        const mainImage = document.getElementById('productPageImage');
        mainImage.src = imageUrl;
        
        // Обновляем активный класс у миниатюр
        document.querySelectorAll('.additional-image-thumb').forEach((thumb, index) => {
            thumb.style.borderColor = index === imageIndex ? '#00bfff' : 'transparent';
        });
        
        // Обновляем активный класс у точек
        document.querySelectorAll('.image-dot').forEach((dot, index) => {
            dot.style.background = index === imageIndex ? '#00bfff' : '#333';
        });
    }
}

function hideProductPage() {
    productPage.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

function selectVolume(index) {
    selectedVolumeIndex = index;
    const product = products[currentProduct];
    const volume = product.volumes[index];
    
    // Обновляем активный класс
    document.querySelectorAll('.volume-option').forEach((opt, i) => {
        opt.classList.toggle('active', i === index);
    });
    
    // Обновляем цены
    const discountPercent = Math.round((1 - volume.price / volume.oldPrice) * 100);
    document.getElementById('productPagePrice').innerHTML = `
        <div class="product-page-price-row">
            <span class="product-page-old-price">${volume.oldPrice.toLocaleString('ru-RU')}₽</span>
            <span class="product-page-current-price">${volume.price.toLocaleString('ru-RU')}₽</span>
            <span class="product-page-discount">-${discountPercent}%</span>
        </div>
    `;
}

// Модалки
function openCartModal() {
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function openOrderModal() {
    if (cart.length === 0) {
        tg.showPopup({
            title: 'Корзина пуста',
            message: 'Добавьте товары в корзину',
            buttons: [{ type: 'ok' }]
        });
        return;
    }
    
    closeCartModal();
    
    // Формируем детали заказа
    const orderSummary = document.getElementById('orderSummary');
    let summaryHTML = '';
    let totalPrice = 0;
    let totalOldPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemOldTotal = item.oldPrice * item.quantity;
        totalPrice += itemTotal;
        totalOldPrice += itemOldTotal;
        summaryHTML += `<div>${item.name} (${item.volume}) × ${item.quantity} шт. - ${itemTotal.toLocaleString('ru-RU')}₽</div>`;
    });
    
    const discountPercent = Math.round((1 - totalPrice / totalOldPrice) * 100);
    
    orderSummary.innerHTML = `
        ${summaryHTML}
        <div style="margin-top: 10px; color: #666; text-decoration: line-through;">
            Было: ${totalOldPrice.toLocaleString('ru-RU')}₽
        </div>
        <div style="color: #ff0080;">
            Скидка: -${discountPercent}%
        </div>
    `;
    document.getElementById('summaryTotal').textContent = `${totalPrice.toLocaleString('ru-RU')}₽`;
    
    orderModal.style.display = 'block';
}

function closeOrderModal() {
    orderModal.style.display = 'none';
}

// Отправка заказа
async function submitOrder(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-order-btn');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = '⏳ Отправляем...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Формируем данные заказа
        const orderData = {
            cart: cart,
            total_price: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            total_old_price: cart.reduce((sum, item) => sum + (item.oldPrice * item.quantity), 0),
            total_items: cart.reduce((sum, item) => sum + item.quantity, 0),
            customer_name: document.getElementById('customerName').value || 'Не указано',
            telegram_tag: userTelegramTag,
            delivery_type: currentDelivery,
            address: currentDelivery !== 'pickup' ? document.getElementById('address').value : 'Самовывоз: м. Авиамоторная',
            comments: document.getElementById('comments').value || 'Нет комментариев'
        };
        
        // Отправляем на сервер
        const response = await fetch('/place_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            submitBtn.textContent = '✅ Успешно!';
            
            // Очищаем корзину
            cart = [];
            saveCart();
            updateCartUI();
            
            // Закрываем через 1.5 секунды
            setTimeout(() => {
                closeOrderModal();
                closeCartModal();
                
                tg.showPopup({
                    title: '🎉 Заказ оформлен!',
                    message: 'Я свяжусь с вами в Telegram в течение 5 минут',
                    buttons: [{ type: 'ok' }]
                });
                
                // Сбрасываем форму
                document.getElementById('orderForm').reset();
                document.getElementById('addressField').style.display = 'none';
                
            }, 1500);
            
        } else {
            throw new Error(result.error);
        }
        
    } catch (error) {
        submitBtn.textContent = '❌ Ошибка';
        
        tg.showPopup({
            title: 'Ошибка',
            message: 'Не удалось отправить заказ. Попробуйте снова',
            buttons: [{ type: 'ok' }]
        });
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 2000);
        
        console.error('Order error:', error);
    }
}

// Глобальные функции
window.removeFromCart = removeFromCart;
window.closeCartModal = closeCartModal;
window.closeOrderModal = closeOrderModal;

// Проверка ширины экрана для правильного отображения колонок
function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const catalog = document.querySelector('.catalog');
    
    if (catalog) {
        if (screenWidth >= 375 && screenWidth <= 600) {
            catalog.style.gridTemplateColumns = 'repeat(2, 1fr)';
            catalog.style.maxWidth = '100%';
        }
        
        if (screenWidth < 375) {
            catalog.style.gridTemplateColumns = '1fr';
            catalog.style.maxWidth = '340px';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    setTimeout(checkScreenWidth, 500);
});