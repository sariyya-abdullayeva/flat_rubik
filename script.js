class Game {
    constructor (faces) {
        this.faces = faces;
    }
}

class Face {
    constructor (number, blocks, sides) {
        this.number = number;
        this.blocks = blocks;
        this.sides = sides;
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

let faceDivs = document.querySelectorAll(".face")
console.log(faceDivs);

for (let faceIndex = 1; faceIndex <= colors.length; faceIndex++) {
    const element = colors[faceIndex];
    let blocks = []
    for (let blockIndex = 1; blockIndex <= 9; blockIndex++) {
        let block = new Block(colors[faceIndex-1], blockIndex)
        blocks.push(block)
    }

    let face = new Face(faceIndex, blocks, undefined)
}
