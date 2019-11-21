let mainNav = document.getElementById('main-nav'),
    mobileNav = document.getElementById('mobile-nav'),
    hamburger = document.getElementById('hamburger-wrapper'),
    mainNavNavElm = mainNav.children[0].children,
    mobileNavElm = mobileNav.children[0].children;

var myFullpage = new fullpage('#fullpage', {
  licenseKey: '101762F1-4B1F44FA-9835A6BC-FF4D72E7',
  anchors: ['Top','Services', 'Process', 'Projects', 'Map', 'Contact'],
  navigation:true,
  slidesNavigation: true,
  navigationTooltips: ['Top','Services', 'Process', 'Projects', 'Map', 'Contact'],
  showActiveTooltip: false,
  scrollOverflow:true,
  paddingTop: '100px',
  paddingBottom: '40px',
  menu: '#menu',
  onLeave: function(origin, destination, direction) {
    console.log(destination.index);

    for(let i = 0; i < mobileNavElm.length; i++ ) {
      mobileNavElm[i].classList.remove('active');
    }
    for(let i = 0; i < mainNavNavElm.length; i++ ) {
      mainNavNavElm[i].classList.remove('active');
    }

    if (destination.index == 0) {
      return
    }  else {
      mainNavNavElm[destination.index].classList.add('active');
      mobileNavElm[destination.index].classList.add('active');
    }
  }
});


// Mobile nav click function

hamburger.onclick = function(e){
  hamburger.children[0].classList.toggle('active');
  mobileNav.classList.toggle('active');
};

// Process section
let processButton = document.getElementsByClassName('process-button'),
    processDetails = document.getElementsByClassName('process-details'),
    processFlexItem = document.getElementsByClassName('process-flex-item'),
    dataId = "1";

for (let i = 0; processButton.length > i; i++) {
  processButton[i].onclick = (e) => {
    let dataId = processButton[i].getAttribute('data-id');
    for (let i = 0; processButton.length > i; i++) {
      processButton[i].classList.remove('active');
    }
    processButton[i].classList.add('active');
    // processFunction(dataId);
    for (let i = 0; processDetails.length > i; i++) {
      processDetails[i].style.display = "none"; // Hide all detail blocks
    }
    processDetails[dataId - 1].style.display = "block"; // Show selected detail block
    let backgroundImg = processDetails[dataId - 1].children[0].src;
    for (let i = 0; processFlexItem.length > i; i++) {
      processFlexItem[i].children[0].style.backgroundImage = `url("${backgroundImg}")`;
    }
    if(processTimeline.isActive()) {
      processTimeline.pause(0).clear().restart(); // Prevents animation queuing or breaking if links are clicked multiple times.
    }
    processTimelineFunction(dataId); // Play animation
  }
}

// const processFunction = id => {
//   for (let i = 0; processDetails.length > i; i++) {
//     processDetails[i].style.display = "none"; // Hide all detail blocks
//   }
//   processDetails[id - 1].style.display = "block"; // Show selected detail block
//   let backgroundImg = processDetails[id - 1].children[0].src;
//   for (let i = 0; processFlexItem.length > i; i++) {
//     processFlexItem[i].children[0].style.backgroundImage = `url("${backgroundImg}")`;
//   }
//   processTimelineFunction(id); // Play animation
// }

// Services
let gridNav = document.getElementsByClassName('grid-nav')[0],
    details = document.getElementsByClassName('details')[0],
    isActive = document.getElementsByClassName('grid-nav')[0],
    servicesFlexGrid = document.getElementsByClassName('services-flex-container')[0],
    processFlexGrid = document.getElementsByClassName('process-flex-container')[0],
    servicesFlexItem = document.getElementsByClassName('services-flex-item'),
    category = "Residential"; // Start off with residential for the animation.

for (let i = 0; i < isActive.children.length; i++ ) {
  gridNav.children[i].onclick = () => {
    for (let i = 0; i < isActive.children.length; i++ ) {
      isActive.children[i].classList.remove('active');
    }
    gridNav.children[i].classList.add('active');
    category = gridNav.children[i].innerText;
    let showElements = document.getElementsByClassName(category.toLowerCase().split(' ')[0]);
    for (let i = 0; i < servicesFlexItem.length; i++ ) {
      if (i === 3) { // Skip the details grid item
        continue
      } else {
        servicesFlexItem[i].children[0].style.backgroundImage = `url("${showElements[0].getAttribute('src')}")`;
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
    gridAdnimationFunction(category);
  }
}

const positionGridBackgrounds = () => { // Apply the x and y values to the fixed backgrounds position for the specified sections.

  let servicesFlexGridWidthDifference = (1184 - servicesFlexGrid.offsetWidth) / 2,
      processFlexGridWidthDifference = (584 - processFlexGrid.offsetWidth) / 2;

  const firstGridItem = () => {
    let elementWidth = servicesFlexGrid.children[0].offsetWidth;
    if (elementWidth != 286) {
      servicesFlexGrid.children[0].children[0].style.backgroundPosition =  `-${servicesFlexGridWidthDifference + 10}px -100px`; // servicesFlexGrid width difference plus the inital 10 pixel shift.
    } else {
      servicesFlexGrid.children[0].children[0].style.backgroundPosition = "-10px -100px";
    }
  }

  // Services
  firstGridItem();

  const secondGridItem = () => {
    let elementWidth = servicesFlexGrid.children[1].offsetWidth;
    if (elementWidth != 286) {
      servicesFlexGrid.children[1].children[0].style.backgroundPosition =  `-${servicesFlexGridWidthDifference + elementWidth + 10 + 10}px -100px`; // servicesFlexGrid width difference plus the inital 10 pixel shift plus the margin.
    } else {
      servicesFlexGrid.children[1].children[0].style.backgroundPosition = "-306px -100px";
    }
  }
  secondGridItem();

  const thirdGridItem = () => {
    let elementWidth = servicesFlexGrid.children[2].offsetWidth;
    if (elementWidth != 582) {
      servicesFlexGrid.children[2].children[0].style.backgroundPosition =  `-${servicesFlexGridWidthDifference + elementWidth + 10}px -100px`; //servicesFlexGrid width difference plus the inital 10 pixel shift plus the margin. ElementWidth already includes the first 10px margin.
    } else {
      servicesFlexGrid.children[2].children[0].style.backgroundPosition = "-612px -100px";
    }
  }
  thirdGridItem();

  const fourthGridItem = () => {
    let elementWidth = servicesFlexGrid.children[3].offsetWidth;
    if (elementWidth != 582) {
      servicesFlexGrid.children[4].children[0].style.backgroundPosition =  `-${servicesFlexGridWidthDifference + elementWidth + 10}px -335px`; // servicesFlexGrid width difference plus large element width plus the margin.
    } else {
      servicesFlexGrid.children[4].children[0].style.backgroundPosition = "-612px -335px";
    }
  }
  fourthGridItem();

  const fifthGridItem = () => {
    let elementWidthsmall = servicesFlexGrid.children[4].offsetWidth,
        elementWidthLarge = servicesFlexGrid.children[3].offsetWidth;
    if (elementWidthsmall != 286) {
      servicesFlexGrid.children[5].children[0].style.backgroundPosition =  `-${servicesFlexGridWidthDifference + elementWidthLarge + elementWidthsmall + 10 + 10}px -335px`; // servicesFlexGrid width difference plus large and small elemnt width plus the two margins.
    } else {
      servicesFlexGrid.children[5].children[0].style.backgroundPosition = "-908px -335px";
    }
  }
  fifthGridItem();

  // Processes
  const sixthGridItem = () => {
    let elementWidth = processFlexGrid.children[0].offsetWidth;
    if (elementWidth != 282) {
      processFlexGrid.children[0].children[0].style.backgroundPosition =  `-${processFlexGridWidthDifference + 65}px 0px`; // processFlexGrid width difference plus  width plus the margin.
    } else {
      processFlexGrid.children[0].children[0].style.backgroundPosition = "-65px 0px";
    }
  }
  sixthGridItem();

  const seventhGridItem = () => {
    let elementWidth = processFlexGrid.children[1].offsetWidth;
    if (elementWidth != 282) {
      processFlexGrid.children[1].children[0].style.backgroundPosition =  `-${processFlexGridWidthDifference + elementWidth + 65}px 0px`; // servicesFlexGrid width difference plus large element width plus the margin.
    } else {
      processFlexGrid.children[1].children[0].style.backgroundPosition = "-357px 0px";
    }
  }
  seventhGridItem();

  const eighthGridItem = () => {
    let elementWidth = processFlexGrid.children[2].offsetWidth;
    if (elementWidth != 282) {
      processFlexGrid.children[2].children[0].style.backgroundPosition =  `-${processFlexGridWidthDifference + 65}px -235px`; // servicesFlexGrid width difference plus large element width plus the margin.
    } else {
      processFlexGrid.children[2].children[0].style.backgroundPosition = "-65px -235px";
    }
  }
  eighthGridItem();

  const ninthGridItem = () => {
    let elementWidth = processFlexGrid.children[3].offsetWidth;
    if (elementWidth != 282) {
      processFlexGrid.children[3].children[0].style.backgroundPosition =  `-${processFlexGridWidthDifference + elementWidth + 65}px -235px`; // servicesFlexGrid width difference plus large element width plus the margin.
    } else {
      processFlexGrid.children[3].children[0].style.backgroundPosition = "-357px -235px";
    }
  }
  ninthGridItem();
}

/* TIMLINES
/********************************************************************/

// Services section timeline
const gridAnimation = new TimelineMax({delay: 1});
const gridAdnimationFunction = catergory => { // Put the timeline in a function to pass arguments for the category.
  gridAnimation
    // Added onComplete function to remove the transform effect. This breaks the css background-attatchment: fixed; in other browsers except chrome.
    .staggerFromTo('.services-shuffle-top', .3, {autoAlpha: 0, x: -200},{autoAlpha: 1, x: 0, ease: Sine.easeOut, onComplete: function(){this.target.style.transform = "none"}}, 0.1)
    .staggerFromTo('.services-shuffle-bottom', .3, {autoAlpha: 0, x: -200},{autoAlpha: 1, x: 0, ease: Sine.easeOut, onComplete: function(){this.target.style.transform = "none"}}, 0.1, '-=.4')
    .staggerFromTo('.services-flex-item div', .3, {autoAlpha: 0},{autoAlpha: 1}, 0.1, '-=.3')
    .staggerFromTo('.' + category.toLowerCase().split(' ')[0], .5,{autoAlpha: 0, y: 50},{autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.4)}, 0.1, '-=.3');
}

// Process section timeline
const processTimeline = new TimelineMax({delay: 1});
const processTimelineFunction = id => {
  processTimeline
    .staggerFromTo('.process-shuffle-left', .3, {autoAlpha: 0, y: -200},{autoAlpha: 1, y: 0, ease: Sine.easeOut, onComplete: function(){this.target.style.transform = "none"}}, 0.1)
    .staggerFromTo('.process-shuffle-right', .3, {autoAlpha: 0, y: -200},{autoAlpha: 1, y: 0, ease: Sine.easeOut, onComplete: function(){this.target.style.transform = "none"}}, 0.1, '-=.2')
    .staggerFromTo('.process-flex-item div', .3, {autoAlpha: 0},{autoAlpha: 1}, 0.1, '-=.3')
    .staggerFromTo(processDetails[id - 1].children, .5,{autoAlpha: 0, y: 50},{autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.4)}, 0.1, '-=.3');
}

// Projects section timeline

const projectsTimeline = new TimelineMax({delay: 1});
projectsTimeline
  .staggerFromTo('.gallery-stagger', .5,{autoAlpha: 0, y: 50},{autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.4)}, 0.1, '-=.3');

// Projects gallery
let imageObj = {
  "gallery1" : {
    "images" : [
      "images/gallery/Beyster/01.jpg",
      "images/gallery/Beyster/02.jpg",
      "images/gallery/Beyster/03.jpg",
      "images/gallery/Beyster/04.jpg",
      "images/gallery/Beyster/05.jpg",
      "images/gallery/Beyster/06.jpg"
    ],
    "details" : {
      "header" : "Beyster",
      "client" : "Sanctuary Architects | 2019",
      "description" : "Beyster Residence is a complete teardown of two existing projects and the rebuild of a new single-family residence overlooking the beautiful Torrey Pines Reserve in Del Mar, California. This was a fully integrated BIM Project."
    }
  },
  "gallery2" : {
    "images" : [
      "images/gallery/Christopher/01.jpg",
      "images/gallery/Christopher/02.jpg",
      "images/gallery/Christopher/03.jpg",
      "images/gallery/Christopher/04.jpg",
      "images/gallery/Christopher/05.jpg",
      "images/gallery/Christopher/06.jpg"
    ],
    "details" : {
      "header" : "Christopher",
      "client" : "Sanctuary Architects | 2019",
      "description" : "The Christopher Residence consists of a substantial remodel and addition of an existing single-family home which now has a guest house, detached garage and much more room to live."
    }
  },
    "gallery3" : {
    "images" : [
      "images/gallery/Freeman/01.jpg",
      "images/gallery/Freeman/02.jpg",
      "images/gallery/Freeman/03.jpg",
      "images/gallery/Freeman/04.jpg",
      "images/gallery/Freeman/05.jpg",
      "images/gallery/Freeman/06.jpg"
    ],
    "details" : {
      "header" : "Freeman",
      "client" : "Sanctuary Architects | 2019",
      "description" : "Freeman street homes is a three-story, five-unit, condominium project located in Oceanside California. The project will provide five units of ample living space constructed over main level parking. Plan North Engineers provided both the Civil and Structural services for this project. This was a fully integrated BIM Project."
    }
  },
    "gallery4" : {
    "images" : [
      "images/gallery/Higgens/01.jpg",
      "images/gallery/Higgens/02.jpg",
      "images/gallery/Higgens/03.jpg",
      "images/gallery/Higgens/04.jpg",
      "images/gallery/Higgens/05.jpg",
      "images/gallery/Higgens/06.jpg"
    ],
    "details" : {
      "header" : "Higgens",
      "client" : "Sanctuary Architects | 2019",
      "description" : "Higgins Residence is a very modern single-family residential structure complete with all four of the major structural building materials. This was a fully integrated BIM Project."
    }
  },
    "gallery5" : {
    "images" : [
      "images/gallery/Response_Church/01.jpg",
      "images/gallery/Response_Church/02.jpg",
      "images/gallery/Response_Church/03.jpg",
      "images/gallery/Response_Church/04.jpg",
      "images/gallery/Response_Church/05.jpg",
      "images/gallery/Response_Church/06.jpg"
    ],
    "details" : {
      "header" : "Response Church",
      "client" : "Sanctuary Architects | Year",
      "description" : "The Response Church project was primarily an occupancy upgrade for an existing concrete building with a panelized roof in Southern California. Originally used as a storage warehouse, the church was face with several upgrades prior to being used as a place of assembly. This was a fully integrated BIM Project."
    }
  },
    "gallery6" : {
    "images" : [
      "images/gallery/Martis/01.jpg",
      "images/gallery/Martis/02.jpg",
      "images/gallery/Martis/03.jpg",
      "images/gallery/Martis/04.jpg",
      "images/gallery/Martis/05.jpg",
      "images/gallery/Martis/06.jpg"
    ],
    "details" : {
      "header" : "Martis -Villandry",
      "client" : "Sagemodern | 2019",
      "description" : "The structural design of this project was completed under previous employment at Riverstone Structural Concepts. The structure consisted of a combination of both off-site module fabrication and on-site construction. This was a fully integrated BIM Project where all structure was modeled and utilized to create shop drawings for the module fabrication."
    }
  }
}

// Siema 1.3.0 introuduced a basic callbacks
// https://github.com/pawelgrzybek/siema/releases/tag/v.1.3.0

let bulletContainer = document.getElementsByClassName('bullets')[0];

function onInitCallback() {
  console.log('Siema initialized, scro.');
}

function onChangeCallback() {
  console.log(`The index of current slide is: ${this.currentSlide}`);
  Array.prototype.slice.call(bulletContainer.children).forEach(element => { // Remove the active class.
    element.classList.remove('active');
  });
  bulletContainer.children[this.currentSlide].classList.add('active'); // Add the active class.

  // Clone element, append, animate, remove.
  let clone = bulletContainer.children[this.currentSlide].cloneNode();
  bulletContainer.children[this.currentSlide].append(clone);
  TweenMax.fromTo(bulletContainer.children[this.currentSlide].children[0], 0.3 , {autoAlpha: 1, scale: 0, transfromOrigin:"50% 50%"}, {autoAlpha: 0, scale: 2.5, onComplete: ()=> { bulletContainer.children[this.currentSlide].innerHTML = "";}});
}

const mySiema = new Siema({
  onInit: onInitCallback,
  onChange: onChangeCallback,
});

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.addEventListener('click', () => mySiema.prev());
next.addEventListener('click', () => mySiema.next());

// Remove & Create Slides, add new gallery description
const removeExistingSlides = () => {
  let howManyExistingSlides = mySiema.innerElements.length;
  for(let i = 0; i < howManyExistingSlides; i++) {
    mySiema.remove(0);
  }
}

let galleryHeaderElm = document.getElementById('header'),
    galleryClientElm = document.getElementById('client'),
    galleryDescriptionElm = document.getElementById('description'),
    siemaElm = document.getElementsByClassName('siema')[0];
const addSelectedSlides = gallery => {
  let howManySlides = imageObj[gallery].images.length,
      galleryHeader = imageObj[gallery].details.header,
      galleryClient = imageObj[gallery].details.client,
      galleryDescription = imageObj[gallery].details.description,
      imagesLoaded = 0;

  siemaElm.style.visibility = "hidden"; // Hide untill all images are loaded.
  for(let i = 0; i < howManySlides; i++) {
    const newElement = document.createElement('div');
    let img = document.createElement("IMG");
    img.src = imageObj[gallery].images[i]
    newElement.appendChild(img);
    // let img = `<img src="${imageObj[gallery].images[i]}" alt="Project Image" />`;
    // newElement.innerHTML = img;
    mySiema.append(newElement); // Siema API
    img.onload = function() {
      ++imagesLoaded
      if (imagesLoaded == 6) {
        TweenMax.to(siemaElm, .5, {autoAlpha: 1});
      }
    };
    galleryHeaderElm.innerHTML = galleryHeader;
    galleryClientElm.innerHTML = galleryClient;
    galleryDescriptionElm.innerHTML = galleryDescription;
    projectsTimeline.seek(0).play();
  }
}

// Custom Bullets
const createBullets = () => {
  let howManySlides = mySiema.innerElements,
      bullets = "",
      slide = 0;
  Array.prototype.slice.call(howManySlides).forEach(element => {
   bullets += `<span data-slide='${slide}'></span>`;
    slide++;
  });
  bulletContainer.innerHTML = bullets;
  bulletContainer.children[0].classList.add('active');
}
createBullets();

const bulletClick = () => {
  Array.prototype.slice.call(bulletContainer.children).forEach(element => {
    element.onclick = (e) => {
      let slide = e.target.getAttribute('data-slide');
      mySiema.goTo(slide);
    }
  });
}
bulletClick();

// Gallery Thumbnail
let galleryThumbnail  = document.getElementsByClassName('gallery-thumbnail');

for(let i = 0; i < galleryThumbnail.length; i++) {
  galleryThumbnail[i].onclick = (e) => {
    let gallery = e.target.getAttribute('data-gallery');
    for(let i = 0; i < galleryThumbnail.length; i++) {
      galleryThumbnail[i].classList.remove('active');
    }
    e.currentTarget.classList.add('active');
    removeExistingSlides();
    addSelectedSlides(gallery);
    createBullets();
    bulletClick();
    mySiema.next(); //Makes sure it goes to the new first slide.
  }
}

// Onload function

window.onload = () => {
  gridAdnimationFunction(category);
  processTimelineFunction(dataId);
  // processFunction(1); // Show intial process selection
  positionGridBackgrounds();
}

// Onresize functions
window.onresize = () => {
  setTimeout(() => {
    positionGridBackgrounds();
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
  var xmlhttp = window.XMLHttpRequest ?
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
