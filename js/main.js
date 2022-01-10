(function() {
   function changeChord() {
      document.getElementById("fret-board").className = "container grid " + (document.getElementById("chord").value).toLowerCase()
   }
   changeChord();
   
   document.getElementById("chord").addEventListener("change", changeChord);
})();

