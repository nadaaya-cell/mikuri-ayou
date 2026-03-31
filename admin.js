const productForm = document.getElementById('productForm');
const productGrid = document.getElementById('productGrid');
const exportBtn = document.getElementById('exportBtn');
const exportArea = document.getElementById('exportArea');

let products = [];

// Add product
productForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const formLink = document.getElementById('formLink').value;
  const imageFile = document.getElementById('image').files[0];

  const reader = new FileReader();
  reader.onload = function(){
    const imageSrc = reader.result;
    const product = { name, price, formLink, imageSrc };
    products.push(product);
    displayProducts();
    productForm.reset();
  };
  reader.readAsDataURL(imageFile);
});

// Display products
function displayProducts(){
  productGrid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${p.imageSrc}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <a href="${p.formLink}" target="_blank">Order Now</a>
    `;
    productGrid.appendChild(card);
  });
}

// Export products to HTML
exportBtn.addEventListener('click', function(){
  let html = '';
  products.forEach(p => {
    html += `
<div class="product-card">
  <div class="product-image">
    <img src="${p.imageSrc}" alt="${p.name}">
  </div>
  <h3>${p.name}</h3>
  <p>${p.price}</p>
  <a href="${p.formLink}" target="_blank" class="order-btn">Order Now</a>
</div>
`;
  });
  exportArea.value = html;
});