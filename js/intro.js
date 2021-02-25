const intro = 
{
    main()
    {
        const startGameButton = document.querySelector(`#startGame`)
        // const loadGameButton = document.querySelector(`#loadGame`)
        const rulesButton = document.querySelector(`#gameRules`)
        const displayRules = document.querySelector(`#displayRules`)


        startGameButton.addEventListener(`click`, () => {
            
            location.href = "/TheWeakestLink/html/selectAvatar.html"
            // startGame.selectAvatar();
            console.log(`start Game`)

    
        });

    // loadGameButton.addEventListener("click", () => {   FIX

    // // Load a stored saved file
    // //      Avatar
    // //      Level
    // //      Banked Amt
    // //      Timer Position


    //  });

        rulesButton.addEventListener(`mouseover`, () => {

            displayRules.innerHTML = `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea officia vel architecto numquam laborum veniam ex, modi laudantium enim vitae ad temporibus, rerum facilis nemo porro eveniet possimus? Numquam, ratione?
            Ipsam nesciunt cumque quam sit, illo, nulla quia tempora, provident possimus porro quaerat temporibus? A, cupiditate aliquid quas quaerat aspernatur repellat est. Voluptatibus recusandae, sed neque voluptatem perferendis illum est?
            Ab eaque deserunt beatae, accusantium dolor quo, nobis deleniti porro quaerat possimus ad doloribus? Iste modi corrupti exercitationem deleniti praesentium eius omnis, culpa velit ipsum? Aspernatur, possimus. Maxime, est voluptatibus?
            Autem fugit a temporibus quae voluptatem suscipit harum, inventore officia deserunt, quidem at excepturi. Atque sit voluptatem natus facilis quis fugiat repellat soluta tempore molestias qui impedit, quo iure numquam.
            Sequi exercitationem perferendis vitae dolores, aspernatur quod eveniet itaque aperiam incidunt nemo tempora illo unde enim deleniti molestiae repellendus blanditiis ipsum quisquam neque nobis ad. Reprehenderit voluptates atque eos expedita!
            `

            startGameButton.focus()
        });

        rulesButton.addEventListener(`click`, () => {

            displayRules.innerHTML = ``

        });

    } //end of Main


}

intro.main();
