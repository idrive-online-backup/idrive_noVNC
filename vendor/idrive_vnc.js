/*
// IDrive VNC Java Script file
*/

function handleConnect() {
  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.focus();
  var height = canvas.scrollHeight;
  var width  = canvas.scrollWidth;

  var topBar = document.getElementById('top_bar');
  topBar.style.minWidth = width + 'px';
  topBar.style.position = 'absolute';
  topBar.style.bottom = 0;

  var body = document.getElementsByTagName('body')[0];
  body.style.minWidth = width + 'px';
  body.style.minHeight = height + 'px';
  body.style.overflow = 'auto';
  body.style.position = 'relavtive';

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('title');
  document.title = myParam;
}
