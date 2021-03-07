const confirmAvatar =
{
    confirmAvatar()
    {
        const avatarSelDisplayDiv = document.querySelector(`#avatarSelected`)
        const moveOntoRoundOne = document.querySelector(`#Yes`)
        const returnToAvatarSel = document.querySelector(`#No`)

        const playerSelected = sessionStorage.getItem(`AvatarSelectedID`)

        returnToAvatarSel.addEventListener(`click`, () => {

            sessionStorage.removeItem(`AvatarSelectedID`)
            location.href = `/TheWeakestLink/html/selectAvatar.html`

        })

        moveOntoRoundOne.addEventListener(`click`,() => {

            location.href = `/TheWeakestLink/html/startGame.html`
            console.log(playerSelected)

        })


        if ( playerSelected == `avatar1`)
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/Cindy.png)`
        }
        else if ( playerSelected == `avatar2`)
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/Helen.png)`
        }
        else if ( playerSelected == `avatar3`)
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/David.png)`
        }
        else if ( playerSelected == `avatar4`)
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/Joan.png)`
        }
        else if ( playerSelected == `avatar5`)
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/Stacy.png)`
        }
        else if ( playerSelected == `avatar6`)
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/Tiffany.png)`
        }
        else
        {
            avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/404Error.png)`

            moveOntoRoundOne.addEventListener(`click`,() => {

                avatarSelDisplayDiv.style.backgroundImage = `url(/TheWeakestLink/img/donkey.jpg)`

            })

            setTimeout(()=>{

                location.href = `/TheWeakestLink/html/selectAvatar.html`
            }, 5000)

        }
            
    }  //end of confirmAvatar
}
confirmAvatar.confirmAvatar()