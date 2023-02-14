function pastePhotoUrl(e) {
  $imageURL.src = e.clipboardData.getData('text/plain');
}

var $photoURL = document.querySelector('#photourl');
var $imageURL = document.querySelector('.image-url');

$photoURL.addEventListener('paste', pastePhotoUrl);
