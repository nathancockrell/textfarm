import Seed from "./Seed.js";

const game = document.getElementById("game");
const input = document.getElementById("input");
let world;
let map = `H....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
.....................................1
`
let mapSize = map.length;
let mapLength = 38;

let worldSeeds = [];

let player = {
    icon: "F",
    x: 0,
    y: 0,
    pos: 0,
    money: 0,
    inventory: {
        seeds: [",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ","],
        wheat: []
    }
};

function movePlayer(direction) {
    if (direction === "up") {
        if (player.y > 0) { player.y-- }
    } else if (direction === "down") {
        if (player.y < 12) { player.y++ }
    } else if (direction === "left") {
        if (player.x > 0) { player.x-- }
    } else if (direction === "right") {
        if (player.x < 37) { player.x++ }
    }

    player.pos = xytoPos(player.x, player.y);
}

function renderMap() {
    for (let i = 0; i < mapSize; i++) {
        let item = map.charAt(i);
        map = map.substring(0, i) + item + map.substring(i + 1, mapSize);
    }
    renderPlayer(player);
    game.textContent = world;
}

function renderPlayer(player) {
    world = map.substring(0, player.pos) + player.icon + map.substring(player.pos + 1, mapSize);
}

function editMap(player) {
    let item = "";
    if (map.charAt(player.pos) === ".") {
        if (player.inventory.seeds.includes(",")) {
            const seed = new Seed(player.x, player.y, xytoPos(player.x, player.y));
            worldSeeds.push(seed);
            item = seed.icon;
            player.inventory.seeds.pop();
        }else{
            item ="."
        }
        map = map.substring(0, player.pos) + item + map.substring(player.pos + 1, mapSize);
    } else if (map.charAt(player.pos) === ",") {
        const seedI = worldSeeds.findIndex(x => x.pos === player.pos);
        worldSeeds = worldSeeds.slice(0, seedI).concat(worldSeeds.slice(seedI + 1));
        player.inventory.seeds.push(",");
        item = ".";
        map = map.substring(0, player.pos) + item + map.substring(player.pos + 1, mapSize);
    }

    console.log("worldseeds", worldSeeds);
    console.log("in", player.inventory);
    renderMap();
}

function xytoPos(x, y) {
    let pos = x + ((mapLength + 1) * y);
    return pos;
}

function handleKeyPress(e) {
    let key = e.key;
    e.preventDefault();

    if (key === "w" || key === "ArrowUp") {
        movePlayer("up");
    } else if (key === "s" || key === "ArrowDown") {
        movePlayer("down");
    } else if (key === "a" || key === "ArrowLeft") {
        movePlayer("left");
    } else if (key === "d" || key === "ArrowRight") {
        movePlayer("right");
    } else if (key === "l" || key ===",") {
        editMap(player);
    }
    renderMap();
}

function handleButtonPress(direction) {
    return function () {
        movePlayer(direction);
        renderMap();
    };
}

game.addEventListener("keydown", handleKeyPress);

// document.getElementById("up").addEventListener("click", handleButtonPress("up"));
// document.getElementById("down").addEventListener("click", handleButtonPress("down"));
// document.getElementById("left").addEventListener("click", handleButtonPress("left"));
// document.getElementById("right").addEventListener("click", handleButtonPress("right"));
// document.getElementById("edit").addEventListener("click", () => {
//     editMap(player);
//     renderMap();
// });

renderMap();
