const confirmAvatar =
{
    confirmAvatar()
    {
        const avatarSelDisplayDiv = document.querySelector(`#avatarSelected`)
        const moveOntoRoundOne = document.querySelector(`#Yes`)
        const returnToAvatarSel = document.querySelector(`#No`)
        const musicButton = document.querySelector(`#musicOnOff`)
        const playerImageSelected = sessionStorage.getItem(`AvatarSelectedImage`)

        console.log(playerImageSelected)

        if(playerImageSelected == `undefined`)
        {

            sessionStorage.removeItem(`AvatarSelectedImage`)
 
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/404Error.png)`

            moveOntoRoundOne.addEventListener(`click`,() => {

                avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/donkey.jpg)`
                avatarSelDisplayDiv.innerHTML = `You need an Avatar to move on`

                setTimeout(() => {

                    location.href = `/TheWeakestLink/html/selectAvatar.html`
                }, 3000)
            })

        }
        else
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(${playerImageSelected})`

            moveOntoRoundOne.addEventListener(`click`,() => {

                location.href = `/TheWeakestLink/html/gameScreen.html`
    
            })

        }

        returnToAvatarSel.addEventListener(`click`, () => {

            sessionStorage.removeItem(`AvatarSelectedImage`)

            location.href = `/TheWeakestLink/html/selectAvatar.html`

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
            sound.loop = true;           // I've set the Audio to this so I can continously play
            sound.play();                // play the audio I have
            musicButton.style.backgroundColor = "green" 
            musicOnOff = false;
        }
        else
        {
            sound.pause(); 
            musicButton.style.backgroundColor = "white" 
            musicOnOff = true
        }
    })
            
    }  //end of confirmAvatar
}
confirmAvatar.confirmAvatar()