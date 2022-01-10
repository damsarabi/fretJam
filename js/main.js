(function() {
   function changeChord() {
      document.getElementById("chord").value = document.getElementById("root").value + document.getElementById("flavor").value + document.getElementById("extention").value
      document.getElementById("fret-board").className = "container grid " + (document.getElementById("chord").value).toLowerCase()
   }
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
   

})();

