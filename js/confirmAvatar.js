const confirmAvatar =
{
    confirmAvatar()
    {
        const avatarSelDisplayDiv = document.querySelector(`#avatarSelected`)
        const moveOntoRoundOne = document.querySelector(`#Yes`)
        const returnToAvatarSel = document.querySelector(`#No`)

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
            
    }  //end of confirmAvatar
}
confirmAvatar.confirmAvatar()