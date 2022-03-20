(function() {

  function changeChord() {
    const notes = ["a", "as", "b", "c", "cs", "d", "ds", "e", "f", "fs", "g", "gs"];
    const root = document.getElementById("root").value;
    const chord_type = document.getElementById("chord-type").value;
    const chord_ext = document.getElementById("chord-ext").value;
   
    const minSecond = notes[(notes.indexOf(root) + 1) % 12];
    const majSecond = notes[(notes.indexOf(root) + 2) % 12];
    const minThird = notes[(notes.indexOf(root) + 3) % 12];
    const majThird = notes[(notes.indexOf(root) + 4) % 12];
    const forth = notes[(notes.indexOf(root) + 5) % 12];
    const tritone = notes[(notes.indexOf(root) + 6) % 12];
    const fifth = notes[(notes.indexOf(root) + 7) % 12];
    const minSixth = notes[(notes.indexOf(root) + 8) % 12];
    const majSixth = notes[(notes.indexOf(root) + 9) % 12];
    const minSeventh = notes[(notes.indexOf(root) + 10) % 12];
    const majSeventh = notes[(notes.indexOf(root) + 11) % 12];

    const orderNotes = [root, minSecond, majSecond, minThird, majThird, forth, tritone,fifth, minSixth,majSixth,minSeventh,majSeventh]

    const allNotes = document.querySelectorAll(".note");
    for (let i = 0; i < allNotes.length; i++) {
      allNotes[i].className = "note";
    }

    document.querySelector('#js-allnotes').innerHTML = "";

    // Add Notes to top Section
    for (let i = 0; i < orderNotes.length; i++) {
      var node = document.createElement('li');
      node.className = "note";
      //node.appendChild(document.createTextNode(orderNotes[i]));
      node.setAttribute("data-note",orderNotes[i])
      document.querySelector('#js-allnotes').appendChild(node);
    }

    var cur = document.querySelectorAll('[data-note="'+root+'"]');
    for (let i = 0; i < cur.length; i++) {
      cur[i].classList.add('root', 'on');
    }

    function turnOn(interval) {
      cur = document.querySelectorAll('[data-note="'+eval(interval)+'"]');
      for (let i = 0; i < cur.length; i++) {
        cur[i].classList.add(interval, 'on');
      }
    }

    switch (chord_type) {
      case 'pent':
        turnOn("minThird");
        turnOn("forth");
        turnOn("fifth");
        turnOn("minSeventh");        
        break;
      case 'maj':
        turnOn("majThird");
        turnOn("fifth");
        if (chord_ext === "seventh") turnOn("majSeventh")
        if (chord_ext === "seventh") turnOn("majSeventh")
        break;
      case 'min':
        turnOn("minThird");
        turnOn("fifth");
        if (chord_ext === "sixth") turnOn("majSixth")
        if (chord_ext === "seventh") turnOn("minSeventh")
        if (chord_ext === "nineth") turnOn("nineth")
        break;
      case 'dom':
        turnOn("majThird");
        turnOn("fifth");
        turnOn("minSeventh")
        break;
      case 'dim':
        turnOn("minThird");
        turnOn("tritone");
        if (chord_ext === "seven") turnOn("majSixth")
        if (chord_ext === "halfdim") turnOn("minSeventh")
        break;
      case 'aug':
        break;
      case 'sus':
        break;

      default: 
    }

    var elChord = document.getElementById("chord");

    elChord.setAttribute("data-note",orderNotes[0]);
    elChord.innerHTML = document.querySelector("#js-chord-type li.on").dataset.pretty;
    if (document.querySelector("#js-chord-ext li.on")) {
      elChord.innerHTML = elChord.innerHTML + "<sup>" + document.querySelector("#js-chord-ext li.on").dataset.pretty + "</sup>"
    }
 }  

 // refresh page
 document.getElementById("js-clear").addEventListener("click", function() {
  location.reload()
 })

 // toggle single color
 document.getElementById("js-monochrome").addEventListener("click", function() {
  document.getElementById("fret-board").classList.toggle("monochrome");
  this.classList.toggle('on');
 })

 // Individual note toggle
 document.getElementById("js-ind-notes").addEventListener("click", function() {
  document.getElementById("fret-board").classList.toggle("ind-notes");
  this.classList.toggle('on');
 })

 changeChord();

var el = document.querySelectorAll("#fret-board .note");
for (let i = 0; i < el.length; i++) {
  el[i].addEventListener("click", function() {
    if (document.getElementById("fret-board").classList.contains('ind-notes')) {
      el[i].classList.toggle('on');
    } else {
      document.getElementById("root").value = el[i].dataset.note;
      changeChord();
    }
  })
}

  // Changing the Chord Type
  var ctp = document.querySelectorAll("#js-chord-type > li");
  for (let i = 0; i < ctp.length; i++) {
    ctp[i].addEventListener("click", function() {
      document.getElementById("chord-ext").value = "";
      document.getElementById("chord-type").value = ctp[i].dataset.ctype;
      document.body.className = ctp[i].dataset.ctype;
      if (document.querySelectorAll("#js-chord-type > li.on").length > 0) {
        document.querySelectorAll("#js-chord-type > li.on")[0].classList.toggle('on');
      }
      ctp[i].classList.add("on");

      changeChord();
    });
  }

  // Changing the Chord Extention
  var cxt = document.querySelectorAll("#js-chord-ext > li");
  for (let i = 0; i < cxt.length; i++) {
    cxt[i].addEventListener("click", function() {
      if (cxt[i].classList.contains('on')) {
        document.getElementById("chord-ext").value = "";
        document.querySelectorAll("#js-chord-ext > li.on")[0].classList.toggle('on');
      } else {
        document.getElementById("chord-ext").value = cxt[i].dataset.cext;
        if (document.querySelectorAll("#js-chord-ext > li.on").length > 0) {
          document.querySelectorAll("#js-chord-ext > li.on")[0].classList.toggle('on');
        }
        cxt[i].classList.add('on');
      }
      changeChord();
    });
  }

  var rowHide = document.querySelectorAll("#js-row-toggle > li"); 
  for (let i = 0; i < rowHide.length; i++) {
    rowHide[i].addEventListener("click", function() {
      rowHide[i].classList.toggle("hide");
    });
  }

  var xtraNote = document.querySelectorAll("#js-allnotes > li");

  for (let i = 0; i < xtraNote.length; i++) {
    xtraNote[i].addEventListener("click", function() {
      var tmp = document.querySelectorAll('[data-note="'+xtraNote[i].dataset.note+'"]'); 
      for (let j= 0; j < tmp.length; j++) {
        tmp[j].classList.toggle('on');
      }
    });
  }
})();

