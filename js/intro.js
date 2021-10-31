const intro = 
{
    main()
    {
        const startGameButton = document.querySelector(`#startGame`)
        // const loadGameButton = document.querySelector(`#loadGame`)
        const rulesButton = document.querySelector(`#gameRules`)
        const displayRules = document.querySelector(`#displayRules`)
        const musicButton = document.querySelector(`#musicOnOff`)

        startGameButton.addEventListener(`click`, () => {
            
            location.href = "./html/selectAvatar.html"
            // startGame.selectAvatar();
            console.log(`start Game`)

    
        });

        rulesButton.addEventListener(`mouseover`, () => {

            displayRules.innerHTML = `
            3 Rounds of Questions <br/><br/>
            Every Correct Answer Moves You Up The Money Tree <br/> & The Chance to BANK Your BUCKS <br/> <br/>
            Every Incorrect Answer Restarts Your Money for That Round  <br/> <br/>
            Only Banked Money Can Move to the next Round`

            startGameButton.focus()
        });

        rulesButton.addEventListener(`click`, () => {

            displayRules.innerHTML = ``

        });

        let musicOnOff = true
        let sound = new Audio();
        sound.src = "./audio/openingTitle.mp3" 
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
                musicButton.style.backgroundColor = "white" 
                musicOnOff = true
            }
        })


    } //end of Main


}

intro.main();
