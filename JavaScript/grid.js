let rows = 100;
let cols = 26;

let addressCol = document.querySelector(".address-col");
let addressRow = document.querySelector(".address-row");
let grid = document.querySelector(".grid");
let address = document.querySelector(".address");

for(let i=0;i<rows;i++){
    let addressColCell = document.createElement("div");
    addressColCell.setAttribute("class","address-col-cell");
    addressColCell.innerText= i+1;
    addressCol.appendChild(addressColCell);
}

for(let i=0;i<cols;i++){
    let addressRowCell = document.createElement("div");
    addressRowCell.setAttribute("class","address-row-cell");
    addressRowCell.innerText= String.fromCharCode(65 + i);
    addressRow.appendChild(addressRowCell);
}

for(let i=0;i<rows;i++){
    let gridRow= document.createElement("div");
    gridRow.setAttribute("class", "grid-row");

    for(let j=0;j<cols;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        gridRow.append(cell);


        cell.setAttribute("contenteditable",true); // to remove the red underline line.
        cell.setAttribute("spellcheck",false); // for spelling cheaking.

        // for row and coloum identification in storage matrix.
        cell.setAttribute("rId", i);
        cell.setAttribute("cId",j);
        
   
        addListnerForAddressBarDisplay(cell,i,j);
    }
    grid.appendChild(gridRow);
}


function addListnerForAddressBarDisplay(cell,i,j){
    cell.addEventListener("click", (e) => {
        let rowID = i+1;
        let colID = String.fromCharCode(65 + j);
        address.value= `${colID}${rowID}`;
    })
}



