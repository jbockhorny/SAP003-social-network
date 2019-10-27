// import locationHasChange from '../main.js';
import Button from '../components/button.js';
import Input from '../components/input.js';

function login() {
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      const user = {
        displayName: response.user.displayName
      };
      const usersCollection = firebase.firestore().collection('users');
      usersCollection.doc(response.user.uid).set(user);

      window.user = {
        displayName: response.user.displayName,
        email: response.user.email,
        uid: response.user.uid
      };
      window.location.hash = '#feed';
    })
    .catch(error => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function google() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(response => {
      window.user = {
        displayName: response.user.displayName,
        email: response.user.email,
        uid: response.user.uid
      };
      
      window.location.hash = '#feed';
    })
    .catch(error => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function TemplateLogin() {
  const template = `
    <div class="login">
      <div class='login-content'>
        <div>
          <img src="../../imagens/logo.png" alt="Logo do Moviment" class="login-logo">
          <h4 class="text-main">Bem vindo(a), atleta!</h4>
        </div>
        <div class='login-form'>
          <form class='form-login'>
            ${Input({
              class: 'js-email-input',
              placeholder: 'Email',
              type: 'email'
            })}
            ${Input({
              class: 'js-password-input',
              placeholder: 'Senha',
              type: 'password'
            })}
            ${Button({
              id: 'bt-login',
              class: '',
              title: 'Entrar',
              call: login
            })}
          </form>
        </div>
        <div>
          <p class='text-main'>Acesse também usando:</p>
          ${Button({
            id: 'bt-google',
            title: '<i class=""></i>',
            class: 'circle-button fab fa-google',
            call: google
          })}
          <p class="text-main">Não tem uma conta? <a href="#createAccount">Criar conta!</a></p>
        </div>
      </div>
    </div>
  `;

  window.location.hash = '#login';
  return template;
}

export default TemplateLogin;
