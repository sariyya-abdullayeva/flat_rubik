class Game {
    constructor (faces) {
        this.faces = faces;
        this.stepHistory = [];
    }
    // Parameters
    faceInPosition(position) {
        let facesInPosition = this.faces.filter(face => face.number == position);
        return facesInPosition[0];
    }

    shuffle(rotate_count) {
        for (let i = 0; i < rotate_count; i++) {
            let randomFaceNumber = Math.floor(Math.random() * Math.floor(5))+1;
            this.faceInPosition(randomFaceNumber).rotateCV()
            this.stepHistory.push(randomFaceNumber)
        }
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
        
        let tempLastSideColors = this.sides[3].blocks.map(block => block.color)
        console.log(tempLastSideColors);
        for (let i = this.sides.length-1; i > 0; i--) {
            this.sides[i].blocks.forEach((block, blockIndex) => {
                block.color = this.sides[i-1].blocks[blockIndex].color 
            });
        }
        this.sides[0].blocks.forEach((block, blockIndex) => {
            block.color = tempLastSideColors[blockIndex]
        });
        
        console.log("this is prevBlocks:");
        console.log(prevBlockColors);
        
        updateColors();
        
    }
}

class Block {
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }
}

class TripBlock{
    constructor(facePos, blocks){
        this.facePos = facePos;
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
// game.faceInPosition(1).sides = new TripBlock ([game.faceInPosition(2).blockInPosition(1), game.faceInPosition(2).blockInPosition(4), game.faceInPosition(2).blockInPosition(7)])



console.log(game)
let faceDivs = document.querySelectorAll(".face");

updateColors();

faceDivs.forEach((faceDiv, index) => {
    faceDiv.setAttribute("id", index + 1)
    faceDiv.addEventListener("click", function(e){
        game.faceInPosition(index + 1).rotateCV();
    });
});





//FUNCTIONS
function updateColors() {
    faceDivs.forEach((faceDiv, index) => {
        let faceNumber = index + 1;
        let faceDivBlocks= [...faceDiv.children]
        faceDivBlocks.forEach((block, blockIndex)=> {
            //Re
            block.className = '';
            block.classList.add('block',game.faceInPosition(faceNumber).blockInPosition(blockIndex+1).color)
        })
    });
}


// constante initiation of side positions
const sidesObj = {
    1: {
        6: [1, 4, 7],
        2: [1, 4, 7],
        4: [1, 4, 7],
        5: [1, 4, 7]
    },
    2: {
        6: [7, 8, 9],
        3: [1, 4, 7],
        4: [3, 2, 1],
        1: [9, 6, 3]
    },
    3: {
        6: [9, 6, 3],
        5: [9, 6, 3],
        4: [9, 6, 3],
        2: [9, 6, 3],
    },
    4:{
        2: [7, 8, 9],
        3: [7, 8, 9],
        5: [3, 2, 1],
        1: [7, 8, 9]
    },
    5: {
        4: [7, 8, 9],
        3: [9, 6, 3],
        6: [3, 2, 1],
        1: [1, 4, 7],
    },
    6: {
        5: [7, 8, 9],
        3: [3, 2, 1],
        2: [3, 2, 1],
        1: [3, 2, 1]
    }
    
}

// add sides to the each face
for (let facePos in sidesObj){
    let tempSides = [];
    for (let sideFacePosition in sidesObj[facePos]){

        let tempBlocksArray = sidesObj[facePos][sideFacePosition].map(function (blockNumber){
            return game.faceInPosition(sideFacePosition).blockInPosition(blockNumber)
        });
        
        let tripBlock = new TripBlock(sideFacePosition, tempBlocksArray);
        tempSides.push(tripBlock);
    }
    game.faceInPosition(facePos).sides = tempSides;
}

let buttonShuffle = document.querySelector('button')
console.log(buttonShuffle);

buttonShuffle.addEventListener("click", function(e){
    game.shuffle(3)
});












// game.faceInPosition(1).blockInPosition(1).color = 'white'
// game.faceInPosition(1).blockInPosition(2).color = 'blue'
// game.faceInPosition(1).blockInPosition(3).color = "yellow"
// game.faceInPosition(1).blockInPosition(4).color = "green"
// game.faceInPosition(1).blockInPosition(5).color = "red"
// game.faceInPosition(1).blockInPosition(6).color = "orange"
// game.faceInPosition(1).blockInPosition(7).color = "orange"
// game.faceInPosition(1).blockInPosition(8).color = 'blue'
// game.faceInPosition(2).blockInPosition(9).color = 'white'

// game.faceInPosition(2).blockInPosition(1).color = 'white'
// game.faceInPosition(2).blockInPosition(2).color = 'blue'
// game.faceInPosition(2).blockInPosition(3).color = "yellow"
// game.faceInPosition(2).blockInPosition(4).color = "green"
// game.faceInPosition(1).blockInPosition(5).color = "red"
// game.faceInPosition(2).blockInPosition(6).color = "orange"
// game.faceInPosition(2).blockInPosition(7).color = 'blue'
// game.faceInPosition(2).blockInPosition(8).color = "white"
// game.faceInPosition(2).blockInPosition(9).color = 'orange'

// game.faceInPosition(3).blockInPosition(1).color = 'white'
// game.faceInPosition(3).blockInPosition(2).color = 'blue'
// game.faceInPosition(3).blockInPosition(3).color = "yellow"
// game.faceInPosition(3).blockInPosition(4).color = "green"
// game.faceInPosition(1).blockInPosition(5).color = "red"
// game.faceInPosition(3).blockInPosition(6).color = "orange"
// game.faceInPosition(3).blockInPosition(7).color = 'white'
// game.faceInPosition(3).blockInPosition(8).color = "orange"
// game.faceInPosition(3).blockInPosition(9).color = 'blue'

// game.faceInPosition(4).blockInPosition(1).color = 'white'
// game.faceInPosition(4).blockInPosition(2).color = 'blue'
// game.faceInPosition(4).blockInPosition(3).color = "yellow"
// game.faceInPosition(4).blockInPosition(4).color = "green"
// game.faceInPosition(1).blockInPosition(5).color = "red"
// game.faceInPosition(4).blockInPosition(6).color = "orange"
// game.faceInPosition(4).blockInPosition(7).color = "red"
// game.faceInPosition(4).blockInPosition(8).color = "yellow"
// game.faceInPosition(4).blockInPosition(9).color = 'green'

// game.faceInPosition(5).blockInPosition(1).color = 'white'
// game.faceInPosition(5).blockInPosition(2).color = 'blue'
// game.faceInPosition(5).blockInPosition(3).color = "yellow"
// game.faceInPosition(5).blockInPosition(4).color = "green"
// game.faceInPosition(1).blockInPosition(5).color = "red"
// game.faceInPosition(5).blockInPosition(6).color = "orange"
// game.faceInPosition(5).blockInPosition(7).color = 'green'
// game.faceInPosition(5).blockInPosition(8).color = "red"
// game.faceInPosition(5).blockInPosition(9).color = 'yellow'

// game.faceInPosition(6).blockInPosition(1).color = 'white'
// game.faceInPosition(6).blockInPosition(2).color = 'blue'
// game.faceInPosition(6).blockInPosition(3).color = "yellow"
// game.faceInPosition(6).blockInPosition(4).color = "green"
// game.faceInPosition(1).blockInPosition(5).color = "red"
// game.faceInPosition(6).blockInPosition(6).color = "orange"
// game.faceInPosition(6).blockInPosition(7).color = 'yellow'
// game.faceInPosition(6).blockInPosition(8).color = "green"
// game.faceInPosition(6).blockInPosition(9).color = 'red'

updateColors();
