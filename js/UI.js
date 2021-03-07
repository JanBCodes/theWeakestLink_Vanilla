import RESTAPI from "./DAO.js"

const MainUI =
{
    questionQnAContainer:   document.querySelector(`#displayQnAContainer`),
    moneyTreeContainer:     document.querySelector(`#moneyTreeContainer`),
    displayAnswerContainer: document.querySelector(`#displayAnswerContainer`),
    playerSelected:         sessionStorage.getItem(`AvatarSelectedID`),
    playerAvatarImg:        document.querySelector(`#playerSelected`),
    timer:                  document.querySelector(`#timerDisplay`),
    roundDisplay:           document.querySelector(`#roundDisplay`),
    currentBankedAmount:    document.querySelector(`#currentBankedAmount`),    

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

    startTimer()
    {
        let currentTimer = 4      // this.roundOneTimer; ***FIX TESTING

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
        console.log(playerSelected)
        
        if ( this.playerSelected == `avatar1`)
        {
            this.playerAvatarImg.style.backgroundImage = `url(/TheWeakestLink/img/Cindy.png)`
        }
        else if ( this.playerSelected  == `avatar2`)
        {
            this.playerAvatarImg.style.backgroundImage  = `url(/TheWeakestLink/img/Helen.png)`
        }
        else if ( this.playerSelected  == `avatar3`)
        {
            this.playerAvatarImg.style.backgroundImage  = `url(/TheWeakestLink/img/David.png)`
        }
        else if ( this.playerSelected  == `avatar4`)
        {
            this.playerAvatarImg.style.backgroundImage  = `url(/TheWeakestLink/img/Joan.png)`
        }
        else if ( this.playerSelected  == `avatar5`)
        {
            this.playerAvatarImg.style.backgroundImage  = `url(/TheWeakestLink/img/Stacy.png)`
        }
        else if ( this.playerSelected  == `avatar6`)
        {
            this.playerAvatarImg.style.backgroundImage  = `url(/TheWeakestLink/img/Tiffany.png)`
        }
        
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
                this.displayAnswerContainer.innerHTML += `<div class="displayAnswers"> ${answers[i]} </div>`

            }   

        })
        .catch((Err) => {

            console.log(`Error`)
            
        });

    },

    populateMoneyTree()
    {   
        this.moneyTreeContainer.innerHTML = ``;

        console.log(`MT: ${this.currentRound}`)

        if(this.currentRound === 1)
        {
            let roundOneMoneyTree = this.roundOneMoneyTree.reverse()
            
            roundOneMoneyTree.forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<button class="moneyTreeValueDisplay" type="button"> ${index} </button>`
        
            })
        }
        else if(this.currentRound === 2)
        {
            let roundTwoMoneyTree = this.roundTwoMoneyTree.reverse()
            
            roundTwoMoneyTree.forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<button class="moneyTreeValueDisplay" type="button"> ${index} </button>`
        
            })
        }
        else if(this.currentRound === 3) // Sudden Death
         {
            this.suddenDeathRound.forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<div class="suddenDeathLifeLines"><img src="../img/${index}" alt=""></div>`
            })
         }
    }
}

export default MainUI;