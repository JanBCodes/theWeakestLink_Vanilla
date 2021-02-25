// import MainUI from "./UI.js";
import RESTAPI from "./RESTAPI.js"

const app =
{
    init() 
    {  
        // get stored Avenger to display
        const endPoint = `https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple`
        
        const newQuestion  = new RESTAPI()

        newQuestion.getAPIData(endPoint)
        .then((data) => { //Resolve

            const randomQuestionNumber = Math.floor(Math.random() * 50)    

            const questionDiv = document.querySelector(`#displayQuestion`)
            const answerDivArr = document.querySelectorAll(`.displayAnswers`)  //returns an Array
            
            const correctAnswer = data.results[randomQuestionNumber].correct_answer

            const answers = []
 
            answers.push(data.results[randomQuestionNumber].correct_answer) 

            data.results[randomQuestionNumber].incorrect_answers.forEach((dataR) => {

                answers.push(dataR)
            })

            questionDiv.innerHTML = `${data.results[randomQuestionNumber].question}`;

            answers.sort()

            for(let i = 0; i < answers.length; i++)
            {
                answerDivArr[i].innerHTML = answers[i]

                if( correctAnswer == answers[i]) // This is just for playing DEMOing the Game
                {
                    answerDivArr[i].style.color = `red`;
                }

            }   // Fix : DRY - Can I use ForEach?

            // answerDivArr.forEach((div) => {
            //     div.innerHTML = answers.forEach()
            // })
        })
        .catch((Err) => {
            //** Passed to the Reject()

            console.log(`Error`)
            
        });

    }//end of init

};
app.init();