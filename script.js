class Game {
    constructor(faces) {
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
            let randomFaceNumber = Math.ceil(Math.random() * 5) + 1;
            this.faceInPosition(randomFaceNumber).rotateCV()
            game.stepHistory.push(new Step(randomFaceNumber, true));
        }
    }

    stepBack() {
        let lastStep = this.stepHistory.pop();
        if (lastStep.isRotateCV) {
            this.faceInPosition(lastStep.facePos).rotateCounterCV()
        } else {
            this.faceInPosition(lastStep.facePos).rotateCV()
        }
    }

    solve() {
        while (this.stepHistory.length > 0) {
            let lastStep = this.stepHistory.pop();
            if (lastStep.isRotateCV) {
                this.faceInPosition(lastStep.facePos).rotateCounterCV()
            } else {
                this.faceInPosition(lastStep.facePos).rotateCV()
            }
        }
    }
}

class Face {
    constructor(number, blocks, sides) {
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

        this.blockInPosition(2).color = prevBlockColors[3] //4
        this.blockInPosition(1).color = prevBlockColors[6] //5
        this.blockInPosition(3).color = prevBlockColors[0] //1
        this.blockInPosition(4).color = prevBlockColors[7] //8
        this.blockInPosition(6).color = prevBlockColors[1] //2
        this.blockInPosition(7).color = prevBlockColors[8] //9
        this.blockInPosition(8).color = prevBlockColors[5] //6
        this.blockInPosition(9).color = prevBlockColors[2] //3

        let tempLastSideColors = this.sides[3].blocks.map(block => block.color)
        for (let i = this.sides.length - 1; i > 0; i--) {
            this.sides[i].blocks.forEach((block, blockIndex) => {
                block.color = this.sides[i - 1].blocks[blockIndex].color
            });
        }
        this.sides[0].blocks.forEach((block, blockIndex) => {
            block.color = tempLastSideColors[blockIndex]
        });

        updateColors();
    }

    rotateCounterCV() {
        let prevBlockColors = this.blocks.map((block) => block.color);

        this.blockInPosition(2).color = prevBlockColors[5] //6
        this.blockInPosition(1).color = prevBlockColors[2] //3
        this.blockInPosition(3).color = prevBlockColors[8] //9
        this.blockInPosition(4).color = prevBlockColors[1] //2
        this.blockInPosition(6).color = prevBlockColors[7] //8
        this.blockInPosition(7).color = prevBlockColors[0] //1
        this.blockInPosition(8).color = prevBlockColors[3] //4
        this.blockInPosition(9).color = prevBlockColors[6] //7

        let tempFirstSideColors = this.sides[0].blocks.map(block => block.color)
        for (let i = 0; i < this.sides.length - 1; i++) {
            this.sides[i].blocks.forEach((block, blockIndex) => {
                block.color = this.sides[i + 1].blocks[blockIndex].color
            });
        }
        this.sides[3].blocks.forEach((block, blockIndex) => {
            block.color = tempFirstSideColors[blockIndex]
        });

        updateColors();
    }
}

class Block {
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }
}

class TripBlock {
    constructor(facePos, blocks) {
        this.facePos = facePos;
        this.blocks = blocks;
    }
}

class Step {
    constructor(facePos, isRotateCV) {
        this.facePos = facePos;
        this.isRotateCV = isRotateCV;
    }
}

let colors = ["green", "yellow", "white", "blue", "red", "orange"]

let faces = []
for (let faceIndex = 1; faceIndex <= colors.length; faceIndex++) {
    const element = colors[faceIndex];
    let blocks = []
    for (let blockIndex = 1; blockIndex <= 9; blockIndex++) {
        let block = new Block(colors[faceIndex - 1], blockIndex)
        blocks.push(block)
    }

    let face = new Face(faceIndex, blocks, undefined)
    faces.push(face);
}

let game = new Game(faces);
let faceDivs = document.querySelectorAll(".face");

updateColors();


// Add eventListeners
faceDivs.forEach((faceDiv, index) => {
    faceDiv.setAttribute("id", index + 1)
    faceDiv.addEventListener("click", function (e) {
        if (e.shiftKey) {
            game.faceInPosition(index + 1).rotateCounterCV();
            game.stepHistory.push(new Step(index + 1, false));
        } else {
            game.faceInPosition(index + 1).rotateCV();
            game.stepHistory.push(new Step(index + 1, true));
        }

    });
});





//FUNCTIONS
function updateColors() {
    faceDivs.forEach((faceDiv, index) => {
        let faceNumber = index + 1;
        let faceDivBlocks = [...faceDiv.children]
        faceDivBlocks.forEach((block, blockIndex) => {
            //Re
            block.className = '';
            block.classList.add('block', game.faceInPosition(faceNumber).blockInPosition(blockIndex + 1).color)
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
    4: {
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
for (let facePos in sidesObj) {
    let tempSides = [];
    for (let sideFacePosition in sidesObj[facePos]) {

        let tempBlocksArray = sidesObj[facePos][sideFacePosition].map(function (blockNumber) {
            return game.faceInPosition(sideFacePosition).blockInPosition(blockNumber)
        });

        let tripBlock = new TripBlock(sideFacePosition, tempBlocksArray);
        tempSides.push(tripBlock);
    }
    game.faceInPosition(facePos).sides = tempSides;
}
// shuffle button
let buttonShuffle = document.querySelector('.shuffle');
buttonShuffle.addEventListener("click", function (e) {
    game.shuffle(3)
});

//back button
let buttonBack = document.querySelector('.back');
buttonBack.addEventListener("click", function (e) {
    game.stepBack()
});

//solve button
let buttonSolve = document.querySelector('.solve');
buttonSolve.addEventListener("click", function (e) {
    game.solve()
});
updateColors();
