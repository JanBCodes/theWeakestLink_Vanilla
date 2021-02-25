const startGame =
{
    selectAvatar()
    {
        const returnToIndexHTML = document.querySelector(`#backButton`)
        const selectAvatarMainDContainer = document.querySelector(`#selectAvatar`)

        returnToIndexHTML.addEventListener(`click`, () => {
            
            location.href = `/TheWeakestLink/index.html`

            console.log(`Back Button`)
   
        });

        selectAvatarMainDContainer.addEventListener(`click`, (event) => {

            const avatarSelected = (event.target).id;

            console.log( avatarSelected)

            location.href = `/TheWeakestLink/html/confirmAvatar.html`

            sessionStorage.setItem(`AvatarSelectedID`,`${avatarSelected}`)
            
        })

    }  //end of Main selectAvatar
}
startGame.selectAvatar()