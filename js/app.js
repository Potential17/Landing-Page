/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
//adds new section
var main_body=document.querySelector("main")
var new_sec = document.createElement("SECTION")
var sec_text = document.createElement("P")
var sec_head = document.createElement("H2")
var container = document.createElement("DIV")
sec_head.innerHTML="Section 4"
sec_text.innerHTML="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellusimperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod."
new_sec.setAttribute("data-nav", "Section 4")
new_sec.setAttribute("id", "section4")
container.appendChild(sec_head)
container.appendChild(sec_text)
container.setAttribute("class", "landing__container")
new_sec.appendChild(container)
main_body.appendChild(new_sec)


/* Global Variables*/
const navList = document.querySelector("#navbar__list")
const navItems = [...document.querySelectorAll("section")]


/*Helper Functions*/
function inView(el){//checks if the top of a section is in scroll view
    var rect = el.getBoundingClientRect()    
    return (rect.top >= 0 &&
        rect.left >= 0 //&&
        // rect.bottom <= (window.innerHeight) &&
        // rect.right <= (window.innerWidth)
    )
}
function scrollToTop(){//scrolls to top of page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Nav-building function
function buildNav(text, aTag, navItem){
    var node=document.createElement("LI")
    aTag.appendChild(text)    
    node.classList.add("menu__link")
    node.appendChild(aTag)
    //eventListener to scroll to section, by ID
    node.addEventListener("click", function(){
        var sec = document.getElementById(navItem.id)
        var elems = document.querySelectorAll("LI");
        node.classList.add("active-s")
        sec.scrollIntoView({behavior: "smooth"})//scrolls, instead of auto-display                
    })
    navList.appendChild(node)
}

//get Section details to build nav
for (navItem of navItems){
    var text= document.createTextNode(navItem.dataset.nav)
    var aTag = document.createElement("a")
    buildNav(text, aTag, navItem)    
}

//scroll to top function
var btn = document.createElement("button")
btn.innerHTML="Top"
var body = document.getElementsByTagName("main")[0];
body.appendChild(btn);
btn.style.display = "none";
btn.classList.add("scrollToTop")
btn.addEventListener("click", scrollToTop)

//checks if a section is in view 
var nav = this.document.querySelector("header")
var nav_secs = document.querySelectorAll("LI")
var timer;//to display nav when scrolling
var scrollFunc = function(){
    for (navItem of navItems){
        if(inView(navItem)){            
            navItem.classList.add("your-active-class")  
            for(sec of nav_secs){
                if(sec.innerText === navItem.dataset.nav){
                    sec.classList.add("active-s")
                } else {
                    if(sec.classList.contains("active-s")){
                        sec.classList.remove("active-s")
                    }
                }                
            }
            break;
            // console.log(navItem)          
        }else{
            if(navItem.classList.contains("your-active-class")){
                navItem.classList.remove("your-active-class")                
            }
            for(sec of nav_secs){
                if(sec.classList.contains("active-s")){
                    sec.classList.remove("active-s")
                }
            }
        }
    }
    //displays "top" button when document is scrolled passed defined height
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }

    window.clearTimeout( timer );
    nav.style.display="block"
    timer = setTimeout(function() {
          nav.style.display="none";
    }, 2000);
}

window.addEventListener("scroll", scrollFunc)

//collapse sections
var sections = document.querySelectorAll("section h2")
for(var i=0; i<sections.length; i++){//for-of loop doesn't work for adding eventListener
    sections[i].addEventListener("click", function(){
        this.classList.toggle("active");
        //console.log(sections[i])
        var siblings = this.parentNode.childNodes
        for(sibling of siblings){
            if(sibling.nodeName==="#text" || sibling.nodeName==="H2"){
                //do nothing                
            }
            else{
                if(sibling.style.display=="block"){
                    sibling.style.display="none"
                } else {
                    sibling.style.display="block"
                }
            }
        }
    })
}
