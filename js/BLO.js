const businessRules = 

{
    endPoint: `https://opentdb.com/api.php?amount=50&difficulty=hard&type=multiple`,
    randomQuestionNumber: Math.floor(Math.random() * 50), 
    roundOneMoneyTree: [0,1000,5000,10000,50000,75000,125000,250000,500000],
    roundTwoMoneyTree: [0,1000,10000,750000,125000,500000],
    suddenDeathRound: ["Classic5050.png","ClassicATA.png","ClassicPAF.png"],
    roundTimer: [120,150], 
    maxBankedPerRound:500000,
    allotedTimeToBank: 3000

}

export default businessRules;

