import Avatars from "./DOA2.js"

// ()=>
const selectAvatar = (()=>{

    const AvatarsArr = []

    AvatarsArr.push(new Avatars("avatar1","Cindy.png","Cindy")); 
    AvatarsArr.push(new Avatars("avatar2","David.png","David"));
    AvatarsArr.push(new Avatars("avatar3","Helen.png","Helen")); 
    AvatarsArr.push(new Avatars("avatar4","Joan.png","Joan"));
    // AvatarsArr.push(new Avatars("avatar5","Helen.png","A picture of Rolls Royce Phantom"));
    // AvatarsArr.push(new Avatars("avatar6","Helen.png","A picture of Audi R8"));

    console.log(AvatarsArr)

    const returnToIndexHTML = document.querySelector(`#backButton`)
    const selectAvatarMainDContainer = document.querySelector(`#selectAvatar`)

    returnToIndexHTML.addEventListener(`click`, () => {
        
        location.href = `/TheWeakestLink/index.html`

    });

    selectAvatarMainDContainer.addEventListener(`click`, (event) => {

        const avatarSelected = (event.target).id;

        console.log( avatarSelected)

        location.href = `/TheWeakestLink/html/confirmAvatar.html`

        sessionStorage.setItem(`AvatarSelectedID`,`${avatarSelected}`)
        
    })

    AvatarsArr.forEach((index) => {

        selectAvatarMainDContainer.innerHTML += `
        <div id="${index.id}" class="avatar"> 
            <img src="../img/${index.image}">
            <button type="button" class="avatarSelectionButtons">
            ${index.name}
            </button> 
        </div>` 
        
    })

})();


