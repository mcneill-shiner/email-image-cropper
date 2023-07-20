let result = document.querySelector(".result");
let img_result = document.querySelector(".img-result");
let img_w = document.querySelector(".img-w");
let img_h = document.querySelector(".img-h");
let options = document.querySelector(".options");
let save = document.querySelector(".save");
let cropped = document.querySelector(".cropped");
let dwn = document.querySelector(".download");
let upload = document.querySelector("#form-control-file");
let cropper = "";

// On change, show image with crop options
upload.addEventListener("change", (e) => {
    if (e.target.files.length) {
        //start file reader
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target.result) {
                // create new image
                let img = document.createElement("img");
                img.id = "image";
                img.src = e.target.result;
                // clean result before
                result.innerHTML = "";
                // append new image
                result.appendChild(img);
                // show save btn and options
                save.classList.remove("hide");
                options.classList.remove("hide");
                // init cropper
                cropper = new Cropper(img);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
})

// Save button crops the image
save.addEventListener("click", (e) => {
    console.log(e);
    e.preventDefault();
    // get result to data URI
    let imgSrc = cropper    
        .getCroppedCanvas({
            width: img_w.ariaValueMax, // input value
        })
        .toDataURL();
    // remove hide class of img
    cropped.classList.remove("hide");
    img_result.classList.remove("hide");
    // display new image
    img_result.src = imgSrc;
    dwn.classList.remove("hide");
    dwn.download = "imagename.png";
    dwn.setAttribute("href", imgSrc);
});