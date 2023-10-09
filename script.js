let WORDS = ["BOND", "CODE", "DARK", "FALL", "GAME", "HOME",  "IDEA", "JOIN", "MISS",
    "LUCK", "MOON", "NICE", "OPEN", "PLAY", "QUIZ", "RAIN", "STAR", "TIME"];

// let ALLPOSSIBLEWORDS = ["BOND", "CODE", "DARK", "FALL", "GAME", "HOME",  "IDEA", "JOIN", "MISS",
// "LUCK", "MOON", "NICE", "OPEN", "PLAY", "QUIZ", "RAIN", "STAR", "TIME", "BOSS", "MIND", "COST", "DEAR",
// "FACE", "NILL", "GAIN"];

let level2Words = ['ATOM', 'BARK', 'BELL', 'BENT', 'CAKE', 'CLIP', 'DINE', 'DIVE', 'ECHO', 'FAST', 
'FISH', 'GIFT', 'GOLD', 'HIKE', 'IRON', 'JADE', 'JOLT', 'KITE', 'LAKE', 'LEND', 'LOUD', 'MELT', 
'MINT', 'NEST'];

let level3Words = ["AQUA", "BUMP", "CHIP", "DOZE", "FROG", "GEAR", "HUSH", "INCH", "JUMP", "KICK", "LIME",
"MOTH", "NAIL", "OVAL", "PEAR", "QUIT", "RISE", "SLED", "TUNE", "VAST", "WISP", "YARN"]

var levelCopy = [];
levelCopy = WORDS;

var winningScore = 18;

var corrAudio = new Audio("mixkit-quick-win-video-game-notification-269.wav");
var wrongAudio = new Audio("negative_beeps-6008.mp3");

_("level").style.scale = "1";
setTimeout(function() {
    _("level").style.scale = "0";
}, 900);

function _(id) {
    return document.getElementById(id);
}
var currentLevel = 1;

let op = "";
for (let i = 0; i < WORDS.length*2; i++) {
    op += `<span class="box" id="box${i}" onclick="disAppear(this)"></span>`;
}

_("words-box").innerHTML = op;

let splittedWords = [];
WORDS.forEach(splitThemWords);
function splitThemWords(element) {
    let split1 = element.substring(0,2);
    let split2 = element.substring(2);
    splittedWords.push(split1, split2)
}

splittedWords.forEach(fillThemWords);
function fillThemWords(ele) {
    let randomIdx = Math.floor(Math.random()*36);
    while (_(`box${randomIdx}`).textContent != "") {
        randomIdx = Math.floor(Math.random()*splittedWords.length);
    }
    _(`box${randomIdx}`).textContent = ele;
}


var count = 0;
var iD = "bah";
function disAppear(ele) {
if(started){
    count++;
    if(count%2===1){
        iD = ele.id;
    }
    ele.style.transform = "scale(0)";
    _("resultBox").textContent = _("resultBox").textContent + ele.textContent;
    console.log(count);
    if(count%2===0){
        let word = _("resultBox").textContent;
        setTimeout(function() {
            _("resultBox").textContent = "";
        }, 200);
        if(WORDS.includes(word)){
                let index = WORDS.indexOf(word);
                levelCopy.splice(index, 1);
                console.log(levelCopy);
                _("scoreValue").textContent++;
                corrAudio.play();
                if(_("scoreValue").textContent==winningScore){
                    _("finalResult").style.scale = "1";
                    _("winStatus").textContent = "You win!";
                    _("winStatus").style.color = "green";
                    let nextLevel = `<i class="fa-solid fa-forward" title="Next level" onClick="nextLevel()" id="nextLevelButton"></i>`;
                    nextLevel += `<i class="fa-solid fa-arrow-right-from-bracket" title="Quit Game" onClick="quit()"></i>`;
                    _("nextLevel").innerHTML = nextLevel;
                    if(currentLevel==3){_("nextLevelButton").style.scale = "0";}
                    clearInterval(timer);
                }
                _("corr").textContent = "corerct!";
                _("corr").style.color = "green";
                setTimeout(function() {
                    _("corr").textContent = "";
                }, 1000);
        }
        else{
            ele.style.transform = "scale(1)";
            _(iD).style.transform = "scale(1)";
            _("corr").textContent = "Word not in list!";
            wrongAudio.play();
            _("corr").style.color = "orangered";
            setTimeout(function() {
                _("corr").textContent = "";
            },1000);
        }
    }
}
}

var started = false;
function start() {
    if (!started) {
        var totalTime = _("min").textContent*60;
    timer=setInterval(function () {
        totalTime--;
    if(totalTime<=0){
        started = false;
        _("finalResult").style.scale = "1";
        _("winStatus").textContent = "You Lose!";
        _("greet").textContent = "times'up!";
        _("winStatus").style.color = "red";
        _("greet").style.color = "red";
        clearInterval(timer);
    }
    _("min").textContent = Math.floor(totalTime/60).toString().padStart(2, "0");
    _("sec").textContent = `${(totalTime%60)}`.toString().padStart(2, "0");
    }, 1000)
    _("corr").textContent = "";
    }
    started = true;
}

var infoClicked = false;
function displayInfo() {
    if(!infoClicked){
        _("info").style.scale = "1";
        infoClicked = true;
    }
    else{
        _("info").style.scale = "0";
        infoClicked = false;
    }
}

function refresh() {
    window.open("", "_self");
    window.location.reload();
}

function quit() {
    window.open("", "_self");
    window.close();
  }


var numberOfBoxes = 36;
function nextLevel() {
    _("finalResult").style.scale = "0";
    _("scoreValue").textContent = "0";
    switch (currentLevel) {
        case 1:
            _("level").style.scale = "1";
            _("levelNum").textContent = "2";
            _("levelType").textContent = "Normal";
            setTimeout(function disLevelChange() {
                _("level").style.scale = "0";
            }, 1000);
            WORDS = level2Words;
            levelCopy = level2Words;
            console.log(levelCopy);
            currentLevel = 2;
            numberOfBoxes = 48;
            winningScore = 24;
            break;
        case 2:
            _("level").style.scale = "1";
            _("levelNum").textContent = "3";
            _("levelType").textContent = "Hard";
            setTimeout(function disLevelChange() {
                _("level").style.scale = "0";
            }, 1000);
            WORDS = level3Words;
            levelCopy = level3Words;
            console.log(levelCopy);
            currentLevel = 3;
            _("nextLevelButton").style.scale = "0";
            numberOfBoxes = 44;
            winningScore = 22;
            break;
        default:
            break;
    }
    

    let op2 = "";
    for (let i = 0; i < WORDS.length*2; i++) {
        op2 += `<span class="box" id="box${i}" onclick="disAppear(this)"></span>`;
    }

    _("words-box").innerHTML = op2;

    let splittedWords2 = [];
    WORDS.forEach(splitThemWords);
    function splitThemWords(element) {
        let split1 = element.substring(0,2);
        let split2 = element.substring(2);
        splittedWords2.push(split1, split2)
    }

    splittedWords2.forEach(fillThemWords);
    function fillThemWords(ele) {
        let randomIdx = Math.floor(Math.random()*WORDS.length);
        while (_(`box${randomIdx}`).textContent != "") {
            randomIdx = Math.floor(Math.random()*splittedWords2.length);
        }
        _(`box${randomIdx}`).textContent = ele;
    }
    started = false;
    _("corr").textContent = "Click start to play the Game!";
    _("min").textContent = "03";
    _("sec").textContent = "00";

    count = 0;
    iD = "bah";
}



let hint1Time;
let hint2Time;
function showHint(){
    if(started){
    let randHintWordIdx = Math.floor(Math.random()*levelCopy.length);
    const ELEMENT = levelCopy[randHintWordIdx];
    console.log(ELEMENT);
    let hintSplit1 = ELEMENT.substring(0, 2);
    let hintSplit2 = ELEMENT.substring(2);
    console.log(hintSplit1);
    console.log(hintSplit2);
        for(let hintSplit1Idx=0; hintSplit1Idx<numberOfBoxes; hintSplit1Idx++){
            if(_(`box${hintSplit1Idx}`).textContent == hintSplit1){
                _(`box${hintSplit1Idx}`).style.backgroundColor = "white";
                hint1Time = setTimeout(function() {
                    _(`box${hintSplit1Idx}`).style.backgroundColor = "rgba(255, 228, 214, 0.35)";
                }, 1000);
            }
        }

        for(let hintSplit2Idx=0; hintSplit2Idx<numberOfBoxes; hintSplit2Idx++){
            if(_(`box${hintSplit2Idx}`).textContent == hintSplit2){
                _(`box${hintSplit2Idx}`).style.backgroundColor = "white";
                hint2Time = setTimeout(function() {
                    _(`box${hintSplit2Idx}`).style.backgroundColor = "rgba(255, 228, 214, 0.35)";
                }, 1000);
            }
        }
    }
}

console.log(levelCopy);