
// for cycleDetection
// strorage 2D matrix

let matrix = [];

for(let i=0;i<rows; i++)
{
    let row = [];
    for(let j=0;j<cols;j++)
    {
        // why [] (array)-> More than one relation can be possibel.
        row.push([]);
    }

    matrix.push(row);
}