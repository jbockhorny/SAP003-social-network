// import locationHasChange from '../main.js';
import Button from '../components/button.js';
import Input from '../components/input.js';

function login() {
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      window.user = {
        email: response.user.email,
        uid: response.user.uid,
      };
      window.location.hash = '#feed';
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function google() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      if (result) {
        window.location.hash = '#feed';
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function TemplateLogin() {
  const template = `
    <img src="../../imagens/logo.png" alt="Logo do Moviment" class="image">
    <h4 class="text-main">Bem vinda, Moviment!</h4>
    <form class="form-login">
      ${Input({
    class: 'js-email-input',
    placeholder: 'e-mail',
    type: 'email',
  })}
      ${Input({
    class: 'js-password-input',
    placeholder: 'password',
    type: 'password',
  })}
      ${Button({
    id: 'bt-login', class: 'oval-button', title: 'Log in', call: login,
  })}
    </form>
    <p class="text-main">Acesse também usando:</p>
    ${Button({
    id: 'bt-google', title: '<i class="fab fa-google"></i>', class: 'circle-button', call: google,
  })}
   
    <p class="text-main">Não tem uma conta? <a href="#createAccount">Crie aqui sua conta!</a></p>
  `;

  window.location.hash = '#login';
  return template;
}

export default TemplateLogin;
