/*
// IDrive VNC Java Script file
*/

var myRFB = null;
const enterKeyCode = 0xff0d;
const shiftKeyCode = 0xffe1;

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

  // Handle Clipboard Paste
  let clipboardButton = document.getElementById('getClipboardButton');
  clipboardButton.addEventListener("click", function() {
    if (!window.isSecureContext || null === myRFB) {
      return;
    }

    navigator.permissions.query({name: 'clipboard-read'}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.readText().then(text => {
          if (text.length > 0) {
            sendClipBoardTextToConsole(text);
          }
        });
      }
    });
  });

  function sendClipBoardTextToConsole(text) {
    let char = text[0];
    text = text.slice(1);
    let char_code = char.charCodeAt();

    if ("\n" === char) {
      myRFB.sendKey(enterKeyCode,enterKeyCode,true);
      myRFB.sendKey(enterKeyCode,enterKeyCode,false);
    } else {
      if (char.match(/[A-Z!@#$%^&*()_+{}:"<>?~|]/)) {
        myRFB.sendKey(shiftKeyCode,shiftKeyCode,true);
        myRFB.sendKey(char_code,char_code,true);
        myRFB.sendKey(char_code,char_code,false);
        myRFB.sendKey(shiftKeyCode,shiftKeyCode,false);
      } else {
        myRFB.sendKey(char_code,char_code,true);
        myRFB.sendKey(char_code,char_code,false);
      }
    }
    // check for complete text
    if (text.length > 0) {
      setTimeout(sendClipBoardTextToConsole, 50, text);
      return;
    }
  }
}
