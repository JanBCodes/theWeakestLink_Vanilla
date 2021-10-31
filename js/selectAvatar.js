import { Avatars } from "./DAO.js"

// ()=>
const selectAvatar = (() => {

    const AvatarsArr = []

    AvatarsArr.push(new Avatars("avatar1","Birdman.png","Birdman","none")); 
    AvatarsArr.push(new Avatars("avatar2","Nicki.png","Nicki","none"));
    AvatarsArr.push(new Avatars("avatar3","Drake.png","Drake", "none")); 
    AvatarsArr.push(new Avatars("avatar4","Cardi.png","Cardi","none"));
    AvatarsArr.push(new Avatars("avatar5","Wayne.png","Wayne","none"));
    AvatarsArr.push(new Avatars("avatar6","Megan.png","Megan","none"));

    const returnToIndexHTML = document.querySelector(`#backButton`)
    const selectAvatarMainDContainer = document.querySelector(`#selectAvatar`)
    const musicButton = document.querySelector(`#musicOnOff`)



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
        
        location.href = `/index.html`

    });

    selectAvatarMainDContainer.addEventListener(`click`, (event) => {

        const avatarImage = (event.target).src;

        console.log(avatarImage)


        location.href = `/html/confirmAvatar.html`

        sessionStorage.setItem(`AvatarSelectedImage`,`${avatarImage}`)
        
    })

    let musicOnOff = true
    let sound = new Audio();
    sound.src = "../audio/7444_the_hour_of_reckoning_94_bpm.mp3"
    sound.oncanplaythrough = () => {

        sound.readyToPlay = true;

    }

    musicButton.addEventListener(`click`, () => {

        console.log(sound.readyToPlay)

        if(sound && sound.readyToPlay && musicOnOff) // check for the sound AND if it has loaded AND my flag is TRUE
        {  
            sound.currentTime = 5;       // the second I want the audio to start
            sound.play();                // play the audio I have
            musicButton.style.backgroundColor = "green" 
            musicOnOff = false;
        }
        else
        {
            sound.pause(); 
            musicButton.style.backgroundColor = "WHITE" 
            musicOnOff = true
        }
    })


})();


