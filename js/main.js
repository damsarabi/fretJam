(function() {
   function changeChord() {

      if (document.getElementById("flavor").value === 'Pen') {
         document.getElementById("extention").selectedIndex = 0;
      }

      var root = document.getElementById("root").value;
      var flvr = document.getElementById("flavor").value;
      var extn = document.getElementById("extention").value;

      document.getElementById("chord").value =  root +  flvr + extn;
      document.getElementById("allnotesChord").value =  root +  flvr + extn;

      document.getElementById("fret-board").className = "container grid " + (document.getElementById("chord").value).toLowerCase();
      document.getElementById("js-allnotes").className = (document.getElementById("chord").value).toLowerCase();
   }  

   document.getElementById("js-clear").addEventListener("click", function() {
    location.reload()
   })

   changeChord();
   document.getElementById("chord").addEventListener("change", changeChord);
   document.getElementById("root").addEventListener("change", changeChord);
   document.getElementById("flavor").addEventListener("change", changeChord);
   document.getElementById("extention").addEventListener("change", changeChord);

   var el = document.querySelectorAll("#fret-board > div");

   for (let i = 0; i < el.length; i++) {
     el[i].addEventListener("click", function() {
      document.getElementById("root").value = el[i].className;
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
        var tmp = document.querySelectorAll("."+xtraNote[i].className);
        for (let j= 0; j < tmp.length; j++) {
          tmp[j].classList.toggle('on');
        }
      });
    }
})();

