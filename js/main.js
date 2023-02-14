function pastePhotoUrl(e) {
  $imageURL.src = e.target.value;
}

function inputPhotoUrl(e) {
  $imageURL.src = e.target.value;
}

function handleSubmit(e) {
  event.preventDefault();

  var formValues = {};

  var $form = document.querySelector('.form-container');
  var $title = $form.elements.title.value;
  var $url = $form.elements.url.value;
  var $notes = $form.elements.notes.value;
  var $entryId = data.nextEntryId;

  formValues.entryId = $entryId;
  formValues.title = $title;
  formValues.url = $url;
  formValues.notes = $notes;

  $imageURL.src = 'images/placeholder-image-square.jpg';
  data.nextEntryId = $entryId + 1;
  data.entries.push(formValues);
  document.querySelector('.form-container').reset();
}

var $photoURL = document.querySelector('#photourl');
var $imageURL = document.querySelector('.image-url');
var $submit = document.querySelector('form');

$photoURL.addEventListener('paste', pastePhotoUrl);
$photoURL.addEventListener('input', inputPhotoUrl);
$submit.addEventListener('submit', handleSubmit);
