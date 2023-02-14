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

function renderEntry(entry) {
  var $newLiElement = document.createElement('li');
  var $newEntryDiv = document.createElement('div');
  var $newColumnHalfDiv = document.createElement('div');
  var $newEntryImgDiv = document.createElement('div');
  var $newImg = document.createElement('img');
  var $newDescriptionDiv = document.createElement('div');
  var $newH1Element = document.createElement('h1');
  var $newPElement = document.createElement('p');

  $newEntryDiv.className = 'entry-container';
  $newColumnHalfDiv.className = 'column-half';
  $newEntryImgDiv.className = 'entry-image';
  $newImg.src = entry.url;
  $newImg.className = 'image-url';
  $newDescriptionDiv.className = 'entry-description';
  $newH1Element.textContent = entry.title;
  $newPElement.textContent = entry.notes;

  $newLiElement.appendChild($newEntryDiv);
  $newEntryDiv.appendChild($newColumnHalfDiv);
  $newColumnHalfDiv.appendChild($newEntryImgDiv);
  $newColumnHalfDiv.appendChild($newDescriptionDiv);
  $newEntryImgDiv.appendChild($newImg);
  $newDescriptionDiv.appendChild($newH1Element);
  $newDescriptionDiv.appendChild($newPElement);

  return $newLiElement;

}

var $photoURL = document.querySelector('#photourl');
var $imageURL = document.querySelector('.image-url');
var $submit = document.querySelector('form');

$photoURL.addEventListener('paste', pastePhotoUrl);
$photoURL.addEventListener('input', inputPhotoUrl);
$submit.addEventListener('submit', handleSubmit);
renderEntry(data.entries[2]);
