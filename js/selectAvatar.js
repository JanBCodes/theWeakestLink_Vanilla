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

            // const avatarSelected = event.target;

            // console.log(avatarSelected)

            // sessionStorage.setItem(`Avatar Selected ID`,`${x}`)

            // location.href = `/TheWeakestLink/confirmAvatar.html`
        })









    }  //end of Main sekectAvatar
}
startGame.selectAvatar()