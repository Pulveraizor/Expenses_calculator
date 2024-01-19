let person_one_input = document.getElementById("person1");
let person_two_input = document.getElementById("person2");

let person_one_submit_btn = document.getElementById('person_one_submit_btn');
let person_two_submit_btn = document.getElementById('person_two_submit_btn');

let person_one_amounts_space = document.getElementById('person_one_amounts');
let person_two_amounts_space = document.getElementById('person_two_amounts');

let person_one_total_display = document.getElementById('person_one_total');
let person_two_total_display = document.getElementById('person_two_total');

let total_money_spent_display = document.getElementById('total');
let split_cost_display = document.getElementById('split_cost');
let debt_display = document.getElementById('debt');

let person_one_total = [];
let person_two_total = [];

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

        sum_total = arr.reduce(function (a, b) {
            return Number(a) + Number(b);
        });

        return roundToNearestHundredth(sum_total);
    }

    return 0;
};

function debtText() {
    result = `You're both good`;
    let split_cost = getTotalMoneySpent(person_one_total, person_two_total) / 2;
    let person_first_total = getPersonsTotal(person_one_total);
    let person_second_total = getPersonsTotal(person_two_total);
    split_cost > person_first_total ? result = `Benas owes Urte ${roundToNearestHundredth(split_cost - person_first_total)} EUR` : result;
    split_cost > person_second_total ? result = `Urte owes Benas ${roundToNearestHundredth(split_cost - person_second_total)} EUR` : result;
    return result;
}

function submitEntry(input, submit, amounts_space, person_total, person_total_display) {

    submit.addEventListener('click', () => {

        if (input.value.trim() === '' || input.value === null || input.value === undefined) {
            console.log('Input empty');
            return;
        }

        let new_amount_line = document.createElement('p');
        let delete_btn = document.createElement('button');

        delete_btn.textContent = '×';
        delete_btn.addEventListener('click', () => {
            let indexOfEl = Array.from(amounts_space.children).indexOf(new_amount_line);
            amounts_space.removeChild(new_amount_line);
            person_total.splice(indexOfEl, 1);

            total_money_spent_display.textContent = getTotalMoneySpent(person_one_total, person_two_total);
            split_cost_display.textContent = getTotalMoneySpent(person_one_total, person_two_total) / 2;
            person_total_display.textContent = getPersonsTotal(person_total);
            debt_display.textContent = debtText();
        });

        new_amount_line.textContent = input.value;
        new_amount_line.appendChild(delete_btn)
        amounts_space.appendChild(new_amount_line);
        person_total.push(input.value);
        input.value = '';

        if (person_total.length > 0) {
            person_total_display.textContent = getPersonsTotal(person_total);
        }

        total_money_spent_display.textContent = getTotalMoneySpent(person_one_total, person_two_total);
        split_cost_display.textContent = getTotalMoneySpent(person_one_total, person_two_total) / 2;
        debt_display.textContent = debtText();
    });
       
};

submitEntry(person_one_input, person_one_submit_btn, person_one_amounts_space, person_one_total, person_one_total_display);
submitEntry(person_two_input, person_two_submit_btn, person_two_amounts_space, person_two_total, person_two_total_display);

window.addEventListener('keydown', function (event) {
    if (event.key === "Enter" && person_one_input.matches(":focus")) {
        person_one_submit_btn.click();                      
    }
    if (event.key === "Enter" && person_two_input.matches(":focus")) {
        person_two_submit_btn.click();                  
    }
  });
  