import Button from '../components/button.js';
import Input from '../components/input.js';

function newUser() {
  const name = document.querySelector('.js-name-input').value;
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;

  if (!name || !email || !password) {
    alert('Preencha todos os campos!');
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      response.user.updateProfile({
        displayName: name
      });
      window.location.hash = '#login';
      const user = firebase.auth().currentUser;
      user
        .sendEmailVerification()
        .then(() => {})
        .catch(() => {});
    })
    .catch(error => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function newUserTemplate() {
  const inNewUser = `
    <form class='form-login'>
      ${Input({ class: 'js-name-input', placeholder: 'Nome', type: 'text' })} 
      ${Input({ class: 'js-email-input', placeholder: 'Email', type: 'email' })}
      ${Input({
        class: 'js-password-input',
        placeholder: 'Senha',
        type: 'password'
      })}
      ${Button({
        id: 'bt-creat-account',
        title: 'Criar conta',
        class: '',
        call: newUser
      })}
    </form>
      
  `;

  const template = `
  <div class="login">
    <div class='login-content'>
      <div>
        <img src="../../imagens/logo.png" alt="Logo do Moviment" class="login-logo">
        <h4 class="text-main">Bem vindo(a), atleta!</h4>
      </div>
      <div class='login-form'>
        <p>Para se cadastrar, preencha as informações</p>
        ${inNewUser}
      </div>
      <div>
        <p class="text-main">Já tem uma conta? <a href="#login">Entrar!</a></p>
      </div>
    </div>
  </div>
`;

  return template;
}

export default newUserTemplate;
