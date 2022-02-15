(function() {

  function changeChord() {
    const notes = ["a", "as", "b", "c", "cs", "d", "ds", "e", "f", "fs", "g", "gs"]
    const root = document.getElementById("root").value;
    const chord_type = document.getElementById("chord-type").value;
    const chord_ext = document.getElementById("chord-ext").value;

    const minThird = notes[(notes.indexOf(root) + 3) % 12];
    const majThird = notes[(notes.indexOf(root) + 4) % 12];
    const forth = notes[(notes.indexOf(root) + 5) % 12];
    const tritone = notes[(notes.indexOf(root) + 6) % 12];
    const fifth = notes[(notes.indexOf(root) + 7) % 12];
    const majSixth = notes[(notes.indexOf(root) + 9) % 12];

    const minSeventh = notes[(notes.indexOf(root) + 10) % 12];
    const majSeventh = notes[(notes.indexOf(root) + 11) % 12];

    const allNotes = document.querySelectorAll(".note")
    for (let i = 0; i < allNotes.length; i++) {
      allNotes[i].className = "note";
    }

    var cur = document.querySelectorAll('[data-note="'+root+'"]');
    for (let i = 0; i < cur.length; i++) {
      cur[i].classList.add('root', 'on');
    }

    function turnOn(interval) {
      cur = document.querySelectorAll('[data-note="'+eval(interval)+'"]');
      console.log(cur.length)
      for (let i = 0; i < cur.length; i++) {
        cur[i].classList.add('"'+interval+'"', 'on');
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
        break;
      case 'min':
        turnOn("minThird");
        turnOn("fifth");
        break;
      case 'dom':
        turnOn("majThird");
        turnOn("fifth");
        turnOn("minSeventh")
        break;
      case 'dim':
        cur = document.querySelectorAll('[data-note="'+minThird+'"]');
        for (let i = 0; i < cur.length; i++) {
          cur[i].classList.add('minThird', 'on');
        }
        cur = document.querySelectorAll('[data-note="'+tritone+'"]');
        for (let i = 0; i < cur.length; i++) {
          cur[i].classList.add('tritone', 'on');
        }
        if (chord_ext === "seven") {
          cur = document.querySelectorAll('[data-note="'+majSixth+'"]');
          for (let i = 0; i < cur.length; i++) {
            cur[i].classList.add('majSixth', 'on');
          }
        }
        if (chord_ext === "halfdim") {
          cur = document.querySelectorAll('[data-note="'+minSeventh+'"]');
          for (let i = 0; i < cur.length; i++) {
            cur[i].classList.add('minSeventh', 'on');
          }
        }
        break;
      case 'aug':
        break;
      case 'sus':
        break;

      default: 
    }
 }  

 document.getElementById("js-clear").addEventListener("click", function() {
  location.reload()
 })

 changeChord();

// Changing the Root
var el = document.querySelectorAll(".note");
  for (let i = 0; i < el.length; i++) {
    el[i].addEventListener("click", function() {
    document.getElementById("root").value = el[i].dataset.note;
    changeChord();
  });
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
      document.getElementById("chord-ext").value = cxt[i].dataset.cext;
      if (document.querySelectorAll("#js-chord-ext > li.on").length > 0) {
        document.querySelectorAll("#js-chord-ext > li.on")[0].classList.toggle('on');
      }
      cxt[i].classList.add('on');

      changeChord();
    });
  }

  var rowHide = document.querySelectorAll("#js-row-toggle > li") 
  for (let i = 0; i < rowHide.length; i++) {
    rowHide[i].addEventListener("click", function() {
      rowHide[i].classList.toggle("hide");
    });
  }

  var xtraNote = document.querySelectorAll("#js-allnotes > li")

  for (let i = 0; i < xtraNote.length; i++) {
    xtraNote[i].addEventListener("click", function() {
      var tmp = document.querySelectorAll("."+xtraNote[i].dataset.note);
      for (let j= 0; j < tmp.length; j++) {
        tmp[j].classList.toggle('on');
      }
    });
  }
})();

