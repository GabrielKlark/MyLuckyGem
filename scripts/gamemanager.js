(()=>{
    //Colors
    let color1 = "#0000ff";
    let color2 = "#ff0000";
    let color3 = "#800080";

    //Game States
    let isCalculating = false; //Se a pessoa tem bugar o sistema alterando o HTML, o código do botão não será executado enquanto essa variável não for false

    //Gems
    const gems = document.querySelectorAll(".gem-box");
    //Sets Gems colors
    gems[0].firstElementChild.style.backgroundColor = color1;
    gems[1].firstElementChild.style.backgroundColor = color2;
    gems[2].firstElementChild.style.backgroundColor = color3;
    gems[3].firstElementChild.style.backgroundColor = color2;
    gems[4].firstElementChild.style.backgroundColor = color1;
    gems[5].firstElementChild.style.backgroundColor = color3;
    gems[6].firstElementChild.style.backgroundColor = color1;
    gems[7].firstElementChild.style.backgroundColor = color2;
    gems[8].firstElementChild.style.backgroundColor = color3;
    gems[9].firstElementChild.style.backgroundColor = color2;
    gems[10].firstElementChild.style.backgroundColor = color1;
    gems[11].firstElementChild.style.backgroundColor = color3;
    gems.forEach(gem => {
        gem.className = "gem-box notselected-gem-box"
    });
    /* Logo
    - 0, 4, 6, 10 = color1
    - 1, 3, 7, 9 = color2
    - 2, 5, 8, 11 = color3
    */

    //Buttons
    const btnStart = document.querySelector("#btn-start");

    //Inputs
    const rdoColors = document.querySelectorAll("input[name='rdo-color']");
    const inpBet = document.querySelector("#inp-bet");

    //Balance
    const spnBalance = document.querySelector("#balance");
    let balance = 100;

    //Bet
    let bet = 0;

    btnStart.addEventListener("click", (event) => {

        event.preventDefault();

        if(isCalculating)
            return;
        
        isCalculating = true;

        //Desabilita botões para começar aposta
        DisableButtons(true);

        //Reseta animation
        gems.forEach(gem => {
            gem.className = "gem-box notselected-gem-box";
        });

        //Guarda Dados
            //Verifica se aposta não é maior que saldo
            bet = Number(inpBet.value);
            if(bet > balance)
            {
                alert(`Aposta maior que saldo!\nSaldo: ${spnBalance.innerHTML}\nAposta: R$ ${inpBet.value}`)
                DisableButtons(false)
                isCalculating = false;
                return;
            }
            //Verifica a cor selecionada
            let selectedColor;
            for(const rdoColor of rdoColors) {
                if (rdoColor.checked)
                {
                    selectedColor = rdoColor.value;
                    break;
                }
                else
                {
                    selectedColor = "none";
                }
            }
            //Se nenhuma foi selecionada, para execução e reativa o botão
            if(selectedColor == "none")
            {
                alert("Nenhuma cor selecionada para a aposta!")
                DisableButtons(false)
                isCalculating = false;
                return;
            }

            //Gera um valor aleatório para ser a gem selecionada
            let random = generateRandomIntInRange(1, 12);

        //Animation
        // Primeira volta
        gems.forEach((gem, i) => {
            setTimeout(()=>{
                gem.className = "gem-box selected-gem-box";
            }, 100 * i)
        });
        gems.forEach((gem, i) => {
            setTimeout(()=>{
                gem.className = "gem-box notselected-gem-box";
            }, 100 * i + 100)
        });

        // Espera concluir primeira para dar segunda
        setTimeout(()=>{
            gems.forEach((gem, i) => {
                setTimeout(()=>{
                    gem.className = "gem-box selected-gem-box";
                }, 150 * i)
            });
            gems.forEach((gem, i) => {
                setTimeout(()=>{
                    gem.className = "gem-box notselected-gem-box";
                }, 150 * i + 100)
            });

            //Deixa a gem certa ativa na última volta
            setTimeout(()=>{
                gems.forEach((gem, i) => {
                    if(i > random)
                    {
                        return;
                    }
                    
                    setTimeout(()=>{
                        gem.className = "gem-box selected-gem-box";
                    }, 300 * i)
                });
                gems.forEach((gem, i) => {
                    if(i > random - 1)
                    {
                        return;
                    }

                    setTimeout(()=>{
                        gem.className = "gem-box notselected-gem-box";
                    }, 300 * i + 100)
                });

                //Aguardar última volta terminar para mostrar resultados
                setTimeout(()=>{
                    //Verifica se a cor selecionada corresponde a cor da gem
                    switch (selectedColor) {
                        case "color1":
                            if(random == 0 || random == 4 || random == 6 || random == 10)
                            {
                                WinBet();
                            }
                            else
                            {
                                LoseBet();
                            }
                            break;
                        case "color2":
                            if(random == 1 || random == 3 || random == 7 || random == 9)
                            {
                                WinBet();
                            }
                            else
                            {
                                LoseBet();
                            }
                            break;
                        case "color3":
                            if(random == 2 || random == 5 || random == 8 || random == 11)
                            {
                                WinBet();
                            }
                            else
                            {
                                LoseBet();
                            }
                            break;
                        default:
                            console.log("Nenhuma cor selecionada???");
                            break;
                    }
                }, 3600)

            }, 1800);

        }, 1200);
        
    })

    function DisableButtons(state) {
        rdoColors.forEach(rdo => {
            rdo.disabled = state;
        });
        btnStart.disabled = state;
        inpBet.disabled = state;
    }

    function generateRandomIntInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function WinBet() {
        balance += bet
        spnBalance.innerHTML = balance.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        isCalculating = false;
        DisableButtons(false)
    }

    function LoseBet() {
        balance -= bet
        spnBalance.innerHTML = balance.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        isCalculating = false;
        DisableButtons(false)
    }

})();