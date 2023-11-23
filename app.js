
const gestorDeNotas = {
    notas: [],
  
    agregarNota: function (nuevaNota) {
      this.notas.push({ id: Date.now(), contenido: nuevaNota });
      this.guardarNotasEnLocalStorage();
      this.mostrarNotas();
  
      Swal.fire({
        icon: 'success',
        title: 'Nota Agregada',
        text: 'La nota se ha agregado correctamente.',
      });
    },
  
    borrarNota: function (notaId) {
      this.notas = this.notas.filter((nota) => nota.id !== notaId);
      this.guardarNotasEnLocalStorage();
      this.mostrarNotas();
    },
  
    mostrarNotas: function () {
      const lista = document.getElementById('nota-lista');
      lista.innerHTML = '';
  
      this.notas.forEach((nota) => {
        const li = document.createElement('li');
        li.textContent = nota.contenido;
  
        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Borrar';
        botonBorrar.addEventListener('click', () => this.borrarNota(nota.id));
  
        li.appendChild(botonBorrar);
        lista.appendChild(li);
      });
    },
  
    guardarNotasEnLocalStorage: function () {
      localStorage.setItem('notas', JSON.stringify(this.notas));
    },
  
    cargarNotasDesdeLocalStorage: function () {
      const notasGuardadas = localStorage.getItem('notas');
      if (notasGuardadas) {
        this.notas = JSON.parse(notasGuardadas);
      }
    },
  };
  
  document.getElementById('cargar-datos').addEventListener('click', function () {
    const cantidadNotasDeseada = 5;
  
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const datosLimitados = data.slice(0, cantidadNotasDeseada);
  
        datosLimitados.forEach((post) => {
          gestorDeNotas.agregarNota(post.title);
        });
  
        Swal.fire({
          icon: 'success',
          title: 'Datos Cargados',
          text: `Se han cargado ${cantidadNotasDeseada} notas desde la API.`,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al cargar datos desde la API.',
        });
        console.error('Error al cargar datos desde la API:', error);
      });
  });
  
  function agregarNota() {
    const inputNota = document.getElementById('nueva-nota');
    const nuevaNota = inputNota.value.trim();
  
    if (nuevaNota !== '') {
      gestorDeNotas.agregarNota(nuevaNota);
      inputNota.value = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El contenido de la nota no puede estar vacío.',
      });
    }
  }
  
  window.onload = function () {
    gestorDeNotas.cargarNotasDesdeLocalStorage();
    gestorDeNotas.mostrarNotas();
  };
  