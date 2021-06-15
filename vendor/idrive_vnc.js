/*
// IDrive VNC Java Script file
*/

var myRFB = null;

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
  let clipboardButton = document.getElementById('sendClipboardButton');
  clipboardButton.addEventListener("click", function() {
    if (!window.isSecureContext) {
      return;
    }
    if (myRFB === null) {
      return;
    }
    navigator.permissions.query({name: 'clipboard-read'}).then(result => {
      if (result.state != 'granted') {
        if (result.state == 'prompt') {
            clipboardButton.value = 'Prompted';
            navigator.clipboard.readText().then(() => {
              clipboardButton.value = 'Send Clipboard';
            });
        }
        return;
      }

      navigator.clipboard.readText().then(text => {
        getPastingText(text);
      }).catch(err => {
        clipboardButton.value = 'Send Clipboard';
      });
    });
  });

  function getPastingText(text) {
    let count = text.length;
    if (count === 0) {
      clipboardButton.value = 'Send Clipboard';
      return;
    }
    sendTextToConsole(text);

    // noVNC has a 50ms interval timer when sending keys.
    setTimeout(function() {
      clipboardButton.value = 'Send Clipboard';
    }, count * 50)
  }

  function sendTextToConsole(text) {
    let char = text[0];
    text = text.slice(1);
    let char_code = char.charCodeAt();
    let use_shift_key = char.match(/[A-Z!@#$%^&*()_+{}:"<>?~|]/);
    let enter_key = char == "\n";

    // handler enter_key and shift key chars
    if (enter_key) {
      myRFB.sendKey(0xff0d,0xff0d,true);
      myRFB.sendKey(0xff0d,0xff0d,false);
    } else {
      if (use_shift_key) {
        myRFB.sendKey(0xffe1,0xffe1,true);
        myRFB.sendKey(char_code,char_code,true);
        myRFB.sendKey(char_code,char_code,false);
        myRFB.sendKey(0xffe1,0xffe1,false);
      } else {
        myRFB.sendKey(char_code,char_code,true);
        myRFB.sendKey(char_code,char_code,false);
      }
    }
    // check for complete text
    if (text.length > 0) {
      setTimeout(sendTextToConsole, 50, text);
      return;
    }
  }
}
