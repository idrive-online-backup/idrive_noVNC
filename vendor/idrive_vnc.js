/*
// IDrive VNC Java Script file
*/

function handleConnect() {
  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.focus();

  var height = canvas.scrollHeight;
  var width  = canvas.scrollWidth;

  var winHeight = window.innerHeight;
  var winWidth = window.innerWidth;

  var topBar = document.getElementById('top_bar');
  if ( winWidth > width ) {
    topBar.style.minWidth = width + 'px';
  } else {
    topBar.style.minWidth = winWidth + 'px';
  }

  var body = document.getElementsByTagName('body')[0];
  if ( winWidth > width ) {
    body.style.minWidth = width + 'px';
  } else {
    body.style.minWidth = winWidth + 'px';
  }
  if( winHeight > height ) {
    body.style.minHeight = height + 'px';
  } else {
    body.style.minHeight = winHeight + 'px';
  }

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('name');
  if ( myParam !== null && myParam.length > 0) {
    document.getElementById('status').textContent = "Connected to - " + myParam;
  }
}
