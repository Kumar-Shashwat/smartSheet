


let sheetFolderContainer = document.querySelector(".sheet-folder-container");
let sheetIcon = document.querySelector(".sheet-icon");

sheetIcon.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolder= document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolder.length);

    sheet.innerHTML = `
    <div class = "sheet-nameing" > sheet${allSheetFolder.length + 1}    </div> `;

    sheetFolderContainer.appendChild(sheet);

    sheet.scrollIntoView();
    
    createSheetDB();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})


function handleSheetRemoval(sheet){
    sheet.addEventListener( "mousedown" , (e) =>{
        // 0 -> left click
        // 1 -> scroll
        // 2 -> right click

        if(e.button !== 2)
            return;

        let allSheetFolder = document.querySelectorAll(".sheet-folder");
        if(allSheetFolder.length === 1)
            alert("You must need to have one sheet");
        else{

            let response = confirm("Your Sheet will be removed permanetly, are you sure?");
            if(response == false)     return;

            let sheetIdx = Number(sheet.getAttribute("id"));

            // DB removed
            collectedSheetDB.splice(sheetIdx,1);

            handleSheetUIRemoval(sheet);
            
            // UI remove
            sheet.remove();

            // by default assign dataBAse to sheet 1 to active

            gridDB = collectedSheetDB[0];
            handleSheetProperties();
            

        }

    } )
}

function handleSheetUIRemoval(sheet){
    sheet.remove();
    
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolder.length; i++){
        allSheetFolder[i].setAttribute("id", i);
        let sheetNameing = allSheetFolder[i].querySelector(".sheet-nameing");
        sheetNameing.innerText = `sheet${i + 1} `;
        allSheetFolder[i].style.backgroundColor = "transparent";
    }

    allSheetFolder[0].style.backgroundColor = "rgb(219, 237, 243)";
}

function handleSheetDB(sheetIdx){
    gridDB = collectedSheetDB[sheetIdx];

}

function handleSheetProperties(){
    for(let i =0;i<rows;i++)
    {
        for(let j=0;j<cols;j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
            cell.click();
        }
    }

    // for clickng the first cell of the grid by default via DOM.

    let firstCell = document.querySelector(".cell");    
    // querySelector gives the first class among multiple same classes having same class name.
    firstCell.click();


    /*

    let firstCell = document.querySelectorAll(".cell");  

    here firstCell  contains all the class having same name "cell".

    firstCell[0].click();

    */
}



function handleSheetUI(sheet){
    
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolder.length; i++)
        allSheetFolder[i].style.backgroundColor = "transparent";

    sheet.style.backgroundColor =  "rgb(219, 237, 243) " ; 
}

function handleSheetActiveness(sheet){
    sheet.addEventListener("click" , (e) =>{
        let sheetIdx = Number(sheet.getAttribute("id") ) ;

        handleSheetDB(sheetIdx);

        handleSheetProperties();
        handleSheetUI(sheet);
    })
}


function createSheetDB () {
    let gridDB= [];     // gridDAtaBAse storage unit for grid.

    for(let i=0;i<rows;i++)
    {
        let gridRow = [];
        for(let j=0;j<cols;j++)
        {
            let cellprop={
                fontFamily: "monospace",
                fontSize:16,
                bold:false,
                italic:false,
                underline:false,
                alignment :"left",
                fontColor:"#000000",
                backgroundColor: "#000000", // just for indication porpuse.
                value : "",
                formula : "",
                children : [ ],
            }
        gridRow.push(cellprop);
        }

        gridDB.push(gridRow);
    }

    collectedSheetDB.push(gridDB);
    
}