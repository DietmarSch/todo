const input = document.querySelector('#input');
const ul = document.querySelector('ul');
const submitBtn = document.querySelector('#submitBtn');

function createNewLi(strToDo, strClass){
    const newLi = document.createElement('li'); 
    const newSpan = document.createElement('span');
    const doneBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    
    newLi.setAttribute('class',strClass);
    newSpan.innerText = strToDo;
    doneBtn.innerText = 'Done';
    doneBtn.classList.add('doneBtn');
    deleteBtn.innerText = 'Remove';
    newLi.append(doneBtn, deleteBtn, newSpan);
    ul.append(newLi);
    
    doneBtn.addEventListener('click', function(){
        newLi.classList.toggle('done');
        store();
    })
    deleteBtn.addEventListener('click', function(e){
        e.target.parentElement.remove();
        store();
    })
}

function store(){
    const storageArr=function(){
        const tempArr=[];
        const todoElements=document.querySelectorAll('.todo');
        console.log(todoElements);
        for(let i=0;i<todoElements.length;i++){
            console.log(todoElements[i].lastElementChild)
            tempArr.push([todoElements[i].lastElementChild.innerText,todoElements[i].className]);
        }
        return tempArr;
    }
    console.log(storageArr());
    console.log(JSON.stringify(storageArr()));
    localStorage.setItem("Speicher",JSON.stringify(storageArr()));
}

function read(){
    if (localStorage.hasOwnProperty('Speicher')){
        const returnedArr = JSON.parse(localStorage.getItem('Speicher'));
        for(let i=0; i<returnedArr.length;i++){
            createNewLi(returnedArr[i][0],returnedArr[i][1]);
        } 
    } else {
        console.log("Speicher leer!")
    }
}

submitBtn.addEventListener('click', function(e){ 
    e.preventDefault(); 
    if (input.value) {
        createNewLi(input.value,'todo'); 
        input.value = '';
        store();
    };
});

read();
