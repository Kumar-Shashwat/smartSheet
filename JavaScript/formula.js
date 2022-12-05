// formula
// ctrl + shift + L    to select similar  things all over the file.


for(let i=0;i < rows;i++){
    for(let j=0;j< cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
        cell.addEventListener("blur", (e) => {
            
            let addressValue = address.value;
            let [activeCell,cellprop] = getActiveCell(addressValue);
            
            let enterdData = activeCell.innerText;  // innerText keep high attention to spelling same thing happend with fontWeight
            
            if(cellprop.value === enterdData)
                return ;
            
            cellprop.value = enterdData;


            // if user itsef enters a hardCode Value to the cell, the all the previous parent connectioin will be vanished and only the chilren relation will remain.
            // removeChildFromParent(cellprop.formula);
            
            // formula will remain empty
            // cellprop.formula = "";
            
            // console.log(cellprop);

            // chidValues will be modified according.
            updateChildrenValue(addressValue);

        })
        
        cell.addEventListener("click", (e) => {
            
            let addressValue = address.value;
            let [activeCell,cellprop] = getActiveCell(addressValue);

            formula.value = cellprop.formula;
            activeCell.innerText = cellprop.value;
        })
        
    }
}




let formula = document.querySelector(".formula");

formula.addEventListener("blur" , (e) => {
    let addressValue = address.value;
    updateChildrenValue(addressValue);
})

formula.addEventListener("keydown", (e) =>{
    let inputFormula = formula.value;
    if(e.key === "Enter" && inputFormula ){

        // if change iin formula , brak old P-C  relation, evaluate new formual and new Paret- child relation.
        let addressValue = address.value;
        let [cell, cellprop] = getActiveCell(addressValue);

        // if input formula is same as previous formula then there is no need to remove or add parent-cell realatoin.
        if(inputFormula !== cellprop.formula){

            removeChildFromParent(cellprop.formula);

            // add parent child relation.
            addChildToParent(inputFormula);
        }
        
        let evaluatedValue = evaluateFormula(inputFormula);

        // now update inputFormula into in UI as well as cellprop.
        setCellUIAndCellpop(evaluatedValue,inputFormula, addressValue);

        // console.log(gridDB);
        
        updateChildrenValue(addressValue);
    }
})

function updateChildrenValue(parentAddress){

    let [ parentCell, cellprop] = getActiveCell(parentAddress);
    let children = cellprop.children;
    for(let i=0; i<children.length; i++)
    {
        let childAddress = children[i];
        let [childCell, childCellprop] = getActiveCell(childAddress);

        let formula = childCellprop.formula;

        let evaluatedValue = evaluateFormula(formula);

        childCell.innerText = evaluatedValue;   // UI update
        childCellprop.value = evaluatedValue;

        updateChildrenValue(childAddress);

    }
}



function addChildToParent(formula)
{
    // remove previous formula.

    let childAddressValue = address.value;

    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length; i++)
    {
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90)
        {
            let [parentCell, cellprop] = getActiveCell(encodedFormula[i]);

            cellprop.children.push(childAddressValue);
        }
    }
} 


// removing child after editing the formula for the cell.
function removeChildFromParent(formula)
{
    let childAddressValue = address.value;
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length; i++)
    {
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii >= 65 && ascii  <= 90)
        {
            let [parentCell, cellprop] = getActiveCell(encodedFormula[i]);

            let idx = cellprop.children.indexOf(childAddressValue);
            cellprop.children.splice(idx, 1);
        }
    }
}



function evaluateFormula(formula){

    let encodedFormula = formula.split(" "); 
    // spaces are very important always remember to add space before and after the small braces.

    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90)
        {
            let [cell, cellprop] = getActiveCell(encodedFormula[i]);
            encodedFormula[i] = cellprop.value;
        } 
    }
    // console.log(encodedFormula);
    let decodedFormula = encodedFormula.join(" ");
    // console.log(decodedFormula);
    return eval(decodedFormula);       // eval takes strign as input.
}

function setCellUIAndCellpop(evaluatedValue, formula, addressValue){

    let [cell, cellprop] = getActiveCell(addressValue);  // such function are used repetedly.

    cell.innerText = evaluatedValue;   // UI update
    cellprop.value = evaluatedValue;    // update dataBase.
    cellprop.formula = formula;         // cellprop/ database update.
}


