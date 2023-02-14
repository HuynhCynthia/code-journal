function pastePhotoUrl(e) {
  $imageURL.src = e.target.value;
}

function inputPhotoUrl(e) {
  $imageURL.src = e.target.value;
}

var $photoURL = document.querySelector('#photourl');
var $imageURL = document.querySelector('.image-url');

$photoURL.addEventListener('paste', pastePhotoUrl);
$photoURL.addEventListener('input', inputPhotoUrl);
