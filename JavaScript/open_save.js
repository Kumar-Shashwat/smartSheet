// open -> upload
//save -> download

let download = document.querySelector(".download");
let upload = document.querySelector(".upload");

download.addEventListener("click" , (e) => {
    let jsonData = JSON.stringify([gridDB]);

    let file = new Blob([jsonData], {type: "application/json"});

    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "gridData.json";
    a.click();
})

upload.addEventListener("click"  , (e) => {
    let input = document.createElement("input");
    input.setAttribute("type" , "file");

    input.click();

    input.addEventListener("change", (e) =>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);


            // Basic Sheet with default data will be created.
            sheetIcon.click();

            // sheetDB, 

            sheetDB = readSheetData[0];

            collectedSheetDB[collectedSheetDB.length -1] = sheetDB;
            handleSheetProperties();
        })
    })
})