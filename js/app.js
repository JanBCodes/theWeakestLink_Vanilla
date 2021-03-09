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
            const answerSelectedClassName = eventSelected.className;

            if(answerSelected == MainUI.correctAnswer)
            {
                console.log(true)

            }
            else if(answerSelected == answerSelected.className)
            {
                
                console.log(`div selected`)

            }
            else
            {
                console.log(false)


            }
            
            console.log(answerSelectedClassName)


            console.log(answerSelected)
            // console.log(MainUI.correctAnswer)





        })






    }//end of init

};
app.init();