import MainUI from "./UI.js";

const app =
{
    init() 
    {  
        
        MainUI.startTimer()
        MainUI.populateQnA()
        MainUI.displayAvatar()
        MainUI.populateMoneyTree()


    }//end of init

};
app.init();