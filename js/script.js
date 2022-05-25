const bill = document.querySelector('#bill>input');
const custom = document.querySelector('#custom>input');
const peoples = document.querySelector('#peoples>input');

let tip_value = 0;
let total = 0;
let tip_amount = 0;
let burron = false;

const tip = document.querySelector('#options');
let options = [];
for (let i=1; i<=5; i++)
  options.push(tip.querySelector('div:nth-of-type(' + i + ')'))

const totalSpan = document.querySelector('#totalPerson span');
const tipAmount = document.querySelector('#tipAmount span');

const reset = document.querySelector('button');

const error = document.querySelector('.error');

function TypingMask(div, keys) {
  let keysArray = ['0', '1', '2', '3', '4', '5', '7', '8', '9'];
  let key = keys.key;
  let input = document.querySelector("#" + div.id + ">input");

  //PONTO
  if (div.id != 'peoples' && key == '.')
  {  
    //VERIFICAR SE TEM MAIS DE UM PONTO
    if (input.value.split('.').length > 1)
      return keys.preventDefault();
    else
      if (input.value == '')
        input.value = '0.';
      else
        return keys.key;
  }
  
  if (!keysArray.includes(key))
    return keys.preventDefault();
}

// SHOW
function Show(value, pos) {
  ResetShow(true);
  if (pos == 'total')
  {
    peoples.style = '';  
    error.style = 'opacity: 0';
    totalSpan.innerHTML = '$' + value.toFixed(2);
  }
  else if (pos == 'error')
  {
    peoples.style = 'border-color: #ec4646;';  
    error.style = 'opacity: 1';
  }
}

function Calculate() {
  const bill_value = Number(bill.value);
  const custom_value = Number(custom.value);
  const peoples_value = Number(peoples.value);

  if (bill_value >= 0) {
    if (peoples_value > 0) {
      let person = bill_value / peoples_value;
      if (custom_value > 0)
        tip_amount = (person * custom_value / 100);
      else
        tip_amount = (person * tip_value / 100);
      
      tipAmount.innerHTML = '$' + tip_amount.toFixed(2);  
      total = person + tip_amount;
      Show(total, 'total');
    }
    else if (peoples.value != '') {
      Show(0, 'error');
    }
  }
}

function ResetShow(boolean) {
  button = boolean;
  
  reset.classList.toggle('clickable', button);
}

reset.addEventListener('click', () => {
  if (button)
  {
    ResetShow(false);
    bill.value = '';
    custom.value = '';
    peoples.value = '';
    totalSpan.innerHTML = '$0.00';
    tipAmount.innerHTML = '$0.00';
    tip_value = 0;
    total = 0;
    tip_amount = 0;
    for (let div of options)
      div.classList.remove('active');
  }
});

document.addEventListener('keypress', (keys) => {TypingMask(keys.path[1], keys);});
document.addEventListener('keyup', () => Calculate());

tip.addEventListener('click', (e) => {
  for (let div of options)
    div.classList.remove('active');
  div = e.target;
  div.classList.toggle('active');
  //SALVE
  let validation = Number(e.target.innerText.replace('%', ''));
  if(validation != NaN && validation > 0)
  {
    custom.value = '';
    tip_value = validation;
    Calculate();
  }
});