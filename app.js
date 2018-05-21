document.querySelector('.greeting button').addEventListener('click', clickNextButton);
var intervalID;

function clickNextButton() {
    renderFormPage();
}

Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var temp = this[num];
        this[num] = this[i];
        this[i] = temp;
    }
    return this;
}

function renderFormPage(isAfterWin) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const form = document.createElement('form');
    form.className = 'creating-form';

    const unorderedList = document.createElement('ul');

    let listItem = document.createElement('li');


    let h5 = document.createElement('h5');
    h5.textContent = 'First Name';

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'first name *');
    if (isAfterWin) {
        input.value = profile.firstName;
    }

    listItem.appendChild(h5);
    listItem.appendChild(input);

    unorderedList.appendChild(listItem);


    listItem = document.createElement('li');

    h5 = document.createElement('h5');
    h5.textContent = 'Last Name';

    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'last name *');
    if (isAfterWin) {
        input.value = profile.lastName;
    }

    listItem.appendChild(h5);
    listItem.appendChild(input);

    unorderedList.appendChild(listItem);


    listItem = document.createElement('li');

    h5 = document.createElement('h5');
    h5.textContent = 'Email';

    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'your email *');
    if (isAfterWin) {
        input.value = profile.email;
    }
    listItem.appendChild(h5);
    listItem.appendChild(input);

    unorderedList.appendChild(listItem);


    listItem = document.createElement('li');

    h5 = document.createElement('h5');
    h5.textContent = 'Select card skirt';

    let image = document.createElement('img');
    image.setAttribute('src', './images/Card_skirt_1.png');
    image.setAttribute('id', '1');
    image.addEventListener('click', imageClick);

    listItem.appendChild(h5);
    listItem.appendChild(image);

    image = document.createElement('img');
    image.setAttribute('src', './images/Card_skirt_2.png');
    image.setAttribute('id', '2');
    image.addEventListener('click', imageClick);
    listItem.appendChild(image);

    image = document.createElement('img');
    image.setAttribute('src', './images/Card_skirt_3.png');
    image.setAttribute('id', '3');
    image.addEventListener('click', imageClick);
    listItem.appendChild(image);

    image = document.createElement('img');
    image.setAttribute('src', './images/Card_skirt_4.png');
    image.setAttribute('id', '4');
    image.addEventListener('click', imageClick);
    listItem.appendChild(image);

    listItem.setAttribute('skirtNumber', '-1');
    unorderedList.appendChild(listItem);

    listItem = document.createElement('li');

    h5 = document.createElement('h5');
    h5.textContent = 'Select difficulty';

    let select = document.createElement('select');

    let option = document.createElement('option');
    option.setAttribute('value', '10');
    option.textContent = '10';
    select.appendChild(option);

    option = document.createElement('option');
    option.setAttribute('value', '16');
    option.textContent = '16';
    select.appendChild(option);

    option = document.createElement('option');
    option.setAttribute('value', '24');
    option.textContent = '24';
    select.appendChild(option);

    listItem.appendChild(h5);
    listItem.appendChild(select);

    unorderedList.appendChild(listItem);

    form.appendChild(unorderedList);

    if (!isAfterWin) {
        document.body.removeChild(document.querySelector('.greeting'));
    } else {
        document.body.removeChild(document.querySelector('.congratulation'));
    }

    document.body.appendChild(form);

    const button = document.createElement('button');
    button.classList.add('creating-form-button');
    button.addEventListener('click', renderGame);
    button.textContent = 'Start game';

    document.body.appendChild(button);

}

function imageClick(e) {
    const image = e.target;
    const images = document.querySelectorAll('.creating-form img');
    const previousSkirtNumber = image.parentNode.getAttribute('skirtNumber');
    const newSkirtNumber = image.getAttribute('id');
    if (previousSkirtNumber != newSkirtNumber) {
        if (previousSkirtNumber != -1) {
            images[previousSkirtNumber - 1].classList.remove('red-border');
        }
        image.parentNode.setAttribute('skirtNumber', newSkirtNumber);
        image.classList.add('red-border');
    }
}

function checkInputs() {
    const inputs = document.querySelectorAll('.creating-form input');
    const numberOfSkirt = document.querySelector('.creating-form img').parentNode.getAttribute('skirtNumber');
    if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == '' || numberOfSkirt == -1) {
        return false;
    } else {
        return true;
    }
}



function renderGame() {
    function timer() {
        const timer = document.querySelector('.timer');
        timer.textContent = `${1 + Number.parseInt(timer.textContent)} seconds from start`;
    }
    if (checkInputs()) {
        const inputs = document.querySelectorAll('.creating-form input');
        const firstName = inputs[0].value;
        const lastName = inputs[1].value;
        const email = inputs[2].value;
        const numberOfCards = document.querySelector('.creating-form select').value;
        const numberOfSkirt = document.querySelector('.creating-form img').parentNode.getAttribute('skirtNumber');
        const cardSkirt = `./images/Card_skirt_${numberOfSkirt}.png`;

        const profile = { firstName: firstName, lastName: lastName, email: email };
        localStorage.setItem('profile', JSON.stringify(profile));

        const section = document.createElement('section');
        section.classList.add('game');

        let label = document.createElement('label');
        label.classList.add('timer');
        label.textContent = '0 seconds from start';
        section.appendChild(label);


        label = document.createElement('label');
        label.textContent = firstName + ' ' + lastName + ' ' + email;
        section.appendChild(label);

        const cards = renderCards(numberOfCards, cardSkirt);

        section.appendChild(cards);

        document.body.removeChild(document.querySelector('.creating-form'));
        document.body.removeChild(document.querySelector('.creating-form-button'));

        document.body.appendChild(section);

        intervalID = setInterval(timer, 1000);

    } else {
        alert('Fill all inputs');
    }
}

function renderCards(numberOfCards, cardSkirt) {
    function animationStart(e) {
        e.target.parentNode.setAttribute('isBlocked', 'true');
    }
    function animationEnd(e) {
        let currentCard = e.target;
        let indexOfCurrentCard = currentCard.getAttribute('number');
        let currentCardSourceSplitResult = currentCard.getAttribute('src').split('_');
        currentCard.parentNode.setAttribute('isBlocked', 'false');
        if (currentCard.className !== 'showed' && currentCardSourceSplitResult[1] === 'skirt' && currentCard.getAttribute('number') !== -1) {
            currentCard.setAttribute('src', `./images/Card_${reverseCards[indexOfCurrentCard].number + 1}.png`);
            currentCard.classList.remove('closed');
            currentCard.classList.add('showed');
        } else {
            switch (currentCard.className) {
                case 'closed': {
                    if (currentCardSourceSplitResult[1] !== 'skirt') {
                        currentCard.setAttribute('src', cardSkirt);
                        currentCard.classList.remove('closed');
                        currentCard.classList.add('showed');
                    }
                    break;
                }
                case 'showed': {
                    if (currentCardSourceSplitResult[1] === 'skirt') {
                        currentCard.classList.remove('showed');
                    }
                    break;
                }
            }
        }

    }
    function clickOnCard(e) {
        function checkCards() {
            for (var j in reverseCards) {
                if (reverseCards[j].number !== -1 && j !== indexOfCurrentCard && reverseCards[j].isShowed) {
                    indexOfAnotherCard = j;
                    break;
                }
            }
            if (indexOfAnotherCard !== -1) {
                if (reverseCards[indexOfAnotherCard].number === reverseCards[indexOfCurrentCard].number) {
                    reverseCards[indexOfCurrentCard].number = -1;
                    reverseCards[indexOfAnotherCard].number = -1;
                    numberOfRemainingCards -= 2;
                    currentCard.classList.remove('showed');
                    currentCard.classList.add('hide');
                    currentCard.setAttribute('number', '-1');
                    document.querySelectorAll('.game img')[indexOfAnotherCard].classList.remove('showed');
                    document.querySelectorAll('.game img')[indexOfAnotherCard].classList.add('hide');
                    document.querySelectorAll('.game img')[indexOfAnotherCard].setAttribute('number', '-1');
                } else {
                    currentCard.classList.remove('showed');
                    currentCard.classList.add('closed');
                    document.querySelectorAll('.game img')[indexOfAnotherCard].classList.remove('showed');
                    document.querySelectorAll('.game img')[indexOfAnotherCard].classList.add('closed');
                    reverseCards[indexOfCurrentCard].isShowed = false;
                    reverseCards[indexOfAnotherCard].isShowed = false;  
                }
            }
            if (numberOfRemainingCards === 0) {
                clearInterval(intervalID);
                updateRecordDesk();
                renderGreeting();
            }
        }
        let currentCard = e.target;
        let indexOfCurrentCard = currentCard.getAttribute('number');
        let indexOfAnotherCard = -1;
        if (!reverseCards[indexOfCurrentCard].isShowed && currentCard.parentNode.getAttribute('isBlocked') !== 'true') {
            reverseCards[indexOfCurrentCard].isShowed = true;           
           
            currentCard.classList.add('closed');

            setTimeout(checkCards, 2000);
        }
    }

    const images = document.createElement('div');
    images.setAttribute('isBlocked', 'false');

    let image = document.createElement('img');
    image.setAttribute('src', cardSkirt);

    let reverseCards = [];
    let numberOfRemainingCards = numberOfCards;

    for (var i = 0; i < numberOfCards; i++) {
        image = document.createElement('img');
        image.setAttribute('src', cardSkirt);
        image.setAttribute('number', i);
        image.addEventListener('click', clickOnCard);
        image.addEventListener('animationend', animationEnd);
        image.addEventListener('animationstart', animationStart);
        images.appendChild(image);
        reverseCards.push({ number: Math.floor(i / 2), isShowed: false });
    }

    reverseCards.shuffle();

    return images;
}

function updateRecordDesk() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    profile.time = document.querySelector('.timer').textContent.split(' ')[0];

    let recordDesk = JSON.parse(localStorage.getItem('recordDesk'));
    if (recordDesk !== null) {
        recordDesk.push(profile);
        if (recordDesk.length < 11) {
            recordDesk.sort((a, b) => a.time - b.time);
        } else {
            recordDesk.sort((a, b) => a.time - b.time);
            recordDesk.pop();
        }
    } else {
        recordDesk = [];
        recordDesk.push(profile);
    }
    localStorage.setItem('recordDesk', JSON.stringify(recordDesk));
}

function renderGreeting() {
    const section = document.createElement('section');
    section.classList.add('congratulation');

    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = 'Congratulation.You win!';

    article.appendChild(h2);

    const recordList = document.createElement('ol');
    let listItem;
    let recordDesk = JSON.parse(localStorage.getItem('recordDesk'));
    if (recordDesk !== null) {
        for (var i = 0; i < recordDesk.length; i++) {
            listItem = document.createElement('li');
            listItem.textContent = `${recordDesk[i].firstName + ' ' + recordDesk[i].lastName + ' ' + recordDesk[i].email} finished within ${recordDesk[i].time} seconds`;
            recordList.appendChild(listItem);
        }
    }
    article.appendChild(recordList);
    section.appendChild(article);

    const button = document.createElement('button');
    button.textContent = 'Try again.';
    button.addEventListener('click', tryAgainButtonClick);
    section.appendChild(button);

    document.body.removeChild(document.querySelector('.game'));

    document.body.appendChild(section);
}


function tryAgainButtonClick() {
    renderFormPage(true);
}