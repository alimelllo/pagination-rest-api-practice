
const userNameinput=document.querySelector(".user-name");
const passwordInput=document.querySelector(".password");
const passwordAgain= document.querySelector(".password-again");






const ul = document.getElementById("list");
const pagination = document.querySelector('.pagination');

//counting on a defult 50 data entery(maximum)
let comingData=80;
let btnsnum = comingData/10;
let links=[];

function displayfirstResults(airline) {
  ul.innerHTML = "";
  const { data } = airline;
  
  for (let i in data) {
    const { airline, name } = data[i];
    const { country, website } = airline[0];
    const li = document.createElement("li");
    const textContent = document.createTextNode(
      `name : ${name}  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0  Country : ${country}    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0    website : ${website} `
    );
    li.appendChild(textContent);
    ul.appendChild(li);
  }

}
//pagin buttons

for(let b=0; b<btnsnum; b++){
const btn = document.createElement('li');
pagination.appendChild(btn);
const link = document.createElement('a');
link.setAttribute('href','#');
link.className="link";
link.textContent=b+1;
btn.appendChild(link);
links.push(link);
}
let restbtn=links[Math.trunc(links.length/2)];
restbtn.textContent="...";

  let notvisible=links.slice(2,links.length-2);
  for(let i=0;i<notvisible.length;i++){    
    notvisible[i].style.display="none";
    notvisible[Math.trunc(notvisible.length/2)].style.display="";
    
  }
  restbtn.addEventListener('click',function(){
    for(let i=0;i<notvisible.length;i++){
      notvisible[i].style.display="";
    }
  });

for(let i=0; i<links.length ; i++){
  links[i].addEventListener('click',function(){
    fetchData(i, 10);
  });
}
function fetchData(page, size) {
  fetch(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
  )
    .then((airline) => {
      return airline.json();
    })
    .then(displayfirstResults);
}
fetchData(0, 10);

