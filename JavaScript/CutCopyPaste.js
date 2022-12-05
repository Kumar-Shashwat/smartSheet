// cut , copy , pageXOffset
// -> Select 
// -> strorage
// ->paste 


// select range -> AudioListener, ctrl + click 
let ctrlKey;

document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})

document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
})


for(let i =0;i<rows;i++){
    for(let j=0; j<cols;j++){

        let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
        handleSelectedCells(cell);

    }
}


let rangeStorage = [];
function handleSelectedCells(cell){
    cell.addEventListener("click", (e) =>{
        // select range for cut and copy

        if(!ctrlKey )   return;

        if(rangeStorage.length >= 2) {
            handleSelectedCellsUI();
            rangeStorage = [];
        } 

        cell.style.border = "3px solid green";

        let rid = cell.getAttribute("rid");
        let cid = cell.getAttribute("cid");

        rangeStorage.push([rid,cid]);

        console.log(rangeStorage);
    })
}

function handleSelectedCellsUI(){

    for(let i=0; i<rangeStorage.length; i++){
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid = "${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid black";
    }
}




let cutBtn = document.querySelector(".cut");
let copyBtn = document.querySelector(".copy");
let pasteBtn = document.querySelector(".paste");

let cut_copy_storage = [];
function make_copy()
{
    let stro = rangeStorage[0][0];
    let stcol = rangeStorage[0][1];
    let endro = rangeStorage[1][0];
    let endcol = rangeStorage[1][1];

    for(let i = stro ; i<= endro; i++){
        let rowData = [];
        for(let j= stcol; j<= endcol; j++){
            // let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
            let cellprop = gridDB[i][j];
            rowData.push(cellprop);
        }

        cut_copy_storage.push(rowData);
    }

    handleSelectedCellsUI();

    console.log(cut_copy_storage);
}

copyBtn.addEventListener("click", (e) => {
    
    cut_copy_storage = [];

    if(rangeStorage.length === 1) return;

    make_copy();
})


// cutButton not woking properly.
cutBtn.addEventListener("click", (e) => {
    
    cut_copy_storage = [ ];

    if(rangeStorage.length < 2) return;

    make_copy();

    // set UI to default values.
    let strow = rangeStorage[0][0];
    let stcol = rangeStorage[0][1];
    let endrow = rangeStorage[1][0];
    let endcol = rangeStorage[1][1];

    for(let i = strow ; i<= endrow; i++){
        for(let j= stcol; j<= endcol; j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
            let cellprop = gridDB[i][j];

            cellprop.fontFamily = "monospace";
            cellprop.fontSize = 16;
            cellprop.bold = false;
            cellprop.italic = false;
            cellprop.underline = false;
            cellprop.alignment = "left";
            cellprop.fontColor = "#000000";
            cellprop.backgroundColor = "#000000";
            cellprop.value = "";
            cellprop.formula = "";
            cellprop.children = [ ];

            cell.innerText = "";
            
            // cell.click();
        }
    }
})

pasteBtn.addEventListener("click", (e) =>{

    if(rangeStorage.length <2 ) return;
    
    let addressValue = address.value; 
    let [tarRow, tarCol] = decodeRIDCIDfromaddres(addressValue);

    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1]- rangeStorage[1][1]);

    for(let i = tarRow ; i<= tarRow + rowDiff ; i++){
        for(let j= tarCol; j<= tarCol + colDiff ; j++){
            
            let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
            if( !cell) continue;


            // cut_copy_data 
            let data = cut_copy_storage[i- tarRow][j-tarCol];
            let cellprop = gridDB[i][j];

            cellprop.value = data.value;
            cellprop.bold = data.bold;
            cellprop.italic = data.italic;
            cellprop.underline = data.underline;
            cellprop.alignment = data.alignment;
            cellprop.fontFamily = data.fontFamily;
            cellprop.fontSize = data.fontSize;
            cellprop.fontColor = data.fontColor;
            cellprop.backgroundColor = data.backgroundColor;
            

            // UI

            cell.click();
            
        }
    }

})




