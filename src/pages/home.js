import Button from '../components/button.js';
import Textarea from '../components/textarea.js';

function publish() {
  const textArea = document.querySelector('.textarea-post');
  const fieldValue = firebase.firestore.FieldValue;
  const id = firebase.auth().currentUser.uid;
  const post = {
    user: id,
    text: textArea.value,
    coments: [],
    timestamp: fieldValue.serverTimestamp(),
  };
  const postColletion = firebase.firestore().collection('posts');
  postColletion.add(post).then(() => {
    textArea.value = '';
    window.home.loadPost();
    postColletion.get();
  });
  return post;
}

function logout() {
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
  firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      text: textAreaEdit.value,
    });
  window.home.loadPost();
}

function editPost(event) {
  const postId = event.target.dataset.id;
  const postText = document.getElementById(postId).querySelector('.post-text')
    .innerHTML;
  const postArea = document.getElementById(postId);
  postArea.innerHTML = ` 
  ${window.textarea.component({
    class: 'edit-textarea',
    text: postText,
  })}
  ${window.button.component({
    dataId: postId,
    id: 'edit-button',
    class: 'oval-button ',
    title: 'Salvar',
    call: window.home.saveEdit,
  })} `;
}

function feed() {
  const template = `
  <header class = 'header-feed'>
  <img class="image-logo" src="../../imagens/movement-green-text.png"></img>
  ${Button({
    id: 'logout',
    title: '<i class="fas fa-sign-out-alt"></i>',
    class: 'exit-button',
    call: logout,
  })}
  </header>
  <div class = 'display-name'>
    <img src='http://unsplash.it/70/70/?=sport' class='feed-avatar'></img>
    ${firebase.auth().currentUser.displayName}
  </div>
  <div class = 'post-layout'>
  ${Textarea({ class: 'textarea-post' })}
  ${Button({
    id: 'publish',
    title: 'Publicar',
    class: 'oval-button',
    call: publish,
  })}
  </div>
  <div class ='post-public'>
    <ul class='post-ul'>
    </ul>
  </div>
`;
  return template;
}

function addPost(post, postId) {
  const postTemplate = `
  <li id='${postId}' class='post-li'>
  <div class = 'post-displayname'>
    <img src='http://unsplash.it/50/50/?=sport' class='post-avatar'></img>
    ${firebase.auth().currentUser.displayName}
  </div>
  <div class= 'post-textarea'>
   <p class = 'post-time'>
   ${post.timestamp.toDate().toLocaleString('pt-BR')}:
   </p>
    <p class = 'post-text'> ${post.text} </p>
  </div>
  <div class = 'post-button'>
    ${window.button.component({
    dataId: postId,
    title: '',
    class: 'circle-button far fa-trash-alt',
    call: window.home.deletePost,
  })}
    ${window.button.component({
    dataId: postId,
    class: 'circle-button far fa-edit',
    title: '',
    call: window.home.editPost,
  })}
</div>
</li>
`;
  return postTemplate;
}
function loadPost() {
  const postColletion = firebase
    .firestore()
    .collection('posts')
    .where('user', '==', window.user.uid);
  const postList = document.querySelector('.post-ul');
  postColletion.get().then((snap) => {
    postList.innerHTML = '';
    snap.forEach((post) => {
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
};
