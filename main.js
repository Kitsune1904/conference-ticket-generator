const form = document.querySelector('form');
const formFile = document.getElementById("file");
const uploadImg = document.querySelectorAll(".uploadFile");
const ticketUser = document.querySelectorAll('.ticketUser');
const ownerGit = document.querySelector('.ownerGit');
const ticketEmail = document.querySelector('.ticketEmail');
const ticketContainer = document.querySelector('.ticket-container');
const formContainer = document.querySelector('.form-container');
const ticketNum = document.querySelector('.ticketNum');
const fileControl = document.querySelector('.fileControl');
const fileLabel = document.getElementById("fileLabel");
const fileMessage = document.querySelector(".fileMessage");
const fileErr = document.querySelector(".fileErr");
const submitBtn = document.getElementById("submitBtn");

let counter = 0;

const generateNumber = () => {
    counter++;
    let strNum = (counter).toString();
    while (strNum.length < 4) {
        strNum = '0' + strNum;
    }
    return '#' + strNum;
}

const showError = (isShow) => {
    if(isShow) {
        fileMessage.style.display = 'none';
        fileErr.style.display = 'flex';
        submitBtn.disabled = true;
    } else {
        fileMessage.style.display = 'flex';
        fileErr.style.display = 'none';
        submitBtn.disabled = false;
    }
}

const addImage = (fileInput, container) => {
    const file = fileInput.files[0];
    const maxFileSize = 500 * 1024;
    showError(false)
    if (file.size > maxFileSize) {
        showError(true)
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

formFile.addEventListener('change', () => {
    addImage(formFile, uploadImg)
    fileControl.innerHTML = '<button type="button" id="removeBtn">Remove image</button> <button type="button" id="changeBtn">Change image</button>';
    fileLabel.setAttribute('for', 'nothing');
    fileLabel.style.cursor = 'default';
    fileLabel.classList.add('withFile');

    const removeBtn = document.getElementById("removeBtn");
    const changeBtn = document.getElementById("changeBtn");

    removeBtn.addEventListener('click', (e) => {
        uploadImg.forEach((image) => {
            image.src = './assets/images/person-svgrepo-com.svg';
            image.alt = 'person image';
            image.style.padding = '0.625rem';
        })
        formFile.value = "";
        showError(false)
    })
    changeBtn.addEventListener('click', () => {
        formFile.click();
    });

})



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const file = formData.get('file');
    const name = formData.get('name');
    const email = formData.get('email');
    const git = formData.get('git');
    ticketUser.forEach(user => {
        user.innerText = name;
    })
    ownerGit.innerText = git;
    ticketEmail.innerText = email;
    ticketContainer.style.display = 'block';
    formContainer.style.display = 'none';
    ticketNum.innerText = generateNumber();
})