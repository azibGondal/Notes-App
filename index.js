let textArea = document.getElementById("textArea");
let note = document.querySelector("[data-notes]");
let submitBtn = document.querySelector("[data-submit]");
let eraseBtn = document.querySelector("[data-erase]");
let obj = [];
let i = 0;
// window.localStorage.setItem("note",JSON.stringify(obj))
let targetValue = JSON.parse(localStorage.getItem("note"));

if (targetValue != null) {
  targetValue.forEach((e) => {

  makingNote(e.value , e.id , e.show);
  obj.push({ value: e.value, id: e.id, show: e.show });
  window.localStorage.setItem("note", JSON.stringify(obj));
    
  });
  i = targetValue.length 
}
else 
{
    i = 0;
    obj = []

}

submitBtn.addEventListener("click", () => {
 
  i++;
  makingNote(textArea.value , i , true);
  obj.push({value : textArea.value , id : i , show : true})
  window.localStorage.setItem("note", JSON.stringify(obj));
  textArea.value = null;

});

function makingNote(text , id , show) {

    if(show == false){
        return 
    }
  
    let notes = `
              <div class = "note" id=${id}>  ${text} </div>
    `;
  
    note.insertAdjacentHTML("afterbegin", notes);
  
  if (note.getElementsByTagName("div").length === 1) {
    checking();
  }
}
function checking() {

    let h1 = document.createElement("h1");

  if (note.getElementsByTagName("div").length === 0) {
    h1.id = "extra";
    h1.textContent = "type something to create notes";
    note.appendChild(h1);
  } else {
    let ele = document.getElementById("extra");
    if (ele != null) {
      ele.parentNode.removeChild(ele);
    }

  }
}

checking();

note.addEventListener("click", (e) => {

    textArea.value = e.target.innerHTML;
    let id = e.target.id 
    obj[id-1].show = false 
    window.localStorage.setItem("note", JSON.stringify(obj));
    e.target.classList.add("none");

});

eraseBtn.addEventListener("click", () => {

  note.innerHTML = "";
  localStorage.clear();
  i = 0

});
