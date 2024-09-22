
let modalId = ['modal-1', 'modal-2', 'modal-3', 'modal-4', 'modal-5', 'modal-6', 'modal-7', 'modal-8', 'modal-9'];
let rows = 9;
let modalList = [];
function newsUi() {
    const container = document.getElementById('news-grid');
    container.innerHTML = '';
    const top = document.createElement('div');
    const newsRRS = JSON.parse(localStorage.getItem('news')) || [];
    top.classList.add('custom-container');
    for (let key = 0; key < rows; key++) {
        modalList[key] = `modal-${key}`;
        const Card = document.createElement('div');
        Card.classList.add('card', 'col-12','col-md-4');
        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = 'img/img1.svg';
        const CardBody = document.createElement('div');
        CardBody.classList.add('card-body');
        CardBody.setAttribute('data-key',key);
        const CardTitle = document.createElement('div');
        CardTitle.classList.add('card-title');
        CardTitle.textContent = 'Card title';
        const CardP = document.createElement('p');
        CardP.classList.add('card-text');
        CardP.id=`card-text-${key}`;
        if(newsRRS[key]){
                    CardP.textContent = `${newsRRS[key]}`
        }else{
                    CardP.textContent = `Card is ready for a new ${key+1}`;
        }
        const CardButton = document.createElement('div');
        CardButton.classList.add('btn', 'btn-outline-primary', 'custom-class');
        CardButton.textContent = 'Add news';
        CardButton.setAttribute('data-key',key);
        Card.appendChild(cardImg);
        CardBody.appendChild(CardTitle);
        CardBody.appendChild(CardP);
        CardBody.appendChild(CardButton);
        Card.appendChild(CardBody);
        top.appendChild(Card);

    }
    container.appendChild(top);
}
newsUi();
document.addEventListener('click', function (event) {
    const pi = event.target;
    const containerModals = document.getElementById('container-modals');
    const topDiv = document.createElement('div');
    topDiv.classList.add('custem');

    if(pi.classList.contains('custom-class')){
        console.log('btn clicked!');
        const key = pi.getAttribute('data-key');
        let modal = document.getElementById(`modal-${key}`);
        if(!modal){
            modal=document.createElement('div');
            modal.id=`modal-${key}`;
            modal.classList.add('modal');
            document.body.appendChild(modal);
        }
        modal.innerHTML = '';
       const dBlockDiv = document.createElement('div');
       dBlockDiv.classList.add('d-flex','justify-content-center','mt-5');
       const TopDiv = document.createElement('div');
       TopDiv.textContent = 'Enter a new'
       const input = document.createElement('input');
       input.style.display = 'block';
       input.classList.add('py-5','px-5','mt-2');
       input.type = 'text';
       const button = document.createElement('button');
       button.classList.add('btn','btn-outline-primary','block','mt-2');
       button.textContent = 'Click to add';

       button.addEventListener('click', ()=>{
        const URlfeed = input.value;
        aDdd(URlfeed, key);
       });

       TopDiv.appendChild(input);
       TopDiv.appendChild(button);
       dBlockDiv.appendChild(TopDiv);
        modal.appendChild(dBlockDiv);
        modal.style.display = 'block';
        topDiv.appendChild(modal);
    }
    containerModals.appendChild(topDiv);
});
function aDdd(URlfeed,key){
    let feedRss = JSON.parse(localStorage.getItem('news')) || [];
    feedRss[key]=URlfeed;
    localStorage.setItem('news', JSON.stringify(feedRss));

    const cardText = document.getElementById(`card-text-${key}`);
    if(cardText){
        cardText.textContent = `new content added: ${URlfeed}`;
        console.log('new content added',key,URlfeed);
    }else{
        console.log('no card avalible', key)
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    const rss = JSON.parse(localStorage.getItem('news')) || [];
    console.log(rss);
})
document.addEventListener('click', (event)=>{
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal)=>{
        if(event.target===modal){
            modal.style.display = 'none';
        }
    });
});