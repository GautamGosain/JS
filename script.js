const data = [
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cat.jpeg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cooking couple shoot portofilio(1).jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "NextByk Investor Pitch 2021.ppt"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-june-2021.key"
    }
    
]

let imag = document.getElementById('rightSection');
imag.innerHTML = `<img src=${data[0].previewImage} style="object-fit:fill; width:450px; height:700px;"></img>`

let pageNumberVis = 1;
let selectedImage = 1;
let sectionNumber = 1;

function setImages(pageNumberForm){
    for(let i = 1; i < 5; i++){
        let imageDetails = document.getElementById(`imageName${i}`);
        let imageNumberFor = ((pageNumberForm - 1) * 4) + i;
        let imageNumberFromData = (imageNumberFor - 1) % 5; 

        imageDetails.innerHTML = `<img src=${data[imageNumberFromData].previewImage} style="object-fit:fill; height:100px; width: 75px;"></img>`
        imageDetails.innerHTML += `<span>${data[imageNumberFromData].title}</span>`
        imageDetails.dataset.imageNumber = imageNumberFor;
    }
}

function forSectionChange(temp){
    setImages(temp);
    let pageList = document.getElementsByClassName('pageKey');
    pageNumberVis = temp;
    let copy = temp;
    for(let elem of pageList){
        elem.dataset.pageNumber = copy;
        elem.innerHTML = `${elem.dataset.pageNumber}`
        copy++;
    }
    if(document.getElementsByClassName('selected')[0].id != 'imageName1'){
        document.getElementsByClassName('selected')[0].classList.remove('selected');
        document.getElementById('imageName1').classList.add('selected');
    }
    if(document.getElementsByClassName('selectedPage')[0].id != 'firstPage'){
        document.getElementsByClassName('selectedPage')[0].classList.remove('selectedPage');
        document.getElementById('firstPage').classList.add('selectedPage');
    }
    selectedImage = 1;
    document.getElementById('rightSection').children[0].src = document.getElementById('imageName1').children[0].src;
}

setImages(pageNumberVis);

let pageList = document.getElementsByClassName('pageKey');

for(let elem of pageList){
    elem.innerHTML = `${elem.dataset.pageNumber}`;
}

document.addEventListener('click', function(event){
    event.preventDefault();
    let checkForPresenceOfClass = event.target.closest('div') ?.classList.contains('imageNames')

    if(checkForPresenceOfClass){
        if(selectedImage == event.target.closest('div').dataset.imageNumber)return;

        let temp = document.getElementsByClassName('selected');
        temp[0].classList.remove('selected');
        event.target.closest('div').classList.add('selected');
        selectedImage = event.target.closest('div').dataset.imageNumber;
        document.getElementById('rightSection').children[0].src = event.target.closest('div').children[0].src;
    }
});

document.addEventListener('click',function(event){
    event.preventDefault();
    if(!event.target.classList.contains('pageKey')) return;
    
    setImages(event.target.dataset.pageNumber);
    pageNumberVis = event.target.dataset.pageNumber;
    if(selectedImage != 1){
        document.getElementsByClassName('selected')[0].classList.remove('selected');
        document.getElementById('imageName1').classList.add('selected');
        selectedImage = 1;
    }
    document.getElementsByClassName('selectedPage')[0].classList.remove('selectedPage');
    document.getElementById(`${event.target.id}`).classList.add('selectedPage');
    document.getElementById('rightSection').children[0].src = document.getElementById('imageName1').children[0].src;
});

document.getElementById('leftArrow').addEventListener('click', function(event){
    event.preventDefault();
    if(sectionNumber == 1)return;

    let temp = document.getElementById('firstPage').dataset.pageNumber;
    temp = Number(temp);
    temp -= 3;
    sectionNumber--;
    forSectionChange(temp);
});

document.getElementById('rightArrow').addEventListener('click', function(event){
    if(sectionNumber >= 9) return;
    
    event.preventDefault();
    let temp = document.getElementById('firstPage').dataset.pageNumber;
    temp = Number(temp);
    temp += 3;
    sectionNumber++;
    forSectionChange(temp);
});

function changeSelectedClass(){
    if(document.getElementsByClassName('selected')[0].id != 'imageName1'){
        document.getElementsByClassName('selected')[0].classList.remove('selected');
        document.getElementById('imageName1').classList.add('selected');
    }
}

document.addEventListener('keydown', function(event){
    event.preventDefault();
    if(event.key == 'ArrowDown' || event.key == 'ArrowUp'){
        let elem = document.getElementsByClassName('selected')[0];
        elem.classList.remove('selected');

        let sel = elem.dataset.imageNumber;
        sel = Number(sel); 
        sel %= 4;
        if(sel == 0){sel = 4;}
        if(event.key == 'ArrowDown'){
            sel++;
            if(sel > 4){
                sel = 1;
            } 
            selectedImage = sel;
        }else if(event.key == 'ArrowUp'){
            sel--;
            if(sel < 1){
                sel = 4;
            }
            selectedImage = sel;
        }
        document.getElementById(`imageName`+`${sel}`).classList.add('selected');
        document.getElementById('rightSection').children[0].src = document.getElementsByClassName('selected')[0].children[0].src;
    }else if(event.key == 'ArrowLeft'){
        if(pageNumberVis == 1) return;

        if(pageNumberVis%3 == 1){
            selectedImage = 1;
            sectionNumber--;
            pageNumberVis--;
            setImages(pageNumberVis);
            let pageList = document.getElementsByClassName('pageKey');
            let temp = pageNumberVis - 2;
            for(let item of pageList){
                item.dataset.pageNumber = temp;
                item.innerHTML = `${item.dataset.pageNumber}`;
                temp++;
            }
            changeSelectedClass();

            document.getElementById('firstPage').classList.remove('selectedPage');
            document.getElementById('thirdPage').classList.add('selectedPage');
            document.getElementById('rightSection').children[0].src = document.getElementById('imageName1').children[0].src;
        }else{
            selectedImage = 1;
            pageNumberVis--;
            setImages(pageNumberVis);
            
            changeSelectedClass();
            
            document.getElementsByClassName('selectedPage')[0].classList.remove('selectedPage');
            let list = document.getElementsByClassName('pageKey');
            let elemReq;
            for(let item of list){
                if(item.dataset.pageNumber == pageNumberVis){
                    item.classList.add('selectedPage');
                    elemReq = item;
                    break;
                }
            }
            document.getElementById('rightSection').children[0].src = document.getElementById('imageName1').children[0].src;
        }
    }else if(event.key == 'ArrowRight'){
        if(pageNumberVis%3 == 0){
            if(sectionNumber >= 9) return;

            selectedImage = 1;
            sectionNumber++;
            pageNumberVis++;
            setImages(pageNumberVis);
            let pageList = document.getElementsByClassName('pageKey');
            let temp = pageNumberVis;
            for(let item of pageList){
                item.dataset.pageNumber = temp;
                item.innerHTML = `${item.dataset.pageNumber}`;
                temp++;
            }
            changeSelectedClass();

            document.getElementById('thirdPage').classList.remove('selectedPage');
            document.getElementById('firstPage').classList.add('selectedPage');
            document.getElementById('rightSection').children[0].src = document.getElementById('imageName1').children[0].src;
        }else{
            selectedImage = 1;
            pageNumberVis++;
            setImages(pageNumberVis);
            changeSelectedClass();
            
            document.getElementsByClassName('selectedPage')[0].classList.remove('selectedPage');
            let list = document.getElementsByClassName('pageKey');
            let elemReq;
            for(let item of list){
                if(item.dataset.pageNumber == pageNumberVis){
                    item.classList.add('selectedPage');
                    elemReq = item;
                    break;
                }
            }
            document.getElementById('rightSection').children[0].src = document.getElementById('imageName1').children[0].src;
        }
    }
});






