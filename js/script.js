
/* CLICK EVENTS AND FUNCTIONS
/********************************************************************/

// Process section
let processButton = document.getElementsByClassName('process-button'),
    processDetails = document.getElementsByClassName('process-details');

for (let i = 0; processButton.length > i; i++) {
  processButton[i].onclick = (e) => {
    let dataId = processButton[i].getAttribute('data-id');
    for (let i = 0; processButton.length > i; i++) {
      processButton[i].classList.remove('active');
    }
    processButton[i].classList.add('active');
    processFunction(dataId);
  }
}

const processFunction = id => {
  for (let i = 0; processDetails.length > i; i++) {
    processDetails[i].style.display = "none"; // Hide all detail blocks
  }
  processDetails[id - 1].style.display = "block"; // Show selected detail block
  processTimelineFunction(id); // Play animation
}

// Services
let gridNav = document.getElementsByClassName('grid-nav')[0],
    details = document.getElementsByClassName('details')[0],
    isActive = document.getElementsByClassName('grid-nav')[0],
    flexGrid = document.getElementsByClassName('grid-flex-container')[0],
    gridFlexItem = document.getElementsByClassName('grid-flex-item'),
    category = "Residential"; // Start off with residential for the animation.

for (let i = 0; i < isActive.children.length; i++ ) {
  gridNav.children[i].onclick = () => {
    for (let i = 0; i < isActive.children.length; i++ ) {
      isActive.children[i].classList.remove('active');
    }
    gridNav.children[i].classList.add('active');
    category = gridNav.children[i].innerText;
    let showElements = document.getElementsByClassName(category.toLowerCase().split(' ')[0]);
    for (let i = 0; i < gridFlexItem.length; i++ ) {
      if (i === 3) { // Skip the details grid item
        continue
      } else {
        gridFlexItem[i].children[0].style.backgroundImage = "url('" + showElements[0].getAttribute('src') + "')";
      }
    }
    for (let i = 0; i < details.children.length; i++ ) {
      details.children[i].classList.add('hidden');
    }
    for (let i = 0; i < showElements.length; i++ ) {
      showElements[i].classList.remove('hidden');
    }
    if(gridAnimation.isActive()) {
      gridAnimation.pause(0).clear().restart(); // Prevents animation queuing or breaking if links are clicked multiple times.
    }
    // TweenMax.to('.grid-flex-item div', 0, {autoAlpha: 0});
    // setTimeout(() => {
      gridAdnimationFunction(category);
    // }, 1000);
  }
}

const getPosition = (element) => { // Get distance from top for the attached: fixed; background element.
  let yPosition = 0;
  while(element) {
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }
  for (let i = 0; i < flexGrid.children.length; i++ ) {
    flexGrid.children[i].children[0].style.backgroundPosition = '50% calc(' + yPosition + 'px - 100px)'
  }
}


/* TIMLINES
/********************************************************************/


// Services section timeline
const gridAnimation = new TimelineMax({delay: 1});
const gridAdnimationFunction = catergory => { // Put the timeline in a function to pass arguments for the category.
  gridAnimation
    // Added onComplete function to remove the transform effect. This breaks the css background-attatchment: fixed; in other browsers except chrome.
    .staggerFromTo('.shuffle-top', .3, {autoAlpha: 0, x: -200},{autoAlpha: 1, x: 0, ease: Sine.easeOut, onComplete: function(){this.target.style.transform = "none"}}, 0.1)
    .staggerFromTo('.shuffle-bottom', .3, {autoAlpha: 0, x: -200},{autoAlpha: 1, x: 0, ease: Sine.easeOut, onComplete: function(){this.target.style.transform = "none"}}, 0.1, '-=.4')
    .staggerFromTo('.grid-flex-item div', .3, {autoAlpha: 0},{autoAlpha: 1}, 0.1, '-=.3')
    .staggerFromTo('.' + category.toLowerCase().split(' ')[0], .5,{autoAlpha: 0, y: 50},{autoAlpha: 1, y: 0, ease: Power3.easeOut}, 0.1, '-=.3');
}

// Process section timeline
const processTimelineFunction = (id) => {
  const processTimeline = new TimelineMax({Paused: true});
  processTimeline
  .fromTo(processDetails[id - 1].children[0], .5, {autoAlpha: 0, y: '50px'}, {autoAlpha: 1, y: '0px'})
  .fromTo(processDetails[id - 1].children[1], .5, {autoAlpha: 0, y: '50px'}, {autoAlpha: 1, y: '0px'}, 0.2);
}

// Onload function

window.onload = () => {
  gridAdnimationFunction(category);
  processFunction(1); // Show intial process selection
  getPosition(flexGrid);
}

// Onresize functions
window.onresize = () => {
  setTimeout(() => {
    getPosition(flexGrid);
  }, 1000);
};

/* CONTACT FORM VALIDATION & AJAX SUBMISSION (Pulled from my script on GeoVoice.io)
********************************************************************************************/

var submit = document.getElementById('submit');
var form = document.forms["contact-form"];

function submitFormAjax() {
  var domOutput = document.getElementById("dom-output");
  var name = form['name'].value;
  var email = form['email'].value;
  var message = form['message'].value;
  var xmlhttp= window.XMLHttpRequest ?
  new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  // var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // alert(xmlhttp.responseText); // Here is the response for troubleshooting
      form.reset();
      submit.className = "no-transition"; //stop transition delay when hidding the form.
      form.style.visibility = "hidden";
      domOutput.style.visibility = "visible";
      TweenMax.fromTo('#dom-output', 1, {autoAlpha: 0},{ autoAlpha: 1, ease: Power2.easeOut});
      setTimeout(function() {
        submit.className = "";
        TweenMax.fromTo(form, 1, {autoAlpha:0},{autoAlpha:1});
        TweenMax.fromTo(domOutput, 1, {autoAlpha:1},{autoAlpha:0});
      }, 3000);
    }
  }
  xmlhttp.open("POST","mail.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("name=" + name + "&email=" + email + "&message=" + message);
}

submit.onclick = function(e) {
  var empty = 0;
  for(var i = 0; i < form.elements.length; i++){
    if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
      form.elements[i].style.border = "1px solid red";
      empty += 1;
    }
  }
  if (empty > 0) {
    return false;
  } else {
    submitFormAjax();
  }
}

form.oninput = function() {
  for(var i = 0; i < form.elements.length - 1; i++){ // - 1 so input button doesnt change
    if(form.elements[i].value) {
      form.elements[i].style.border = "none";
      form.elements[i].style.borderBottom = "2px solid #FFFFFF";
    }
  }
}
