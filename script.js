class Game {
    constructor (faces) {
        this.faces = faces;
    }
    // Parameters
    faceInPosition(position) {
        let facesInPosition = this.faces.filter(face => face.number == position);
        return facesInPosition[0];
    }
}

class Face {
    constructor (number, blocks, sides) {
        this.number = number;
        this.blocks = blocks;
        this.sides = sides;
    }
    
    blockInPosition(position) {
        let blocksInPosition = this.blocks.filter(block => block.position == position);
        return blocksInPosition[0];
    }
    
    rotateCV() {
        
        

        
        let prevBlockColors = this.blocks.map((block) => block.color); 
        console.log("this is prevBlocks:");
        console.log(prevBlockColors);

        this.blockInPosition(2).color = prevBlockColors[3]
        this.blockInPosition(1).color = prevBlockColors[6]
        this.blockInPosition(3).color = prevBlockColors[0]
        this.blockInPosition(4).color = prevBlockColors[7]
        this.blockInPosition(6).color = prevBlockColors[1]
        this.blockInPosition(7).color = prevBlockColors[8]
        this.blockInPosition(8).color = prevBlockColors[5]
        this.blockInPosition(9).color = prevBlockColors[2]

        console.log("this is prevBlocks:");
        console.log(prevBlockColors);

        updateColors();
        // (4) 3
        // (7) 6
        // (1) 0
        // (8) 7
        // (2) 1
        // (9) 8
        // (6) 5
        // (3) 2
        
        // this.blockInPosition(3).color = prevBlocks[0]
        
        // console.log("this.blocks is :");
        // console.log(this.blocks);
        
        // console.log("this is prevBlocks:");
        // console.log(prevBlocks);
        
    }
}

class Block {
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }
}

class TripBlock{
    constructor(blocks){
        this.blocks = blocks;
    }
}

let colors = ["green", "yellow", "white", "blue", "red", "orange"]

let faces = []
for (let faceIndex = 1; faceIndex <= colors.length; faceIndex++) {
    const element = colors[faceIndex];
    let blocks = []
    for (let blockIndex = 1; blockIndex <= 9; blockIndex++) {
        let block = new Block(colors[faceIndex-1], blockIndex)
        blocks.push(block)
    }
    
    let face = new Face(faceIndex, blocks, undefined)
    faces.push(face);
}

let game = new Game(faces);
console.log(game)
let faceDivs = document.querySelectorAll(".face");

// for (var i = 0; i < faceDivsChild.length; i++) {
//     faceDivsChild[i].style.color = colors[i];  //do styling here
// }

updateColors();

faceDivs.forEach((faceDiv, index) => {
    faceDiv.setAttribute("id", index + 1)
    faceDiv.addEventListener("click", function(e){
        game.faceInPosition(index + 1).rotateCV();
    });
});


function updateColors() {
    faceDivs.forEach((faceDiv, index) => {
        let faceNumber = index + 1;
        let faceDivBlocks= [...faceDiv.children]
        faceDivBlocks.forEach((block, blockIndex)=> {
            block.className = '';
            block.classList.add('block',game.faceInPosition(faceNumber).blockInPosition(blockIndex+1).color)
        })
    });
}

game.faceInPosition(1).blockInPosition(1).color = 'white'
game.faceInPosition(1).blockInPosition(2).color = 'blue'
game.faceInPosition(1).blockInPosition(3).color = "yellow"
game.faceInPosition(1).blockInPosition(4).color = "green"
game.faceInPosition(1).blockInPosition(6).color = "red"
game.faceInPosition(1).blockInPosition(7).color = "orange"
game.faceInPosition(1).blockInPosition(8).color = "orange"
game.faceInPosition(1).blockInPosition(9).color = 'blue'

updateColors();