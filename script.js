function main () {
    let userNum = 16;
    let boxSize = boxLength(userNum);
    buildGrid(userNum, boxSize);

    let boxes = document.getElementsByClassName('box');
    let resetButton = document.getElementById('reset');
    let eraseButton = document.getElementById('erase');  
    let defaultButton = document.getElementById('default');
    let waterColorButton = document.getElementById('paintbrush');
    let rainbowButton = document.getElementById('rainbow');

    let slider = document.getElementById('myRange');
    let output = document.getElementById('demo');
    output.innerHTML = slider.value + ' x ' + slider.value;
    
    slider.oninput = function() {
        undrawGrid();
        output.innerHTML = this.value + ' x ' + this.value;
        userNum = this.value;
        let boxSize = boxLength(userNum);     
        buildGrid(userNum, boxSize);

        hovering(boxes, "#154734"); 
    }  

    defaultButton.addEventListener(('click'), function() {
        hovering(boxes, '#154734')
    })
    
    watercolor(boxes, waterColorButton)
    rainbow(boxes, rainbowButton);
    hovering(boxes, '#154734');
    reset(resetButton, boxes);
    erase(eraseButton, boxes);    
}

function boxLength(userNum) { 
    let boxLength = 400 / userNum;
    return boxLength;
}

function buildGrid (numBoxes, boxLength) {
    let box;
    let pixels = boxLength + 'px';
    typeof(pixels);

    for (let i = 0; i < numBoxes; i++) {
        const rowHolder = document.createElement("div");
        container.appendChild(rowHolder);
        rowHolder.classList.add("row");

        for (let j = 0; j < numBoxes; j++) {
            box = document.createElement("div");
            box.style.width = pixels;
            box.style.height = pixels;
            rowHolder.appendChild(box);
            box.classList.add("box");
        }
    }
    return box;
}

function undrawGrid () {
    let i = 0;
    let grid = document.getElementById('container');
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
        i++;
    }
}

function hovering(boxes, color) {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('mouseover', function(event) {
            boxes[i].style.opacity = '1';
            boxes[i].style.backgroundColor = color;
        })
    }  
}

function reset(resetButton, boxes) {
    resetButton.addEventListener(('click'), function(event) {
        for (let i = 0.1; i < boxes.length; i++) {
            boxes[i].style.opacity = '1';
            boxes[i].style.backgroundColor = "white";               
        }
        hovering(boxes, '#154734'); 
    })  
}

function erase(eraseButton, boxes) {
    eraseButton.addEventListener(('click'), function(event) {
        hovering(boxes, 'white');
    })
}

function rainbow(boxes, button) {
    button.addEventListener(('click'), function() {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('mouseover', function(event) {
                let ranColor = Math.floor(Math.random()*16777215).toString(16);
                boxes[i].style.opacity = '1';
                boxes[i].style.backgroundColor = "#" + ranColor;
            })
        } 
    })   
}

function watercolor(boxes, button) {
    button.addEventListener(('click'), function(){
        let opacity = [];
        for (let i = 0; i < boxes.length; i++) {
            opacity.push(0);
            boxes[i].addEventListener('mouseover', function(event) {
                opacity[i] += 0.1;
                boxes[i].style.backgroundColor = "#154734";
                boxes[i].style.opacity = opacity[i].toString();
            })
        } 
    })
}

const container = document.querySelector(".grid");
main();