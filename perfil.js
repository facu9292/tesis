// script.js

// Simulación de un usuario y su historial de pedidos
let userProfile = {
    name: "Juan Pérez",
    email: "juanperez@example.com",
    phone: "123456789",
    address: "Calle Falsa 123, Ciudad, País",
    profilePic: "default-profile.png",  // Ruta inicial de la imagen de perfil
    orderHistory: [
        { id: 1, items: ["Pizza", "Coca Cola"], date: "2024-08-01" },
        { id: 2, items: ["Hamburguesa", "Papas Fritas"], date: "2024-08-05" }
    ]
};

// Elementos del DOM
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const ordersList = document.getElementById('orders');
const profileForm = document.getElementById('profileForm');
const profilePic = document.getElementById('profilePic');
const profilePicInput = document.getElementById('profilePicInput');

function loadProfile() {
    nameInput.value = userProfile.name;
    emailInput.value = userProfile.email;
    phoneInput.value = userProfile.phone;
    addressInput.value = userProfile.address;
    profilePic.src = userProfile.profilePic;  

    userProfile.orderHistory.forEach(order => {
        const li = document.createElement('li');
        li.textContent = `Pedido #${order.id}: ${order.items.join(", ")} - ${order.date}`;
        ordersList.appendChild(li);
    });
}

function saveProfile(event) {
    event.preventDefault();

    userProfile.name = nameInput.value;
    userProfile.email = emailInput.value;
    userProfile.phone = phoneInput.value;
    userProfile.address = addressInput.value;

    alert("Perfil actualizado correctamente");
}


function handleProfilePicChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
            userProfile.profilePic = e.target.result;  
        }
        reader.readAsDataURL(file);
    }
}


window.onload = loadProfile;


profileForm.addEventListener('submit', saveProfile);


profilePicInput.addEventListener('change', handleProfilePicChange);
