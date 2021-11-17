const form = document.getElementById('sign-up-form');
const usrname = document.getElementById("name");
const email = document.getElementById("email");
const pw1 = document.getElementById("pw1");
const pw2 = document.getElementById("pw2");
const finalmsg = document.getElementById('completed');
const btn = document.getElementById('btn');

//Show Error
const showError = (input, message) => {
    let formControl = input.parentElement;
    formControl.className = "form-control error";
    formControl.querySelector("small").innerText = message;
}

//Show Success
const showSuccess = input => {
    let formControl = input.parentElement;
    formControl.className = "form-control success";
}

//Check Fields
const checkFields = (inputArr) => {
    inputArr.map(input => {
        if(input.value.trim() === ""){
            if(input.id === 'pw1' || input.id === 'pw2'){
                showError(input, 'Password is required');
            } else showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
        }
        else showSuccess(input);
    })
}

//Check Length
const checkLength = input => {
    if(input.value.length < 8){
        showError(input, 'Password must be at least 8 characters');
    }
}

//Check if Passwords Match
const checkMatch = (pw1, pw2) => {
    if(pw1.value.trim() !== pw2.value.trim()) showError(pw2, 'Passwords do not match!');
}

//Check success of form control
const hasSuccess = input => {
    return input.parentElement.classList.contains('success');
}

//Check if form is Complete
let formComplete = false;
const checkComplete = inputArr => {
    formComplete = inputArr.every(hasSuccess);
}

//Hide elements when done
const hideElements = inputArr => {
    inputArr.map(input => {
        input.parentElement.style.display = 'none';
    })
    btn.style.display = 'none';
}

//Update dom once completed
const updateDOM = () => {
    finalmsg.style.display = "block";
    hideElements([usrname, email, pw1, pw2]);
}



//Check Form
const checkForm = (e) => {
    checkFields([usrname, email, pw1, pw2]);
    checkLength(pw1);
    checkMatch(pw1, pw2);
    checkComplete([usrname, email, pw1, pw2]);

    e.preventDefault();

    if(formComplete === true){
        updateDOM();
    }
}

form.addEventListener('submit', checkForm);