(()=>{
    // Colors
    let color1 = "#0000ff";
    let color2 = "#ff0000";
    let color3 = "#800080";
    let colordefault = "#949494";

    // Game State
    let isCalculating = false; //Se a pessoa tem bugar o sistema alterando o HTML, o código do botão não será executado enquanto essa variável não for false

    // Gems
    const gems = document.querySelectorAll(".gem-box");
    // Escolhe a cor de cada Gem
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

    // Buttons
    const btnStart = document.querySelector("#btn-start");

    // Inputs
    const rdoColors = document.querySelectorAll("input[name='rdo-color']");
    const inpBet = document.querySelector("#inp-bet");

    // Show Results - Para acessar a div que mostra uma animação ao jogador sobre o status de sua aposta (win ou lose)
    const divShowResult = document.querySelector("#div-show-result");
    const spnResult = document.querySelector("#spn-result");

    // Balance - Para manipular o saldo tanto visualmente quanto para controle na programação
    const spnBalance = document.querySelector("#balance");
    let balance = 100;

    // Bet - Para guardar valor de aposta do jogador
    let bet = 0;

    // Selected Color - Cor selecionada pelo jogador
    let selectedColor = "none";

    btnStart.addEventListener("mouseenter", () => {

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

        switch (selectedColor) {
            case "color1":
                btnStart.style.backgroundColor = color1;
                break;
            case "color2":
                btnStart.style.backgroundColor = color2;
                break;
            case "color3":
                btnStart.style.backgroundColor = color3;
                break;
            case "none":
                btnStart.style.backgroundColor = colordefault;
                break;
            default:
                break;
        }
    })

    btnStart.addEventListener("mouseleave", () => {
        btnStart.style.backgroundColor = "#fff";
    })

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
        bet = Number(inpBet.value);
        //Verifica se aposta é negativa ou nula
        if(bet <= 0)
        {
            alert(`A aposta tem que ser um valor acima de zero!`)
            DisableButtons(false)
            isCalculating = false
            return;
        }
        //Verifica se aposta não é maior que saldo
        if(bet > balance)
        {
            alert(`Aposta maior que saldo!\nSaldo: ${balance.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}\nAposta: R$ ${bet.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`)
            DisableButtons(false)
            isCalculating = false
            return;
        }
        //Verifica a cor selecionada
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

        //Gera um valor aleatório para ser a gem selecionada (0 à 11 porque são os indexes de gems possiveis)
        let random = generateRandomIntInRange(0, 11);

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
                }, 300 * random); //random é o index da gem correta. Logo, o timeout deve esperar 300ms para cada gem até a correta

            }, 1800);

        }, 1200);
        
    })

    // Função para desabilitar botões e inputs que o jogador pode interajir
    function DisableButtons(state) {
        rdoColors.forEach(rdo => {
            rdo.disabled = state;
        });
        btnStart.disabled = state;
        inpBet.disabled = state;
    }

    // Função para gerar números aleatórios
    function generateRandomIntInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Função executada quando jogador vence o jogo
    function WinBet() {
        //Mostrando resultado visualmente para jogador
        spnResult.innerHTML = "+" + bet.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        spnResult.className = "win-bet"
        divShowResult.style.display = "flex"

        setTimeout(()=>{
            spnResult.className = ""
            divShowResult.style.display = "none"
        }, 2000)

        balance += bet
        spnBalance.innerHTML = balance.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        isCalculating = false
        DisableButtons(false)
    }

    // Função executada quando jogador perde o jogo
    function LoseBet() {
        //Mostrando resultado visualmente para jogador
        spnResult.innerHTML = "-" + bet.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        spnResult.className = "lose-bet"
        divShowResult.style.display = "flex"

        //Escondendo efeito de resultado
        setTimeout(()=>{
            spnResult.className = ""
            divShowResult.style.display = "none"
        }, 2000)

        balance -= bet
        spnBalance.innerHTML = balance.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        isCalculating = false
        DisableButtons(false)
    }

})();