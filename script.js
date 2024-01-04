let personOneInput = document.getElementById("person1");
let personTwoInput = document.getElementById("person2");

let personOneSubmit = document.getElementById('personOneSubmit');
let personTwoSubmit = document.getElementById('personTwoSubmit');

let personOneAmounts = document.getElementById('person_one_amounts');
let personTwoAmounts = document.getElementById('person_two_amounts');

let personOneTotalDisplay = document.getElementById('person_one_total');
let personTwoTotalDisplay = document.getElementById('person_two_total');

let totalMoneySpentDisplay = document.getElementById('total');
let splitCostDisplay = document.getElementById('split_cost');
let debtDisplay = document.getElementById('debt');

let personOneTotal = [];
let personTwoTotal = [];

function roundToNearestHundredth(number) {
    return Math.round(number * 100) / 100;
}

function getTotalMoneySpent(arr, arr2) {
    let first = Number(getPersonsTotal(arr));
    let second = Number(getPersonsTotal(arr2));
    return first + second;
}

function getPersonsTotal(arr) {
    
    if (arr.length > 0) {

        sumTotal = arr.reduce(function (a, b) {
            return Number(a) + Number(b);
        });

        return roundToNearestHundredth(sumTotal);
    }

    return 0;
};

function debtText() {
    result = `You're both good`;
    let splitCost = getTotalMoneySpent(personOneTotal, personTwoTotal) / 2;
    let personFirstTotal = getPersonsTotal(personOneTotal);
    let personSecondTotal = getPersonsTotal(personTwoTotal);
    splitCost > personFirstTotal ? result = `Benas owes Urte ${roundToNearestHundredth(splitCost - personFirstTotal)} EUR` : result;
    splitCost > personSecondTotal ? result = `Urte owes Benas ${roundToNearestHundredth(splitCost - personSecondTotal)} EUR` : result;
    return result;
}

function submitEntry(input, submit, amounts, total, display) {

    submit.addEventListener('click', () => {

        if (input.value.trim() === '' || input.value === null || input.value === undefined) {
            console.log('Input empty');
            return;
        }

        let newPar = document.createElement('p');
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';

        deleteBtn.addEventListener('click', () => {
            let indexOfEl = Array.from(amounts.children).indexOf(newPar);
            console.log(newPar.textContent);
            console.log(indexOfEl);
            console.log(amounts.children[indexOfEl])
            console.log('Total: ' + total);
            amounts.removeChild(newPar);
            total.splice(indexOfEl, 1);
            console.log('Total after splice: ' + total);
            totalMoneySpentDisplay.textContent = getTotalMoneySpent(personOneTotal, personTwoTotal);
            splitCostDisplay.textContent = getTotalMoneySpent(personOneTotal, personTwoTotal) / 2;
            display.textContent = getPersonsTotal(total);
            debtDisplay.textContent = debtText();
        });

        newPar.textContent = input.value;
        newPar.appendChild(deleteBtn)
        amounts.appendChild(newPar);
        total.push(input.value);
        input.value = '';

        if (total.length > 0) {
            display.textContent = getPersonsTotal(total);
        }

        totalMoneySpentDisplay.textContent = getTotalMoneySpent(personOneTotal, personTwoTotal);
        splitCostDisplay.textContent = getTotalMoneySpent(personOneTotal, personTwoTotal) / 2;

        debtDisplay.textContent = debtText();
    });
       
};

submitEntry(personOneInput, personOneSubmit, personOneAmounts, personOneTotal, personOneTotalDisplay);
submitEntry(personTwoInput, personTwoSubmit, personTwoAmounts, personTwoTotal, personTwoTotalDisplay);

window.addEventListener('keydown', function (event) {
    if (event.key === "Enter" && personOneInput.matches(":focus")) {
        personOneSubmit.click();                      
    }
    if (event.key === "Enter" && personTwoInput.matches(":focus")) {
        personTwoSubmit.click();                  
    }
  });
  