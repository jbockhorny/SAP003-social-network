import Button from '../components/button.js';
import Textarea from '../components/textarea.js';

function publish() {
  const textArea = document.querySelector('.textarea-post');

  if (!textArea.value) {
    alert('Digite uma mensagem!');
    return;
  }

  const fieldValue = firebase.firestore.FieldValue;
  const currentUser = firebase.auth().currentUser;
  const post = {
    user: currentUser.uid,
    displayName: currentUser.displayName || currentUser.email,
    text: textArea.value,
    coments: [],
    timestamp: fieldValue.serverTimestamp()
  };
  const postCollection = firebase.firestore().collection('posts');
  postCollection.add(post).then(() => {
    textArea.value = '';
    window.home.loadPost();
  });
  return post;
}

function logout() {
  window.user = undefined;
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location = '#login';
    });
}

function deletePost(event) {
  const id = event.target.dataset.id;
  firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .delete();
  event.target.parentElement.remove();
  window.home.loadPost();
}

function saveEdit(event) {
  const id = event.target.dataset.id;
  const textAreaEdit = document.querySelector('.edit-textarea');

  if (!textAreaEdit.value) {
    alert('Digite uma mensagem!');
    return;
  }

  firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      text: textAreaEdit.value
    });
  window.home.loadPost();
}

function editPost(event) {
  const postId = event.target.dataset.id;
  event.target.disabled = true;
  const postContent = document
    .getElementById(postId)
    .querySelector('.post-content');
  postContent.innerHTML = ` 
  ${window.textarea.component({
    class: 'edit-textarea',
    text: postContent.innerHTML
  })}
  ${window.button.component({
    dataId: postId,
    id: 'edit-button',
    class: 'oval-button ',
    title: 'Salvar',
    call: window.home.saveEdit
  })} `;
}

function feed() {
  const template = `
  <header>
    <div class='logo-header'>
      <img class='image-logo' src='../../imagens/movement-white-text.png'></img>
    </div>
    <div class='menu-right'>
      ${Button({
        id: 'logout',
        title: '',
        class: 'circle-button fas fa-sign-out-alt',
        call: logout
      })}
    </div>
  </header>
  <div>
    <div class='main-content'>
      <div class='user-info'>
        <div class='avatar'>
          <img src='https://source.unsplash.com/70x70/?person,${window.user.uid}' />
          ${window.user.displayName}<br />
        </div>
      </div>
      <div class='feed'>
        <div class='post-layout'>
          ${Textarea({ class: 'textarea-post' })}
          ${Button({
            id: 'publish',
            title: 'Publicar',
            class: '',
            call: publish
          })}
        </div>
        <div class='post-list'>
          <ul class='post-ul'>
          </ul>
        </div>
      </div>
    </div>
  </div>
`;
  return template;
}

function getActions(post, postId) {
  const currentUserId = firebase.auth().currentUser.uid;

  if (currentUserId === post.user) {
    return (
      window.button.component({
        dataId: postId,
        class: 'transparent-button far fa-edit',
        title: '',
        call: window.home.editPost
      }) +
      window.button.component({
        dataId: postId,
        title: '',
        class: 'transparent-button far fa-trash-alt',
        call: window.home.deletePost
      })
    );
  } else {
    return '';
  }
}

function addPost(post, postId) {
  const postTemplate = `
  <li id='${postId}' class='post-li'>
    <div class='post-header'>
      <div class='post-header-user'>
        <img src='https://source.unsplash.com/70x70/?person,${post.user}'></img>
        ${post.displayName || 'Anônimo'} | ${post.timestamp.toDate().toLocaleString('pt-BR')}
      </div>
      <div class='post-header-button'>
        ${window.home.getActions(post, postId)}
      </div>
    </div>
    <div class='post-content'>${post.text}</div>
  </li>
`;
  return postTemplate;
}
function loadPost() {
  const postCollection = firebase.firestore().collection('posts');
  const postList = document.querySelector('.post-ul');
  postCollection.orderBy('timestamp', 'desc').get().then(snap => {
    postList.innerHTML = '';
    snap.forEach(post => {
      postList.innerHTML += addPost(post.data(), post.id);
    });
  });
}
export default feed;

window.home = {
  editPost,
  deletePost,
  loadPost,
  saveEdit,
  addPost,
  getActions
};
