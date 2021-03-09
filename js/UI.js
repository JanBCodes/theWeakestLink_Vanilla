import RESTAPI from "./DAO.js"

const MainUI =
{
    questionQnAContainer:   document.querySelector(`#displayQnAContainer`),
    moneyTreeContainer:     document.querySelector(`#moneyTreeContainer`),
    displayAnswerContainer: document.querySelector(`#displayAnswerContainer`),
    playerAvatarImg:        document.querySelector(`#playerSelected`),
    timer:                  document.querySelector(`#timerDisplay`),
    roundDisplay:           document.querySelector(`#roundDisplay`),
    currentBankedAmount:    document.querySelector(`#currentBankedAmount`),
   
    /*  DAO Logic
     */
   
    playerImageSelected:    sessionStorage.getItem(`AvatarSelectedImage`),


    /*  Business Logic
     */
    endPoint: `https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple`,
    randomQuestionNumber: Math.floor(Math.random() * 50), 
    roundOneMoneyTree: [0,1000,5000,10000,50000,75000,125000,250000,500000],
    roundTwoMoneyTree: [0,1000,10000,750000,125000,500000],
    suddenDeathRound: ["Classic5050.png","ClassicATA.png","ClassicPAF.png"],
    roundOneTimer: 120,
    roundTwoTimer: 90,
    currentRound: 1,
    currentTreeIndex: 0,

    correctAnswer:``,

    startTimer()
    {
        let currentTimer = 900      // this.roundOneTimer; ***FIX TESTING

        this.roundDisplay.innerHTML = `Round ${this.currentRound}`

        const ref = setInterval(() => {

            this.timer.innerHTML = `Time Remaining: ${currentTimer}`;

            currentTimer--;

            if(this.currentRound == 1 && currentTimer == 0)
            {
                this.currentRound++;
                this.roundDisplay.innerHTML = `Round ${this.currentRound}`
                currentTimer = 5 // this.roundTwoTimer; ***FIX TESTING 
                this.populateMoneyTree()
            }
            else if(this.currentRound == 2 && currentTimer == 0)
            {
                this.currentRound++;
                this.timer.innerHTML = ``;
                this.currentBankedAmount.innerHTML = ``;
                this.roundDisplay.innerHTML = `Round ${this.currentRound}: Sudden Death`
                this.populateMoneyTree()
                clearInterval(ref)
            }
        },1000)
    },

    displayAvatar()
    {   
        this.playerAvatarImg.style.backgroundImage = `url(${this.playerImageSelected})`
    },

    populateQnA()
    {      

       const newQuestion  = new RESTAPI()

        newQuestion.getAPIData(this.endPoint)

        .then((data) => {

            const questionAndAnswerObj = {

                question: data.results[this.randomQuestionNumber].question,
                correctAnswer: data.results[this.randomQuestionNumber].correct_answer,
                incorrectAnswers: data.results[this.randomQuestionNumber].incorrect_answers //array
            }

            this.correctAnswer = questionAndAnswerObj.correctAnswer
            /****************************************
            Pushing Answer to Array to be Shuffled for Random display
            *************************************** */
            const answers = []
 
            answers.push(questionAndAnswerObj.correctAnswer) 
            questionAndAnswerObj.incorrectAnswers.forEach((dataR) => {

                answers.push(dataR)
            })

            answers.sort()

            console.log(questionAndAnswerObj.correctAnswer)

            /****************************************
            Dynamically Displaying Q&A with API data
            *************************************** */          
            this.questionQnAContainer.innerHTML = `<div id="displayQuestion"> ${questionAndAnswerObj.question} </div>`

            for(let i = 0; i < answers.length; i++)
            {               
                this.displayAnswerContainer.innerHTML += `<div class="displayAnswers">${answers[i]}</div>`

            }   

        })
        .catch((Err) => {

            console.log(`Error`)
            
        });

    },

    populateMoneyTree()
    {   
        this.moneyTreeContainer.innerHTML = ``;

        if(this.currentRound === 1)
        {           
            this.roundOneMoneyTree.reverse().forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<button class="moneyTreeValueDisplay" type="button"> ${index} </button>`
            })
            
            let moneyTreeValueDisplay = document.querySelectorAll(`.moneyTreeValueDisplay`)
            moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = `green` //**fix

        }
        else if(this.currentRound === 2)
        {
           
            this.roundTwoMoneyTree.reverse().forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<button class="moneyTreeValueDisplay" type="button"> ${index} </button>`

            })

        }
        else if(this.currentRound === 3) // Sudden Death
         {
            this.suddenDeathRound.forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<div class="suddenDeathLifeLines"><img src="../img/${index}" alt="a life line"></div>`
            })
         }
    },

    verifyAnswers()
    {

    },
    
    moneyTreePosition()
    {

    }
}

export default MainUI;