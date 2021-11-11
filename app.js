const { question } = require('readline-sync');

function start() {
    let mat = Array(8).fill().map(() => Array(8).fill(" "));

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i == 0 || i == 2 || i == 6) {
                if (j % 2 == 0 && (i == 0 || i == 1 || i == 2))
                    mat[i][j] = "O";
                else if (j % 2 == 0 && (i == 5 || i == 6 || i == 7))
                    mat[i][j] = "■";
                else {
                    mat[i][j] = " ";
                }
            }
            else {
                if (j % 2 == 1 && (i == 0 || i == 1 || i == 2))
                    mat[i][j] = "O";
                else if (j % 2 == 1 && (i == 5 || i == 6 || i == 7))
                    mat[i][j] = "■";
                else {
                    mat[i][j] = " ";
                }
            }
        }
    }

    return mat;
}

function printMatrix(mat) {
    let control = 0;
    let i = 0;

    let lineOne = "";
    let lineTwo = "";
    let lineThree = "";
    let lineFour = "";
    let lineFive = "";
    let lineSix = "";
    let lineSeven = "";
    let lineEight = "";

    while (control < 8) {
        for (let j = 0; j < 8; j++) {
            switch (i) {
                case 0:
                    lineOne += mat[i][j] + "│";
                    break;
                case 1:
                    lineTwo += mat[i][j] + "│";
                    break;
                case 2:
                    lineThree += mat[i][j] + "│";
                    break;
                case 3:
                    lineFour += mat[i][j] + "│";
                    break;
                case 4:
                    lineFive += mat[i][j] + "│";
                    break;
                case 5:
                    lineSix += mat[i][j] + "│";
                    break;
                case 6:
                    lineSeven += mat[i][j] + "│";
                    break;
                case 7:
                    lineEight += mat[i][j] + "│";
            }
        }
        control++;
        i++;
    }

    console.log(`┌─┬───────────────┐\n│≡│1 2 3 4 5 6 7 8│\n├─┼─┬─┬─┬─┬─┬─┬─┬─┤\n│1│${lineOne}\n│2│${lineTwo}\n│3│${lineThree}\n│4│${lineFour}\n│5│${lineFive}\n│6│${lineSix}\n│7│${lineSeven}\n│8│${lineEight}\n└─┴─┴─┴─┴─┴─┴─┴─┴─┘`);
}

function verifyWin(mat) {
    let playerSquare = 0;
    let playerCircle = 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (mat[i][j] == "■")
                playerSquare++;
            if (mat[i][j] == "O")
                playerCircle++;
        }
    }

    if (playerSquare == 0)
        return "Circular pieces wins!";
    if (playerCircle == 0)
        return "Square pieces wins!";
    else
        return;
}

function getPos() {
    if (gameLoop % 2 == 0) {
        do {
            i = Number(question("Wich piece do you want (line): "));
            j = Number(question("Wich piece do you want (column): "));

            i -= 1;
            j -= 1;
            error = 0;

            if (mat[i][j] != "■") {
                error++;
                console.log("Please choose a square piece");
            }
        } while (error > 0)
    }
    else {
        do {
            i = Number(question("Wich piece do you want (line): "));
            j = Number(question("Wich piece do you want (column): "));

            i -= 1;
            j -= 1;
            error = 0;

            if (mat[i][j] != "O") {
                error++;
                console.log("Please choose a circular piece");
            }
        } while (error > 0)
    }
}

function verifyIfAdjacent() {
    if (mat[line][column] != " " || (line == i - 1 && column == j) || (line == i && column == j + 1) || (line == i + 1 && column == j) || (line == i && column == j - 1)) {
        error++;
        console.log("Please choose an adjacent space");
    }
}

let gameLoop = 0;
let mat = start();
let i = 0;
let j = 0;
let line = 0;
let column = 0;
let error = 0;
let win = " ";

while (gameLoop < 1000) {
    printMatrix(mat);

    getPos();

    do {
        line = Number(question("Move to (line): "));
        column = Number(question("Move to (column): "));

        line -= 1;
        column -= 1;
        error = 0;

        verifyIfAdjacent();

        if (gameLoop % 2 == 0) {
            if (line == i - 2 && column == j + 2) {
                if (mat[line + 1][column - 1] = "O")
                    mat[line + 1][column - 1] = " ";
            }
            if (line == i - 2 && column == j - 2) {
                if (mat[line - 1][column - 1] == "O")
                    mat[line + 1][column + 1] = " ";
            }
            if (mat[line][column] != " " || line == i - 2 || line == i - 3 || line == i - 4 || line == i - 5 || column == j + 2 || column == j + 3 || column == j + 4 || column == j + 5) {
                if (mat[line - 1][column + 1] == "■") {
                    error++;
                    console.log("Please choose an adjacent space within a ratio of 1x1 (that is empty)");
                }
            }
            if ((line == i + 2 && column == j - 2) || (line == i + 2 && column == j + 2)) {
                error++;
                console.log("You cannot take an opponent's piece in backwards");
            }
        }
        else {
            if (line == i + 2 && column == j - 2) {
                if (mat[line - 1][column + 1] = "■")
                    mat[line - 1][column + 1] = "X";
            }
            if (line == i + 2 && column == j + 2) {
                if (mat[line + 1][column + 1] == "■")
                    mat[line - 1][column - 1] = "X";
            }
            if (mat[line][column] != " " || line == i + 2 || line == i + 3 || line == i + 4 || line == i + 5 || column == j - 2 || column == j - 3 || column == j - 4 || column == j - 5) {
                if (mat[line + 1][column - 1] == "O") {
                    error++;
                    console.log("Please choose an adjacent space within a ratio of 1x1 (that is empty)");
                }
            }
            if ((line == i - 2 && column == j + 2) || (line == i - 2 && column == j - 2)) {
                error++;
                console.log("You cannot take an opponent's piece in backwards");
            }
        }
    } while (error > 0)

    mat[i][j] = " ";

    if (gameLoop % 2 == 0)
        mat[line][column] = "■";
    else
        mat[line][column] = "O";
    gameLoop++;

    win = verifyWin(mat);
    if (win != undefined)
        return console.log(win);
}
