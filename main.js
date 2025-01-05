const form = document.querySelector('form');
const formFile = document.getElementById("file");
const uploadImg = document.querySelectorAll(".uploadFile");
const ticketUser = document.querySelectorAll('.ticketUser');
const ticketContainer = document.querySelector('.ticket-container');
const formContainer = document.querySelector('.form-container');
const fileErr = document.querySelector(".fileErr");
const submitBtn = document.getElementById("submitBtn");
const errorMsgs = document.querySelectorAll(".error");
const inputs = document.querySelectorAll('input');

let counter = 0;

const generateNumber = () => {
    counter++;
    let strNum = (counter).toString();
    while (strNum.length < 4) {
        strNum = '0' + strNum;
    }
    return '#' + strNum;
}

const showFileError = (isShow) => {
    const fileMessage = document.querySelector(".fileMessage");
    if(isShow) {
        fileMessage.style.display = 'none';
        fileErr.style.display = 'flex';
    } else {
        fileMessage.style.display = 'flex';
        fileErr.style.display = 'none';
    }
}

const addImage = (fileInput, container) => {
    const file = fileInput.files[0];
    const maxFileSize = 500 * 1024;
    showFileError(false)
    if (file.size > maxFileSize) {
        showFileError(true)
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        container.forEach((image) => {
            image.src = e.target.result;
            image.alt = 'Uploaded Image';
            image.style.padding = '0';
        })
    };
    reader.readAsDataURL(file);
}

const showErrorMsgs = (message) => {
    errorMsgs[message].style.display = 'block';
    inputs[message].classList.add('empty');
}

formFile.addEventListener('change', () => {
    const fileControl = document.querySelector('.fileControl');
    const fileLabel = document.getElementById("fileLabel");

    addImage(formFile, uploadImg)
    fileControl.innerHTML = '<button type="button" id="removeBtn">Remove image</button> <button type="button" id="changeBtn">Change image</button>';
    fileLabel.setAttribute('for', 'nothing');
    fileLabel.style.cursor = 'default';
    fileLabel.classList.add('withFile');

    const removeBtn = document.getElementById("removeBtn");
    const changeBtn = document.getElementById("changeBtn");

    removeBtn.addEventListener('click', () => {
        uploadImg.forEach((image) => {
            image.src = './assets/images/person-svgrepo-com.svg';
            image.alt = 'person image';
            image.style.padding = '0.625rem';
        })
        formFile.value = "";
        showFileError(false)
    })
    changeBtn.addEventListener('click', () => {
        formFile.click();
    });
})

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const errorElement = e.target.nextElementSibling;
        const allFilled = Array.from(inputs).slice(1).every(inp => inp.value.trim() !== '');
        input.classList.remove('empty');
        errorElement.style.display = 'none';
        submitBtn.disabled = !allFilled;
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'git'];
    const formData = new FormData(form);
    let isValid = true;
    const templates = {
        name: /^[a-zA-Z0-9 -]*$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        git: /^@[a-zA-Z0-9 _]*$/
    }

    fields.forEach((field, index) => {
        const input = form.querySelector(`[name="${field}"]`);
        const value = formData.get(field).trim();
        if (!templates[field].test(value)) {
            input.value = '';
            showErrorMsgs(index + 1);
            isValid = false;
        }
    })

    if (!isValid) return;

    ticketUser.forEach(user => {
        user.innerText = formData.get('name').trim();;
    })
    document.querySelector('.ownerGit').innerText = formData.get('git').trim();
    document.querySelector('.ticketEmail').innerText = formData.get('email').trim();
    ticketContainer.style.display = 'flex';
    formContainer.style.display = 'none';
    document.querySelector('.ticketNum').innerText = generateNumber();
})