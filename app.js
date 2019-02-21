class Node {
    x;
    y;
    g;
    h;
    f;

    passable;
    parent;
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.passable = true;
        this.parent = undefined;
    }
};

var grid = [10];

for (let x = 0; x < 10; x++) {
    grid[x] = [10]
    for (let y = 0; y < 10; y++) {
        grid[x][y] = new Node(x, y);
    }
}

var diagonal = false;

// [0,0] is start node - [9,8] will be end node
grid[0][0].g = 0;

grid[2][2].passable = false;
grid[2][3].passable = false;
grid[3][2].passable = false;
grid[3][3].passable = false;

grid[2][7].passable = false;
grid[2][8].passable = false;
grid[2][9].passable = false;

grid[0][5].passable = false;
grid[1][5].passable = false;
grid[2][5].passable = false;
grid[2][6].passable = false;
grid[2][7].passable = false;
grid[3][7].passable = false;
grid[4][7].passable = false;
grid[5][7].passable = false;
grid[6][7].passable = false;
grid[6][6].passable = false;
grid[6][5].passable = false;
grid[6][4].passable = false;
grid[7][4].passable = false;
grid[8][4].passable = false;

grid[7][2].passable = false;
grid[8][2].passable = false;
grid[9][2].passable = false;

grid[8][7].passable = false;
grid[9][7].passable = false;
grid[8][8].passable = false;

function findPath(startNode, endNode) {

    var openList = [startNode];
    var closedList = [];
    var finished = false;

    while (openList.length > 0 && !finished) {

        // TODO - find node with lowest score (done by default?)
        var current = openList.shift();
        closedList.push(current);

        for (let x = -1; x < 2 && !finished; x++) {
            for (let y = -1; y < 2 && !finished; y++) {

                canProcess = true;
                let nodeX = current.x + x;
                let nodeY = current.y + y;

                if (nodeX == current.x && nodeY == current.y || finished) {
                    continue;
                }

                if (nodeX >= 0 && nodeX < 10 && nodeY >= 0 && nodeY < 10) {

                    if ((!diagonal && (x != 0 && y != 0)) || !grid[nodeX][nodeY].passable) {
                        canProcess = false;
                    }

                    if (canProcess) {
                        let node = grid[nodeX][nodeY];

                        if (closedList.indexOf(node) > -1) {
                            continue;
                        }

                        node.parent = current;
                        node.g = current.g + 1;

                        if(node === endNode){
                            finished = true;
                            break;
                        }

                        // using manhattan heuristic
                        node.h = (node.x - endNode.x) + (node.y - endNode.y);
                        node.f = node.g + node.h;

                        openList.push(node);
                    }
                }
            }
        }
    }

    let htmlString = "";
    current = endNode;
    while (current.parent != undefined) {
        htmlString = "[" + current.x + "][" + current.y + "]" + "</br>" + htmlString;
        current = current.parent;
    }

    htmlString = "[" + startNode.x + "][" + startNode.y + "]" + "</br>" + htmlString;

    document.getElementById("path").innerHTML = htmlString;
}

window.onload = function(){
    findPath(grid[0][0], grid[9][8]);
}