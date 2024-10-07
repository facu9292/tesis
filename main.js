let guardar = (id) => {
    localStorage.setItem("datos", id);
  };
  
  fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(e => {
            document.querySelector('.variedad').innerHTML += /*html*/ `
                <a id="${e.id}" href="./entradas.html" class="card" onClick="guardar(this.id)">
            
                <img class="img" src="${e.img.src}" alt="${e.img.alt}">
                <div class="nombre">${e.name}</div>
            
                </a>`;
        });});
  
