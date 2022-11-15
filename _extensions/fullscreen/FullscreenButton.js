/*****************************************************************
** Author: Joschka Schwarz, joschka.schwarz@gmail.com
**
** A plugin for reveal.js adding a Fullscreen Button to the Chalkboard Buttons.
**
**
** License: MIT license (see LICENSE.md)
**
** Credits:
** Chalkboard effect by Mohamed Moustafa https://github.com/mmoustafa/Chalkboard
** Fullscreen script (screenfull.min.js) by Sindre Sorhus https://github.com/sindresorhus/screenfull
** Compatibility with reveal.js v4 by Hakim El Hattab https://github.com/hakimel
******************************************************************/
window.RevealFullscreenButton = window.RevealFullscreenButton || {
    id: 'RevealFullscreenButton',
    init: function(deck) {
        initFullscreenButton(deck);
    }
};

const initFullscreenButton = function(Reveal) {

  Reveal.addEventListener( 'ready', function( event ) {

  // 1. Create Button
  const button = document.createElement("span");
  button.title = "Toggle Fullscreen";
  button.id = "fs-tooltip"
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-expand");
  button.appendChild(icon);
  
  // 2. Create onclick event
  button.onclick = function (event) {
    event.preventDefault();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     // Imitate fullscreen by openeing it in a new window
     var url = window.location.href
     window.open(url, "_blank");
    } else {
      if (screenfull.enabled) {
        screenfull.toggle(document.documentElement);
      }
    }
  };
  
  // 3. Set fullscreen button icon to match fullscreen state
  if (screenfull.enabled) {
    screenfull.on('change', function() {
      var icon = button.querySelector('i');
      icon.classList.remove(
        screenfull.isFullscreen ? 'fa-expand' : 'fa-compress'
      );
      icon.classList.add(
        screenfull.isFullscreen ? 'fa-compress' : 'fa-expand'
      );
    });
  }
  
  // 4. Style Button depeinding on the link-color variable
  // Get R, G, B values
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  var LinkColorRGB = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--r-link-color'));
  // Create css value
  var LinkColorCSS = "rgb(" + LinkColorRGB.r + "," + LinkColorRGB.g + "," + LinkColorRGB.b + ")"
  
  // Create stylesheet
  var FullscreenButtonCSS = `
.reveal .slide-chalkboard-buttons .fa-expand::before {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="` + LinkColorCSS + `" class="bi bi-fullscreen" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>');
}
.reveal .slide-chalkboard-buttons .fa-compress::before {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="` + LinkColorCSS + `" class="bi bi-fullscreen-exit" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>');
}
`
  var button_StyleSheet = document.createElement("style")
  button_StyleSheet.innerText = FullscreenButtonCSS

  // 4. Create Tooltip 
  const ToolTip = document.createElement("script");
  ToolTip.innerHTML = "tippy('#fs-tooltip', {content: 'Toggle Fullscreen', offset: [0, 20], delay: 100, duration: 1000, inertia: true, interactiveDebounce: 75, showOnCreate: true,  onShow(instance) {setTimeout(() => {instance.hide();}, 5000);}});"

  // 5. Add Stylesheet, Button and tooltip script to DOM
  document.querySelector('.slide-chalkboard-buttons').append(button_StyleSheet, button, ToolTip);

  })
}