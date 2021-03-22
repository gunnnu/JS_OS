var menu = document.getElementById("menu");
document.addEventListener(
  "contextmenu",
  function (e) {
    // if(e.target.classList.contains('elem')){
    e.preventDefault();
    // menu.dataset.class=e.target.classList;
    // menu.dataset.name=e.target.children[0].innerHTML;
    // if(e.target.classList.contains('file')){
    //     var url=e.target.style.backgroundImage.split('/');
    //     menu.dataset.parentfolder=url[url.length-2]
    // }
    menu_show(e);
  },
  false
);

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target)) {
    menu_hide();
  }
});

var menu_show = (e) => {
  menu.style.opacity = "0";
  menu.style.zIndex = "100";
  menu.style.pointerEvents = "all";
  setTimeout(function () {
    menu.style.opacity = "1";
    menu.style.top = e.clientY + "px";
    menu.style.left = e.clientX + "px";
  }, 10);
};

var menu_hide = () => {
  menu.style.opacity = "0";
  menu.style.zIndex = "-2";
  menu.style.pointerEvents = "none";
};
menu.childNodes.forEach((i) => {
  i.onclick = () => {
    menu_hide();
  };
});
// var Global_Events={
//   "page_Reload":"",
// }

var close = (elem) => {
  console.log("close");
  this.parent.removeChild(this);
};

// windows[0]
