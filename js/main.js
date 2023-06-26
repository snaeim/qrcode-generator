document.querySelector('#generate').addEventListener('click', (e) => {
    let qr = new QRious({
        value: textbox.value,
        size: 512,
        background: '#fff',
        foreground: '#000',
        level: 'L',
    });
    qrcode.src = qr.toDataURL();
    toggleModal(e);
});

document.querySelector('#close').addEventListener('click', (e) => {
    textbox.value = "";
    toggleModal(e);
});

// get the file content and load the content into textbox
function loadInTextbox(file) {
    if ('FileReader' in window) {
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function () {
            document.querySelector('#textbox').value = reader.result
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
    }
}

// waiting for DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    // remove textbox content on reload
    textbox.value = '';
    // return error if file reader is not supported by browser
    if (!('FileReader' in window)) {
        return false;
    }
    // show file input feature to user
    document.querySelector('#file-input-feature').style.display = 'inline';
    // handle input file
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            loadInTextbox(fileInput.files[0]);
        }
    });
    // checking for supported drag and drop by browser
    let div = document.createElement('div');
    if (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) {
        // show drag and drop feature to user
        document.querySelector('#dragndrop-feature').style.display = 'inline';
        // disable drag and drop for whole document except dropzone
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(event => {
            document.addEventListener(event, e => {
                e.preventDefault();
                e.stopPropagation();
                e.target.id === 'textbox' ? e.dataTransfer.dropEffect = "copy" : e.dataTransfer.dropEffect = "none";
            });
        });
        // handle dropped file
        textbox.addEventListener('drop', (e) => {
            if (e.dataTransfer.files.length > 0) {
                loadInTextbox(e.dataTransfer.files[0]);
            }
        });
    }
});
