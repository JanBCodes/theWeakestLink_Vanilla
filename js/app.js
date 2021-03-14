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

    }//end of init

};
app.init();