import RESTAPI from "./DAO.js"

const MainUI =
{
    questionQnAContainer:   document.querySelector(`#displayQnAContainer`),
    moneyTreeContainer:     document.querySelector(`#moneyTreeContainer`),
    displayAnswerContainer: document.querySelector(`#displayAnswerContainer`),
    playerAvatarImg:        document.querySelector(`#playerSelected`),
    timer:                  document.querySelector(`#timerDisplay`),
    roundDisplay:           document.querySelector(`#roundDisplay`),
    currentRoundBankedAmount:    document.querySelector(`#currentBankedAmount`),
    moneyTreeValueDisplay:  document.getElementsByClassName(`moneyTreeValueDisplay`),
    bankedButton:           document.querySelector(`#bankedButton`),
    actionButtons:          document.querySelector(`#actionButtons`),
    bankedBroughtFwd:       document.querySelector(`#bankedAmountBroughtFwd`),
       
    /*  DAO Logic  */
   
    playerImageSelected:    sessionStorage.getItem(`AvatarSelectedImage`),

    /*  Business Logic     */
    endPoint: `https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple`,
    randomQuestionNumber: Math.floor(Math.random() * 50), 
    roundOneMoneyTree: [0,1000,5000,10000,50000,75000,125000,250000,500000],
    roundTwoMoneyTree: [0,1000,10000,750000,125000,500000],
    suddenDeathRound: ["Classic5050.png","ClassicATA.png","ClassicPAF.png"],
    roundTimer: [45,20], //**fix */
    maxBankedPerRound:500000,
    currentRound: 1,
    currentTreeIndex: ``,
    allotedTimeToBank: 1000,
    totalBankedThisRound: 0,
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
                this.currentBankedAmount.innerHTML = 0;
                this.roundDisplay.innerHTML = `Round ${this.currentRound}: Sudden Death`
                this.populateMoneyTree()
                clearInterval(ref)
            }
            else if(this.currentRound == 3)
            {
                this.timer.innerHTML = ``;
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
            /************************************************
            Pushing Answer to Array to be Shuffled for Random display
            *********************************************** */
            const answers = []

            answers.push(questionAndAnswerObj.correctAnswer)  
            questionAndAnswerObj.incorrectAnswers.forEach((dataR) => {

                answers.push(dataR)
            })

            answers.sort()

            console.log(`Answer: ${questionAndAnswerObj.correctAnswer}`)

            this.displayAnswerContainer.innerHTML = ``; //Removes Dynamic Question Previous Created
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

            console.log(`API didn't load Err: ${Err}`)
            
        });

    },

    populateMoneyTree()
    {   
        this.moneyTreeContainer.innerHTML = ``;

        if(this.currentRound === 1)
        {           
            this.bankedBroughtFwd.innerHTML = 0;

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
            this.bankedBroughtFwd.innerHTML = this.totalBankedThisRound;

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

            // this.moneyTreeContainer.style.gridTemplateColumns = '1fr';

            this.moneyTreeContainer.innerHTML = `<div class="suddenDeathTracker"> 1 </div>
            <div class="suddenDeathTracker"> 2  </div>
            <div class="suddenDeathTracker"> 3 </div>
            <div class="suddenDeathTracker"> 4  </div>
            <div class="suddenDeathTracker"> 5  </div>`          

            this.suddenDeathRound.forEach((index) => {

                this.moneyTreeContainer.innerHTML += `<div class="suddenDeathLifeLines"><img src="../img/${index}" alt="a life line"></div> `
                                                        
            })

         }
    },

    checkAnswers(answer)
    {   
        // console.log(this.currentTreeIndex)
          
        this.moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = `#0163C3` //**fix

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

        this.currentRoundBankedAmount.innerHTML = `Banked: ${this.totalBankedThisRound}`;
        let bankedValue = parseInt(this.moneyTreeValueDisplay[this.currentTreeIndex].innerHTML);
        // console.log(bankedValue)
        
        console.log(`Start: ${this.totalBankedThisRound}`)

        this.totalBankedThisRound = (this.totalBankedThisRound + bankedValue)

        console.log(`Banked: ${bankedValue}`)
        console.log(`Total Banked: ${this.totalBankedThisRound}`)


        this.moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = ``;
        this.currentRoundBankedAmount.innerHTML = `Banked: ${this.totalBankedThisRound}`
        this.currentTreeIndex = this.moneyTreeValueDisplay.length-1;
        this.moneyTreeValueDisplay[this.currentTreeIndex].style.backgroundColor = `green`;

        if(this.totalBankedThisRound >= this.maxBankedPerRound)
        {
            this.totalBankedThisRound = 500000;
            this.currentRound++
            this.bankedBroughtFwd.innerHTML = `Total Banked ${this.totalBankedThisRound}`
        }


    },

    displayBankOption()
    {       
        this.actionButtons.style.display = `block`
        this.questionQnAContainer.style.display = `none`
        this.displayAnswerContainer.style.display = `none`

        setTimeout(() => {
                
            this.actionButtons.style.display = `none`
            this.questionQnAContainer.style.display = `grid`
            this.displayAnswerContainer.style.display = `grid`

        },this.allotedTimeToBank)
    }
    
}

export default MainUI;