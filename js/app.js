import MainUI from "./UI.js";

const app =
{
    init() 
    {          
        MainUI.startTimer()
        MainUI.populateQnA()
        MainUI.displayAvatar()
        MainUI.populateMoneyTree()

        MainUI.displayAnswerContainer.addEventListener(`click`, (event) => {

            const eventSelected = (event.target)
            const answerSelected = eventSelected.innerHTML;

           console.log()

            if(eventSelected.id == `displayAnswerContainer`)
            {
                // HTML selected - Do nothing
                console.log(`displayAnswerContainer`)
            }
            else if(answerSelected == MainUI.correctAnswer) //correct answer
            {
                MainUI.checkAnswers(true)// money tree climbs one
                MainUI.displayBankOption()// Gives the options to Bank Money
                MainUI.populateQnA() // calls new question  

            }
            else // Wrong Answer 
            {
                MainUI.checkAnswers(false)
                MainUI.populateQnA() // calls new question
            }
        })

        MainUI.bankedButton.addEventListener(`click`,(event) => {

            MainUI.bankedFunds()
            
        })


        const musicButton = document.querySelector(`#musicOnOff`)

        let musicOnOff = true
        let sound = new Audio();
        sound.src = "../audio/questionBed.mp3"
        sound.oncanplaythrough = () => {
    
            sound.readyToPlay = true;
    
        }
    
        musicButton.addEventListener(`click`, () => {
    
            console.log(sound.readyToPlay)
    
            if(sound && sound.readyToPlay && musicOnOff) // check for the sound AND if it has loaded AND my flag is TRUE
            {  
                sound.currentTime = 20;       // the second I want the audio to start
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

    }//end of init

};
app.init();