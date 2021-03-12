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
    moneyTreeValueDisplay:  document.getElementsByClassName(`moneyTreeValueDisplay`),
   
    /*  DAO Logic  */
   
    playerImageSelected:    sessionStorage.getItem(`AvatarSelectedImage`),

    /*  Business Logic     */
    endPoint: `https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple`,
    randomQuestionNumber: Math.floor(Math.random() * 50), 
    roundOneMoneyTree: [0,1000,5000,10000,50000,75000,125000,250000,500000],
    roundTwoMoneyTree: [0,1000,10000,750000,125000,500000],
    suddenDeathRound: ["Classic5050.png","ClassicATA.png","ClassicPAF.png"],
    roundTimer: [60,60], //**fix */
    currentRound: 1,
    currentTreeIndex: ``,

    correctAnswer:``,

    startTimer()
    {
        let currentTimer = this.roundTimer[0];

        this.roundDisplay.innerHTML = `Round ${this.currentRound}`

        const ref = setInterval(() => {

            this.timer.innerHTML = `Time Remaining: ${currentTimer}`;

            currentTimer--;

            // console.log(currentTimer)
            // console.log(this.currentRound)

            if(this.currentRound == 1 && currentTimer == 0 || this.currentTreeIndex == -1 && this.currentRound == 1)
            {
                this.currentRound++;
                this.roundDisplay.innerHTML = `Round ${this.currentRound}`
                currentTimer = this.roundTimer[1]
                this.populateMoneyTree()
            }
            else if(this.currentRound == 2 && currentTimer == 0 || this.currentTreeIndex == -1 && this.currentRound == 2)
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

            this.displayAnswerContainer.innerHTML = ``; //Removes Dynamic Answers Previous Created
            this.questionQnAContainer.innerHTML = ``; //Removes Dynamic Answers Previous Created


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

            //****************************************************************************************** */  
            let moneyTreeValueDisplay = document.querySelectorAll(`.moneyTreeValueDisplay`)
            this.currentTreeIndex = moneyTreeValueDisplay.length-1; // = 9
            this.moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = `green` //**fix

        }
        else if(this.currentRound === 2)
        {
           
            this.roundTwoMoneyTree.reverse().forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<button class="moneyTreeValueDisplay" type="button"> ${index} </button>`

            })

            //****************************************************************************************** */  
            let moneyTreeValueDisplay = document.querySelectorAll(`.moneyTreeValueDisplay`)
            this.currentTreeIndex = moneyTreeValueDisplay.length-1; // = 9
            this.moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = `green` //**fix


        }
        else if(this.currentRound === 3) // Sudden Death
         {
            this.suddenDeathRound.forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<div class="suddenDeathLifeLines"><img src="../img/${index}" alt="a life line"></div>`
            })

         }
    },

    checkAnswers(answer)
    {     
        this.moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = `` //**fix

        if(answer == true)
        {
            this.currentTreeIndex--;
        }
        else
        {
            this.currentTreeIndex = this.moneyTreeValueDisplay.length-1;
            
        }

        this.moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = `green` //**fix

    },

    bankedFunds()
    {
        let bankedFundsThisRound = this.moneyTreeValueDisplay[this.currentTreeIndex].innerHTML
        this.currentBankedAmount.innerHTML += `Banked: ${bankedFundsThisRound}`
    }
    
    
}

export default MainUI;