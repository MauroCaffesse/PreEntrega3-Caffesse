export const usuarios = [
  {
    id: 1,
    user: "Mauro",
    password: "mauro123",
    admin: true,
  },
];

JSON.parse(localStorage.getItem("usuarios")) ||
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
