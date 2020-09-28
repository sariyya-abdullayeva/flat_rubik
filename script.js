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
        let prevBlocks = { ...this.blocks }; 

        console.log("this.blocks is :");
        console.log(this.blocks);

        console.log("this is prevBlocks:");
        console.log(prevBlocks);

        // this.blockInPosition(2).color = prevFaceState.blockInPosition(4).color;
        // this.blockInPosition(1).color = prevFaceState.blockInPosition(7).color;
        // this.blockInPosition(3).color = prevFaceState.blockInPosition(1).color;
        // this.blockInPosition(4).color = prevFaceState.blockInPosition(8).color;
        // this.blockInPosition(6).color = prevFaceState.blockInPosition(2).color;
        // this.blockInPosition(7).color = prevFaceState.blockInPosition(9).color;
        // this.blockInPosition(8).color = prevFaceState.blockInPosition(6).color;
        // this.blockInPosition(9).color = prevFaceState.blockInPosition(3).color;

        this.blockInPosition(3).color = "temp_color_new"

        console.log("this.blocks is :");
        console.log(this.blocks);

        console.log("this is prevBlocks:");
        console.log(prevBlocks);

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

let colors = ["green", "yellow", "white", "blue", "red", "oreange"]

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

let faceDivs = document.querySelectorAll(".face")
faceDivs.forEach((faceDiv, index) => {
        let faceNumber = index + 1;
        faceDiv.setAttribute("id", faceNumber)
        faceDiv.addEventListener("click", function(){
            game.faceInPosition(faceNumber).rotateCV();
        });
    }
);


