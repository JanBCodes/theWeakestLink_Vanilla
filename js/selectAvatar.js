import Avatars from "./DAO2.js"

// ()=>
const selectAvatar = (() => {

    const AvatarsArr = []

    AvatarsArr.push(new Avatars("avatar1","Cindy.png","Cindy")); 
    AvatarsArr.push(new Avatars("avatar2","David.png","David"));
    AvatarsArr.push(new Avatars("avatar3","Helen.png","Helen")); 
    AvatarsArr.push(new Avatars("avatar4","Joan.png","Joan"));
    AvatarsArr.push(new Avatars("avatar5","stacy.png","Stacy"));
    AvatarsArr.push(new Avatars("avatar6","Tiffany.png","Tiffany"));

    const returnToIndexHTML = document.querySelector(`#backButton`)
    const selectAvatarMainDContainer = document.querySelector(`#selectAvatar`)


    AvatarsArr.forEach((index) => {

        selectAvatarMainDContainer.innerHTML += `
        <div id="${index.id}" class="avatar"> 
            <button id="${index.id}" type="button" class="avatarSelectionButtons">
            <img id="avatarImage" src="../img/${index.image}">
                ${index.name}
            </button> 
        </div> ` 

    })
   
    returnToIndexHTML.addEventListener(`click`, () => {
        
        location.href = `/TheWeakestLink/index.html`

    });

    selectAvatarMainDContainer.addEventListener(`click`, (event) => {

        const avatarImage = (event.target).src;

        console.log(avatarImage)


        location.href = `/TheWeakestLink/html/confirmAvatar.html`

        sessionStorage.setItem(`AvatarSelectedImage`,`${avatarImage}`)
        
    })


})();


