var menu = document.getElementById("menu");
var Desktop = document.getElementById("desktop");
var Topbar = document.getElementById("topbar");
var Dock = document.getElementById("dock");

var windows = document.getElementsByClassName("window");

var folders = document.getElementsByClassName("folder");
var closeBut = document.getElementsByClassName("close");
var maxBut = document.getElementsByClassName("max");
var minBut = document.getElementsByClassName("min");

var prevheight, prevwidth, prevtop, prevleft, defaultheight;

document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
    if (e.target.classList.contains("window")) {
      if (e.target.style.height === "30px") {
        e.target.style.height = defaultheight;
      } else {
        defaultheight = e.target.style.height;
        e.target.style.height = "30px";
      }
    }
    // menu.dataset.class=e.target.classList;
    // menu.dataset.name=e.target.children[0].innerHTML;
    // if(e.target.classList.contains('file')){
    //     var url=e.target.style.backgroundImage.split('/');
    //     menu.dataset.parentfolder=url[url.length-2]
    // }
    else {
      menu_show(e);
    }
  },
  false
);

document.addEventListener("dblclick", function (e) {
  if (e.target.classList.contains("folder")) {
    var newWin = `<div class="window" data-name="${e.target.dataset.name}">
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
});

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target)) {
    menu_hide();
  }
  if (e.target.classList.contains("window")) {
    dragElement(e.target);
    for (var l of windows) {
      l.style.zIndex = "0";
    }
    e.target.style.zIndex = "1";
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

// var pos1, pos2, pos3, pos4;

// document.addEventListener("onmousedown", (e) => {
//   if (e.target.classList.contains("window")) {
//     e.preventDefault();
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//   }

//   // document.addEventListener("onmouseup", (e) => {
//   //   if (e.target.classList.contains("window")) {
//   // e.preventDefault();
//   //     document.onmouseup = null;
//   //     document.onmousemove = null;
//   //   }
//   // });

//   document.addEventListener("onmousemove", (e) => {
//     if (e.target.classList.contains("window")) {
//       e.preventDefault();
//       pos1 = pos3 - e.clientX;
//       pos2 = pos4 - e.clientY;
//       pos3 = e.clientX;
//       pos4 = e.clientY;

//       e.target.style.top = e.target.offsetTop - pos2 + "px";
//       e.target.style.left = e.target.offsetLeft - pos1 + "px";
//     }
//   });
// });

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
var maxflag = 0;

var prevheight, prevwidth, prevtop, prevleft;

var max = (a) => {
  var win = a.parentNode.parentNode;

  console.log("Maximising " + win.dataset.name);

  if (maxflag === 0) {
    prevheight = window.getComputedStyle(win).height;
    prevwidth = window.getComputedStyle(win).width;
    prevtop = window.getComputedStyle(win).top;
    prevleft = window.getComputedStyle(win).left;

    win.style.height = "calc(100% - 30px)";
    win.style.width = window.innerWidth + "px";
    win.style.top = ".5px";
    win.style.left = "0px";
    maxflag = 1;
  } else {
    win.style.height = prevheight;
    win.style.width = prevwidth;
    win.style.top = prevtop;
    win.style.left = prevleft;
    maxflag = 0;
  }
  console.log(prevheight);
};

var min = (a) => {
  var win = a.parentNode.parentNode;
  console.log("Minimising " + win.dataset.name);
  // win.parentNode.removeChild(win);
};

// setInterval(() => {
// for (var w of windows) {
//   dragElement(w);
// }
// }, 100);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // if (document.getElementById(elmnt.id + "header")) {
  //   // if present, the header is where you move the DIV from:
  //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  // } else {
  // otherwise, move the DIV from anywhere inside the DIV:
  elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var clock = async () => {
  var Time = new Date().toLocaleTimeString();
  var clockdiv = document.getElementById("clock");
  clockdiv.innerHTML = Time;
  setTimeout(clock, 1000);
};
clock();
