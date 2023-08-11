let result = document.querySelector(".result");
let img_result = document.querySelector(".img-result");
let img_w = document.querySelector(".img-w");
let img_h = document.querySelector(".img-h");
let crop_settings = document.querySelector(".crop-settings");
let crop = document.querySelector(".crop");
let cropped = document.querySelector(".cropped");
let dwn = document.querySelector(".download");
let dwn_settings = document.querySelector(".download-settings");
let upload = document.querySelector("#form-control-file");
let cropper = "";
let options = {
    aspectRatio: 16 / 9,
    preview: '.img-preview',
    ready: function (e) {
      console.log(e.type);
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      var data = e.detail;

      console.log(e.type);
    //   dataX.value = Math.round(data.x);
    //   dataY.value = Math.round(data.y);
    //   dataHeight.value = Math.round(data.height);
    //   dataWidth.value = Math.round(data.width);
    //   dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
    //   dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
    //   dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    },
    // zoomOnWheel: false,
    // zoomOnTouch: false,
    // zoomable: false
};


// config: any = {
//     dragMode: 'none',
//     highlight: false,
//     modal: false,
//     responsive: true,
//     scalable: true,
//     autoCrop: false,
//     center: false,
//     background: false,
//     zoomable: false,
//     zoomOnWheel: false,
// };
// CropperSelection.zoomable = false;

// On change/upload, show image with crop options
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
                // show crop settings/button
                crop_settings.classList.remove("hide");
                // init cropper
                cropper = new Cropper(img);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
})

// Listen for change to aspect ratio, update cropper
crop_settings.addEventListener("change", (e) => {
    const target = e.target || e.srcElement;
    console.log(e);

    if (!cropper) {
        return;
    }

    // do we need this?
    // if (target.tagName.toLowerCase() === 'label') {
    //       target = target.querySelector('input');
    //     }

    if (target.type == 'checkbox' || target.type == 'radio') {
      if (target.type == 'checkbox') {
        options[target.name] = target.checked;
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();

        options.ready = function () {
          console.log('ready');
          cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        };
      } else {
        options[target.name] = target.value;
        options.ready = function () {
          console.log('ready');
        };
      }

      // Restart
      cropper.destroy();
      cropper = new Cropper(image, options);
    }
})

// Crop button crops the image, displays completed
crop.addEventListener("click", (e) => {
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
    dwn_settings.classList.remove("hide");
    dwn.download = "imagename.png";
    dwn.setAttribute("href", imgSrc);
});

// Change aspect ratio of the crop box; input ratio (num), return updated cropper
// setAspectRatio: function setAspectRatio(aspectRatio) {
//     var options = this.options;
//     if (!this.disabled && !isUndefined(aspectRatio)) {
//     // 0 -> NaN
//     options.aspectRatio = Math.max(0, aspectRatio) || NaN;
//     if (this.ready) {
//         this.initCropBox();
//         if (this.cropped) {
//         this.renderCropBox();
//         }
//     }
//     }
//     return this;
// }



// // Crop button crops the image (original)
// crop.addEventListener("click", (e) => {
//     console.log(e);
//     e.preventDefault();
//     // get result to data URI
//     let imgSrc = cropper    
//         .getCroppedCanvas({
//             width: img_w.ariaValueMax, // input value
//         })
//         .toDataURL();
//     // remove hide class of img
//     cropped.classList.remove("hide");
//     img_result.classList.remove("hide");
//     // display new image
//     img_result.src = imgSrc;
//     dwn.classList.remove("hide");
//     dwn.download = "imagename.png";
//     dwn.setAttribute("href", imgSrc);
// });