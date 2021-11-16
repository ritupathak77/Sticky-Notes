//starting by getting access to our secondary containers and icons
var secondary_container2 = document.getElementsByClassName("secondary_container2")[0];
var secondary_container3 = document.getElementsByClassName("secondary_container3")[0];
var yesIcon = document.getElementById("yes_icon");
var cancelIcon = document.getElementById("cancel_icon");
var drawIcon = document.getElementById("drawMe");
var secondary_container1 = document.getElementsByClassName("secondary_container1")[0];
const addNoteButton = secondary_container2.querySelector(".add-note");

var imageClass = document.getElementsByClassName("myImage");
var myImage = document.getElementById("output");


/*---------------------------------SAVE IN THE LOCAL STORAGE----------------------------

function getNotes()
{
  return JSON.parse(localStorage.getItem("stickynotes-notes")||"[]");
}

//to save those notes, populates the localStorage fields with data.
//
function saveNotes(notes)
{
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}


//get all the notes from localStorage using getNotes then add new note to existing array and resave using saveNotes.
function addNote()
{

}

/*-----------------------------------UPLOAD IMAGE------------------------------------- */

var loadFile = function (event) {

  var image = document.createElement('img');
  var imgDiv = document.createElement('div')

  image.src = URL.createObjectURL(event.target.files[0]);
  imgDiv.width = "250px"
  imgDiv.height = "250px"
  imgDiv.setAttribute("style", "position: relative")
  image.setAttribute("style", "width:250px; height:250px; margin-top: 10px; overflow: hidden")
  image.setAttribute("class", "imggClass");
  image.style.margin = "15px";
  image.style.transform = "rotate(1deg)";
  imgDiv.append(image)
  var myX = document.createElement("span");
  myX.setAttribute("style", "position: absolute;top:10px;right:10px")
  myX.setAttribute("class", "noteClass");
  myX.innerText = 'X';
  imgDiv.append(myX);

  var input = document.getElementById("file")
  input.value = ""


  secondary_container2.append(imgDiv);

  imgDiv.onmousedown = function (event) {

    let shiftX = event.clientX - imgDiv.getBoundingClientRect().left;
    let shiftY = event.clientY - imgDiv.getBoundingClientRect().top;

    imgDiv.style.position = 'absolute';
    imgDiv.style.zIndex = 1000;
    document.body.append(imgDiv);
   

    moveAt(event.pageX, event.pageY);

    // moves the node0 at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      imgDiv.style.left = pageX - shiftX + 'px';
      imgDiv.style.top = pageY - shiftY + 'px';
    }
 

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // move the node0 on mousemove
    document.addEventListener('mousemove', onMouseMove);
  

    // drop the node0, remove unneeded handlers
    imgDiv.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      imgDiv.onmouseup = null;
      return;
    };
    return;
  };
  imgDiv.ondragstart = function () {
    return false;

  };

  myX.onmousedown = (e) => {
    var input = document.getElementById("file")
    input.value = ""
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    e.stopPropagation()
  }
};

/*-----------------------------------------DRAW FUNCTION---------------------------------------*/

var i = 0;
var givenId = "#FF0000";


var canvas, ctx, flag = false,
  prevX = 0,
  currX = 0,
  prevY = 0,
  currY = 0,
  dot_flag = false;
var x, y;

canvas = document.getElementById("can");
ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var eraseFlag = false
function drawFunction() {
  eraseFlag = false
  canvas.addEventListener("mousedown", function (e) { findxy('down', e) }, false);
  canvas.addEventListener("mousemove", function (e) { findxy('move', e) }, false);
  canvas.addEventListener("mouseup", function (e) { findxy('up', e) }, false);
  canvas.addEventListener("mouseout", function (e) { findxy('out', e) }, false);
}

function erase() {
  eraseFlag = true
  draw("grey", 30)
}

function findxy(res, e) {
  if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == 'up' || res == "out") {
    flag = false;
  }
  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      if (eraseFlag) {
        draw("grey", 30)
      } else {
        draw('black', 2)
      }
    }
  }
}

function draw(x, y) 
{

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = x;
  ctx.lineWidth = y;

  ctx.stroke();
  ctx.closePath();
}




/*--------------------------------------CREATE NOTE YES AND NO ICON--------------------------------*/
cancelIcon.addEventListener("click", function () {
  noteBox();
})
yesIcon.addEventListener("click", function () {
  createNote();
})

/*--------------------------------------DELETE ALL--------------------------------*/
function deleteAll() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  secondary_container2.innerHTML=""

  var elements = document.getElementsByClassName("noteClass");
  while (elements.length > 0) elements[0].remove();
  var elements1 = document.getElementsByClassName("imggClass");
  while (elements1.length > 0) elements1[0].remove();
  

}
/*--------------------------------------TO DISPLAY AND NOT DISPLAY THE NOTE BOX--------------------------------*/
function noteBox() {
  if (secondary_container3.style.display == "none") {
    secondary_container3.style.display = "block";
  }
  else {
    secondary_container3.style.display = "none";
  }
}
/*--------------------------------------CHOOSE COLOR FOR THE USER TO WRITE THE NOTE--------------------------------*/
function chooseColor(passedId) {
  givenId = passedId;

}
/*--------------------------------------CREATE NOTE--------------------------------*/
function createNote() {
  //grab the value of the note
  //console.log("hello");
  var noteText = document.getElementById("note-text").value;
  var noteId = document.getElementById("note-text").id;

  //div element
  var node0 = document.createElement("div");
  node0.setAttribute("style", "margin: 10px");

  //contains the note and will be attached to the div element: node0
  var node1 = document.createElement("h1");

  node1.innerHTML = noteText;
  node1.contentEditable = true;
  node1.setAttribute("style", "position: relative;display: inline-block; width:200px; height:200px;overflow: hidden")
  node1.setAttribute("class", "noteClass");
  node1.style.background = givenId;
  node1.style.display = "relative";

  node0.appendChild(node1);
  var mySpan = document.createElement("span");
  mySpan.className = 'close'
  node1.append(mySpan);
  secondary_container2.insertAdjacentElement("beforeend", node0);


  /* ---------------------------------------------------DRAGGABLE FUNCTION---------------------------------------------------*/


  mySpan.onmousedown = (e) => {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    e.stopPropagation()
  }


  node1.onmousedown = function (event) {

    let shiftX = event.clientX - node1.getBoundingClientRect().left;
    let shiftY = event.clientY - node1.getBoundingClientRect().top;

    node1.style.position = 'absolute';
    node1.style.zIndex = 1000;
    document.body.append(node1);

    moveAt(event.pageX, event.pageY);

    // moves the node0 at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      node1.style.left = pageX - shiftX + 'px';
      node1.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // move the node0 on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the node0, remove unneeded handlers
    node1.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      node1.onmouseup = null;
      return;
    };

    return;
  };



  node1.ondragstart = function () 
  {
    return false;

  };

  /*------------- Draggable Function end --------------------------*/

}
/*--------------------------------------CREATE NOTE MARGIN--------------------------------*/
function margin() {
  var my_margin = ["15px", "1px", "5px", "10px", "20px"];
  return my_margin[Math.floor(Math.random() * my_margin.length)];
}
/*--------------------------------------CREATE NOTE ROTATE--------------------------------*/
function rotate() {
  var my_rotate = ["rotate(-1deg)", "rotate(1deg)", "rotate(3deg)", "rotate(-5deg)", "rotate(-3deg)", "rotate(10deg)"];
  return my_rotate[Math.floor(Math.random() * my_rotate.length)];
}
