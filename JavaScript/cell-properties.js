// bolta hia ki jo variables pahle declare
// kiye hai wo isme bhi kam karege, Dekhte hia!!.


let collectedSheetDB = [];// contains all sheetDB
let gridDB= [];     // gridDAtaBAse storage unit for grid.

{
    let sheetIcon = document.querySelector(".sheet-icon");
    sheetIcon.click();
}


// for(let i=0;i<rows;i++)
// {
//     let gridRow = [];
//     for(let j=0;j<cols;j++)
//     {
//         let cellprop={
//             fontFamily: "monospace",
//             fontSize:16,
//             bold:false,
//             italic:false,
//             underline:false,
//             alignment :"left",
//             fontColor:"#000000",
//             backgroundColor: "#000000",   // just for indication porpuse.
//             value : "",
//             formula : "",
//             children : [ ],
//         }
//         gridRow.push(cellprop);
//     }

//     gridDB.push(gridRow);
// }



// 2- way winding.
// selector listener.

let fontFamily = document.querySelector(".font-family");
let fontSize = document.querySelector(".font-size");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment"); // selects all the alignment class in an array;
let fontColor = document.querySelector(".font-color");
let backgroundColor = document.querySelector(".background-color");


// if there are more than one class having same name then they can be accessed using indexes correspondingly.
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];


// application of two way bindibg.
// attach propery listeners.

let activeColor = "rgb(66, 255, 255)";
let inactiveColor = "rgb(206, 255, 255)";


// firstCell.style.fontweight = bold;
// firstCell.style.backgroundColor = "blue";
// firstCell.style.;



fontFamily.addEventListener("change",(e) => {
    let addressvalue = address.value;
    let [cell, cellprop] = getActiveCell(addressvalue);

    cellprop.fontFamily = fontFamily.value;     // data to storage change.
    cell.style.fontFamily =  cellprop.fontFamily ;  // data to ui change
    fontFamily.value = cellprop.fontFamily;
})


fontSize.addEventListener("change",(e) => {
    let addressvalue = address.value;
    let [cell, cellprop] = getActiveCell(addressvalue);

    cellprop.fontSize = fontSize.value;
    cell.style.fontSize =  cellprop.fontSize + "px";
    fontSize.value = cellprop.fontSize;
})


bold.addEventListener("click", (e) => {
    
    let addressvalue = address.value;
    let [cell, cellprop] = getActiveCell(addressvalue);

    // Modification

    cellprop.bold = !cellprop.bold;         // data change.

    cell.style.fontWeight = cellprop.bold ? "bold":"normal"; // UI change.
    bold.style.backgroundColor = cellprop.bold? activeColor : inactiveColor; // UI for background of image.

})

italic.addEventListener("click", (e) => {
    
    let addressvalue = address.value;
    let [cell, cellprop] = getActiveCell(addressvalue);

    // Modification

    cellprop.italic = !cellprop.italic;         // data change.

    cell.style.fontStyle = cellprop.italic ? "italic":"normal"; // UI change.
    italic.style.backgroundColor = cellprop.italic? activeColor : inactiveColor; // UI for background of image.

})

underline.addEventListener("click", (e) => {
    
    let addressvalue = address.value;
    let [cell, cellprop] = getActiveCell(addressvalue);

    // Modification

    cellprop.underline = !cellprop.underline;         // data change.

    cell.style.textDecoration = cellprop.underline ? "underline":"none"; // UI change.
    underline.style.backgroundColor = cellprop.underline? activeColor : inactiveColor; // UI for background of image.

})


fontColor.addEventListener("change", (e) => {
    let addressvalue = address.value;
    let [cell, cellprop] = getActiveCell(addressvalue);

    cellprop.fontColor = fontColor.value;
    cell.style.color = cellprop.fontColor;
    fontColor.value = cellprop.fontColor;
})

backgroundColor.addEventListener("change", (e) => {
    let addressvalue = address.value;
    let [cell, cellprop] = getActiveCell(addressvalue);

    cellprop.backgroundColor = backgroundColor.value;
    cell.style.backgroundColor = cellprop.backgroundColor;
    backgroundColor.value = cellprop.backgroundColor;
})


alignment.forEach(( alignElem) => {
    alignElem.addEventListener("click", (e) => {

        let addressvalue = address.value;
        let [cell, cellprop] = getActiveCell(addressvalue);

        let alignValue = e.target.classList[0];
        cellprop.alignment = alignValue;
        cell.style.textAlign = cellprop.alignment;

        switch(alignValue){
            case "left" :
                leftAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;

                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                break;            
        }

    })
})


// if again we click on the same cell then all the previous data will be restored as earlier.
let allCells = document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++)
{
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
    
    // work

    cell.addEventListener("click" , (e) => {

        let addressvalue = address.value;
        let [rid , cid] = decodeRIDCIDfromaddres(addressvalue);
        let cellprop = gridDB[rid][cid];

        // adusting the UI similar as previous one.
        cell.style.fontSize =  cellprop.fontSize + "px";
        cell.style.fontFamily =  cellprop.fontFamily ;
        cell.style.fontWeight = cellprop.bold ? "bold":"normal"; // UI change.
        cell.style.fontStyle = cellprop.italic ? "italic":"normal"; // UI change.
        cell.style.textDecoration = cellprop.underline ? "underline":"normal"; // UI change.
        cell.style.color = cellprop.fontColor;
        cell.style.backgroundColor = cellprop.backgroundColor === "#000000" ? "transparent" : cellprop.backgroundColor;
        cell.style.textAlign = cellprop.alignment;


        // apply properties UI container
        // apply properties UI Container

        fontSize.value = cellprop.fontSize;
        fontFamily.value = cellprop.fontFamily;
        bold.style.backgroundColor = cellprop.bold? activeColor : inactiveColor; // UI for background of image.
        italic.style.backgroundColor = cellprop.italic? activeColor : inactiveColor; // UI for background of image.
        underline.style.backgroundColor = cellprop.underline? activeColor : inactiveColor; // UI for background of image.
        fontColor.value = cellprop.fontColor;
        backgroundColor.value = cellprop.backgroundColor;
        
        switch(cellprop.alignment){
            case "left" :
                leftAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;

            case "center":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;

            case "right":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                break;            
        }

        // let formula = Document.querySelector(".formula");
        // formula.value = cellprop.formula;
        // cell.innerText = cellprop.value;

    })
 }

function getActiveCell(addressvalue){
    let [rid, cid]  = decodeRIDCIDfromaddres(addressvalue);
    
    // acess cell and storage object.
    let cell = document.querySelector(`.cell[rid="${rid}"][cid = "${cid}"]`);
    let cellprop = gridDB[rid][cid];
    return [cell, cellprop];
}

function decodeRIDCIDfromaddres(addressvalue)
{
    // address -> "A1";

    let rid = Number(addressvalue.slice(1) -1 ) ;
    let cid = Number(addressvalue.charCodeAt(0) - 65)  ;
    return [rid, cid];
}