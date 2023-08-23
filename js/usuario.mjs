const btnRegister = document.getElementById("btn__register");
const formRegister = document.getElementById("user__register");
const formLogin = document.getElementById("user__login");
const btnLogin = document.getElementById("btn__login");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

class newUser {
  constructor(user, password) {
    this.id = usuarios.length + 1;
    this.user = user;
    this.pass = password;
    this.admin = false;
  }
}

const validarYlogear = (user, password) => {
  const userExiste = usuarios.find((usuario) => usuario?.user === user);

  if (userExiste === undefined || userExiste.password !== password) {
    alert("error en usuario o contraseña");
  } else {
    alert(`Bienvenido ${user}`);

    let usuario = {
      user: userExiste.user,
      pass: userExiste.password,
      admin: userExiste.admin,
    };

    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.href = "../index.html";
  }
};

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const user = formLogin?.children[0].children[1].value;
  const password = formLogin?.children[1].children[1].value;

  validarYlogear(user, password);
});

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();

  const user = formRegister.children[0].children[1].value;
  const pass = formRegister.children[1].children[1].value;

  const nuevoUsuario = new newUser(user, pass);

  validarYRegistrar(nuevoUsuario);
});

const validarYRegistrar = (nuevoUsuario) => {
  const userNuevo = usuarios.find(
    (usuario) => usuario?.user === nuevoUsuario.user
  );
  if (userNuevo === undefined) {
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    alert(
      `Gracias ${nuevoUsuario.user} por registrarte.. usted sera redirigido a la pagina principal`
    );
    console.log(usuarios);
    location.href = "../index.html";
  } else {
    alert(`El usuario ya existe`);

    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.href = "../inicio.html";
  }
};
