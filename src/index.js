var menu = document.getElementById("menu");
var Desktop = document.getElementById("desktop");
var Topbar = document.getElementById("topbar");
var Dock = document.getElementById("dock");

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
// var windows=document.getElementsByClassName("window");

var folders = document.getElementsByClassName("folder");
var closeBut = document.getElementsByClassName("close");
var maxBut = document.getElementsByClassName("max");
var minBut = document.getElementsByClassName("min");

document.addEventListener("dblclick", function (e) {
  for (var f of folders) {
    if (f.contains(e.target)) {
      var newWin = `<div class="window" data-name="${f.dataset.name}" draggable="true">
    <span class="nav">
      <span class="dot close" sym="&times;"></span>
      <span class="dot max" sym="&square;"></span>
      <span class="dot min" sym="&minus;"></span>
    </span>
    <span class="sidebar">
      <ul data-name="Favourites">
        <li><a href="#">Desktop</a></li>
        <li><a href="#">Places</a></li>
        <li><a href="#">Apps</a></li>
        <li><a href="#">Disks</a></li>
      </ul>
      <ul data-name="Folders">
        <li><a href="#">Folder 1</a></li>
        <li><a href="#">Folder 2</a></li>
        <li><a href="#">Folder 3</a></li>
        <li><a href="#">Folder 4</a></li>
      </ul>
    </span>
  </div>`;
      Desktop.innerHTML += newWin;
    }
  }
});

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target)) {
    menu_hide();
  }

  for (var i of closeBut) {
    console.log(i);
    if (i.contains(e.target)) i.onclick = closewin(e.target);
  }

  for (var j of maxBut) {
    console.log(i);
    if (j.contains(e.target)) {
      j.onclick = setTimeout(() => {
        max(e.target);
      }, 100);
    }
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

var closewin = (a) => {
  var win = a.parentNode.parentNode;
  console.log("closing " + win.dataset.name);
  win.parentNode.removeChild(win);
};

var max = (a) => {
  var win = a.parentNode.parentNode;
  console.log("Maximising " + win.dataset.name);
  if (win.classList.contains("max")) {
    win.classList.remove("max");
    console.log(win.classList.contains("max"));
  } else {
    win.classList.add("max");
    console.log(win.classList.contains("max"));
  }
  // win.style.height = window.innerHeight -30 + "px";
  // win.style.width = window.innerWidth + "px";
  // win.style.top = ".5px";
  // win.style.left = "0px";
};

var min = (a) => {
  var win = a.parentNode.parentNode;
  console.log("Minimising " + win.dataset.name);
  win.parentNode.removeChild(win);
};
