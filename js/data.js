/* exported data */
function beforeUnloadListener(e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}

window.addEventListener('beforeunload', beforeUnloadListener);

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
