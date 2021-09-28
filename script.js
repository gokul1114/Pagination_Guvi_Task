
//http req and resp
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",true);
xhttp.send();
xhttp.onload = function () {
    if (xhttp.status >= 200 && xhttp.status < 300) {
      var resp = JSON.parse(this.response);
      //Storing the response in sesion storage
      sessionStorage.setItem("list",this.response)

    } else {
      console.log(xhttp.responseText);
    }
  };

//assigning the session variable to local variable
 const list = JSON.parse(sessionStorage.getItem("list"));
 
 //clearing session items
 sessionStorage.removeItem("list");
 sessionStorage.clear();
 console.log(sessionStorage);

 
body = document.querySelector('body');
var containerDiv =  document.createElement("div");
containerDiv.setAttribute("class","container");
containerDiv.style.display = "flex";
containerDiv.style.flexDirection = "column";
containerDiv.style.justifyContent = "center";
containerDiv.style.alignItems = "center";
containerDiv.style.marginTop = "5%";
document.body.appendChild(containerDiv);

let mainDiv = document.createElement("div");
containerDiv.appendChild(mainDiv);



let wrapperDiv = document.createElement("div");
wrapperDiv.setAttribute("id","content");



var numOfRows = 5;


function Display(numOfRows , pageNo){
      console.clear();
      let startLimit = (pageNo-1)*numOfRows;
      let endLimit = ((pageNo)*numOfRows<list.length) ? (pageNo)*numOfRows : list.length;
      for(let i = startLimit ; i < endLimit; i++) {
          displayListElement(list[i],wrapperDiv);
      }

}

function displayListElement(item,wrapperDiv) {

    let div = document.createElement("div");
    
    
    console.log(item);
    for(let i in item) {
        div.innerHTML = div.innerHTML +"<br>"+ item[i];
    }
    div.style.fontSize = "15px";
    div.style.display = "flex";
    div.style.justifyContent = "left";
    div.style.borderBottom = "1px solid black";
    div.style.padding = "5px"
    wrapperDiv.appendChild(div);
    mainDiv.appendChild(wrapperDiv);
}

function createPagination(list) {
    let numberOfPages = Math.ceil(list.length/numOfRows);
    let div = document.createElement("div");
    div.style.margin = "20px";
    div.setAttribute("class","pagination");
    
    let ul = document.createElement("ul");
    ul.style.display = "flex";
    ul.setAttribute("class","pagination pagination-lg")
    
    for(let i=1; i<=numberOfPages; i++) {
        let li =  document.createElement("li");
        li.style.listStyleType = "none";
        li.style.borderRight = "1px solid black"
        li.setAttribute("class","page-item");
        
        
        let a = document.createElement("a");
        a.innerHTML = i;
        a.style.fontSize = "20px";
        a.style.padding = "5px";
        a.setAttribute("class","page-link")
        a.setAttribute("href","#");
        li.appendChild(a);
        ul.appendChild(li);
    }

    div.appendChild(ul);
    containerDiv.appendChild(div);
}
Display(numOfRows, 1);
createPagination(list);

var pageButtons = document.querySelectorAll(".page-link");

pageButtons.forEach(e =>{
    // console.log(e);
    e.addEventListener('click', () => {
        let ele =  document.getElementById("content");
        ele.innerHTML = "";
        let pageNum = parseInt(e.innerHTML);
        Display(numOfRows, pageNum);
        
    })

})




