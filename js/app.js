let arraySections = ["section1", "section2", "section3", "section4"];
const listIdName = "List";



/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  };

/* when window loads the page the navigation bar will load too*/
window.onload = function(e){
    loadNavigationBar();
}

window.onscroll = function(){
  onScrolling()
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
/* creating a function to get the section names from the HTML */
function getSectionNames(easy) {
  if (easy){
    return arraySections;
  } else {
    let sectionCounter = 1;
    let listSections = [];
    while (document.querySelector('#section'+ sectionCounter)) {
      listSections.push("section"+ sectionCounter);
      sectionCounter += 1;
    }
    arraySections = listSections;
    return listSections;
  }
}

// build the nav
function loadNavigationBar() {
  let navbarList = document.querySelector('#navbar__list');
  let sectionsNames = getSectionNames(false);
  /*console.log(sectionsNames);*/
  for (pos in sectionsNames) {
    let section = sectionsNames[pos];
    const dataNav = document.querySelector('#'+ section).getAttribute('data-nav');
    let listItem = document.createElement('li');
    let aItem = document.createElement('a');
    aItem.addEventListener("click", function(e) {
      let sectionElement = document.querySelector("#" + section);
        smoothScroll(sectionElement);
        sectionElement.classList.add('your-active-class');
      }, false);
    aItem.textContent = dataNav;
    aItem.id = "a"+ section;
    listItem.appendChild(aItem);
    // listItem.textContent = dataNav;

    let att = document.createAttribute('data-nav');
    att.value = section;
    listItem.setAttributeNode(att);
    listItem.id = listIdName + section;
    listItem.classList.add("menu__link");

    navbarList.appendChild(listItem);
  }
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
function smoothScroll (target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

/**
 * End Main Functions
 * Begin Events
 *
*/
function onScrolling() {
  let sectionsNames = getSectionNames(true);
  for (pos in sectionsNames) {
    let item = sectionsNames[pos];
    let a = document.querySelector('#' + "a" + item);
    let section = document.querySelector('#' + item);
    if (a != null && section != null) {
      if (elementInViewport(section)) {
        a.style.color = "yellow";
        section.classList.add("your-active-class")
      }
      else {
        if (a.classList != null) {
          a.style.color = "black";
          section.classList.remove("your-active-class")
        }
    }
  }
}
}
// Build menu

// Scroll to section on link click

// Set sections as active
