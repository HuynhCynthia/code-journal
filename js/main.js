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

  if (data.editing === null && $formTitle.textContent === 'New Entry') {
    formValues.entryId = $entryId;
    formValues.title = $title;
    formValues.url = $url;
    formValues.notes = $notes;

    $imageURL.src = 'images/placeholder-image-square.jpg';
    data.nextEntryId = $entryId + 1;
    data.entries.push(formValues);
    document.querySelector('.form-container').reset();

    $ulElement.prepend(renderEntry(formValues));
    toggleNoEntries();
    viewSwap('entries');
  } else {
    data.editing.title = $form.elements.title.value;
    data.editing.url = $form.elements.url.value;
    data.editing.notes = $form.elements.notes.value;

    var newObject = {};
    newObject.entryId = data.editing.entryId;
    newObject.title = data.editing.title;
    newObject.url = data.editing.url;
    newObject.notes = data.editing.notes;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newObject.entryId) {
        data.entries[i].title = newObject.title;
        data.entries[i].url = newObject.url;
        data.entries[i].notes = newObject.notes;
      }
    }

    var $liElement = document.querySelectorAll('li');

    for (let i = 0; i < $liElement.length; i++) {
      if (Number($liElement[i].getAttribute('data-entry-id')) === newObject.entryId) {
        $liElement[i].replaceWith(renderEntry(newObject));

      }
    }

    $formTitle.textContent = 'New Entry';
    data.editing = null;
    viewSwap('entries');
  }
}

function pencilClicked(e) {
  if (e.target.matches('I')) {
    viewSwap('entry-form');
    var dataEntryId = Number(e.target.closest('li').getAttribute('data-entry-id'));

    for (let i = 0; i < data.entries.length; i++) {
      if (dataEntryId === data.entries[i].entryId) {
        data.editing = data.entries[i];
        break;
      }
    }
    $titlePopulate.value = data.editing.title;
    $photoURL.value = data.editing.url;
    $notesID.value = data.editing.notes;
    $imageURL.src = data.editing.url;
    $formTitle.textContent = 'Edit Entry';

    $deleteButton.classList.remove('hidden');
  }
}

function renderEntry(entry) {
  var $newLiElement = document.createElement('li');
  var $newEntryDiv = document.createElement('div');
  var $newColumnHalfDiv = document.createElement('div');
  var $newEntryImgDiv = document.createElement('div');
  var $newImg = document.createElement('img');
  var $newDescriptionDiv = document.createElement('div');
  var $newEntryTitleContainer = document.createElement('div');
  var $newH1Element = document.createElement('h1');
  var $spacerDiv = document.createElement('div');
  var $iElement = document.createElement('i');
  var $newPElement = document.createElement('p');

  $newEntryDiv.className = 'entry-container';
  $newColumnHalfDiv.className = 'column-half';
  $newEntryImgDiv.className = 'entry-image';
  $newImg.src = entry.url;
  $newImg.className = 'image-url';
  $newDescriptionDiv.className = 'entry-description';
  $newH1Element.textContent = entry.title;
  $newPElement.textContent = entry.notes;
  $newEntryTitleContainer.className = 'entry-title-container flex';
  $spacerDiv.className = 'spacer';
  $iElement.className = 'fa-solid fa-pencil entry-form';

  $newLiElement.appendChild($newEntryDiv);
  $newEntryDiv.appendChild($newColumnHalfDiv);
  $newColumnHalfDiv.appendChild($newEntryImgDiv);
  $newColumnHalfDiv.appendChild($newDescriptionDiv);
  $newEntryImgDiv.appendChild($newImg);
  $newDescriptionDiv.appendChild($newEntryTitleContainer);
  $newEntryTitleContainer.appendChild($newH1Element);
  $newEntryTitleContainer.appendChild($spacerDiv);
  $newEntryTitleContainer.appendChild($iElement);
  $newDescriptionDiv.appendChild($newPElement);
  $newLiElement.setAttribute('data-entry-id', entry.entryId);

  return $newLiElement;

}

function pageReload(e) {
  if (data.view !== 'entry-form') {
    for (let i = 0; i < data.entries.length; i++) {
      $ulElement.prepend(renderEntry(data.entries[i]));
    }
  } else {
    viewSwap('entry-form');
  }

  toggleNoEntries();
}

function toggleNoEntries(dataEntries) {
  if (data.entries.length !== 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}

function viewSwap(viewType) {
  if (viewType === $entriesID.getAttribute('data-view')) {
    $entriesID.removeAttribute('class');
    $entryFormID.setAttribute('class', 'hidden');
    data.editing = null;
    // Ensure Edit Form is cleared out
    $formTitle.textContent = 'New Entry';
    var $form = document.querySelector('.form-container');
    $form.elements.title.value = '';
    $form.elements.url.value = '';
    $form.elements.notes.value = '';
    $imageURL.src = 'images/placeholder-image-square.jpg';
    // Ensure DOM tree reloads
    data.view = viewType;
    $deleteButton.classList.add('hidden');
  } else {
    $entriesID.setAttribute('class', 'hidden');
    $entryFormID.removeAttribute('class');
  }
  data.view = viewType;
}

function eventViewSwap(e) {
  if (e.target.className === $entryFormID.getAttribute('data-view')) {
    viewSwap('entry-form');
  } else {
    viewSwap('entries');
  }
}

function displayModal(e) {
  if (e.target.id === $deleteButton.id) {
    $modalDiv.classList.remove('hidden');
  } else {
    $modalDiv.classList.add('hidden');
  }
}

function removeEntry(e) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i);
    }
  }

  var $liElement = document.querySelectorAll('li');

  for (let i = 0; i < $liElement.length; i++) {
    if (Number($liElement[i].getAttribute('data-entry-id')) === data.editing.entryId) {
      $ulElement.removeChild($liElement[i]);
    }
  }

  $modalDiv.classList.add('hidden');
  toggleNoEntries(data.entries);
  viewSwap('entries');
}

var $photoURL = document.querySelector('#photourl');
var $imageURL = document.querySelector('.image-url');
var $submit = document.querySelector('form');
var $ulElement = document.querySelector('ul');
var $noEntries = document.querySelector('.no-entries');
var $entryFormID = document.querySelector('#entry-form');
var $entriesID = document.querySelector('#entries');
var $tabEntries = document.querySelector('#entries-tab');
var $newButton = document.querySelector('#new-button');
var $titlePopulate = document.querySelector('#title');
var $notesID = document.querySelector('#notes');
var $formTitle = document.querySelector('.new-entry');

var $deleteButton = document.querySelector('#delete-button');
var $modalDiv = document.querySelector('.modal');
var $cancelButton = document.querySelector('.cancel');
var $confirmButton = document.querySelector('.confirm');
$deleteButton.addEventListener('click', displayModal);
$cancelButton.addEventListener('click', displayModal);
$confirmButton.addEventListener('click', removeEntry);

$photoURL.addEventListener('paste', pastePhotoUrl);
$photoURL.addEventListener('input', inputPhotoUrl);
$submit.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', pageReload);
$tabEntries.addEventListener('click', eventViewSwap);
$newButton.addEventListener('click', eventViewSwap);
$ulElement.addEventListener('click', pencilClicked);
