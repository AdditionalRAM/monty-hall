function simulateMontyHall(){
    let fastRun = document.querySelector("#fast-run").checked;
    if(fastRun) fastMontyHall();
    else slowMontyHall();
}

function fastMontyHall(){
    const doorCount = document.querySelector("#door-count").value; // Anzahl an Türen
    const simCount = document.querySelector("#simulation-count").value; // Anzahl an Simulationen
    document.querySelector("#start-sim").disabled = true;
    let switchBetter = 0;
    let switchWorse = 0;
    let totalCount = 0;
    for(let i = 0; i < simCount; i++){ // Wiederhole simCount mal
        totalCount++;
        if(!efficientMontyHall(doorCount)){
            switchBetter++;
        }
        else{
            switchWorse++;
        }
    }
    updateResults(switchBetter, switchWorse, totalCount, simCount);
    document.querySelector("#start-sim").disabled = false;

}
function slowMontyHall() {
    const doorCount = document.querySelector("#door-count").value; // Anzahl an Türen
    const simCount = document.querySelector("#simulation-count").value; // Anzahl an Simulationen
    document.querySelector("#start-sim").disabled = true;
    let switchBetter = 0;
    let switchWorse = 0;
    let totalCount = 0;
    const runsPerUpdate = 10; // Number of runs before updating the results
    
    const interval = setInterval(() => {
        for (let i = 0; i < runsPerUpdate; i++) {
            if (totalCount < simCount) {
                totalCount++;
                if (!efficientMontyHall(doorCount)) {
                    switchBetter++;
                } else {
                    switchWorse++;
                }
            } else {
                clearInterval(interval);
                updateResults(switchBetter, switchWorse, totalCount);
                document.querySelector("#start-sim").disabled = false;
                return;
            }
        }
        // Update the results after every runsPerUpdate runs
        updateResults(switchBetter, switchWorse, totalCount, simCount);
    }, 10); // Change the interval time here, e.g., 10 milliseconds
}



function updateResults(switchBetter, switchWorse, totalCount, simCount){
    let ogBetter = document.querySelector("#sim-og-better-count");
    let ogWorse = document.querySelector("#sim-og-worse-count");
    let total = document.querySelector("#sim-total-count");
    ogBetter.innerHTML = switchBetter;
    ogWorse.innerHTML = switchWorse;
    total.innerHTML = totalCount;
    let switchBetterPercentage = switchBetter / totalCount;
    let switchWorsePercentage = switchWorse / totalCount;
    let totalPercentage = totalCount / simCount;
    ogBetter.parentElement.querySelector(".text-box-progress").style.width = `${switchBetterPercentage * 100}%`;
    ogWorse.parentElement.querySelector(".text-box-progress").style.width = `${switchWorsePercentage * 100}%`;
    total.parentElement.querySelector(".text-box-progress").style.width = `${totalPercentage * 100}%`;



}

function efficientMontyHall(doorCount){
    const carBehind = getRandomNumber(doorCount); // Die Tür mit dem Auto
    const pSelects = getRandomNumber(doorCount); // Die Tür, die der Spieler wählt
    return pSelects == carBehind; // true if switching is worse, false if switching is better
}

function getRandomNumber(n){ // Zufällige Zahl von 1 bis n
    return Math.floor( // rundet ab
        Math.random() // Zufällige Zahl zwischen 0 bis 1
        * n // Multipliziert durch n
    ) + 1;
}

// function accurateMontyHall(doorCount){
//     const carBehind = getRandomNumber(doorCount) - 1; // Die Tür mit dem Auto
//     const pSelects = getRandomNumber(doorCount) - 1; // Die Tür, die der Spieler wählt
//     let doorArray = [];
//     for(let i = 0; i < doorCount; i++) {
//         if(i == carBehind){ 
//             doorArray.push("car");
//         }
//         else {
//             doorArray.push("goat");
//         }
//     }
//     console.log(doorArray);
//     const playerPicked = doorArray.splice(pSelects, 1); // remove playerPicked from array
//     let carFound = false;
//     let lastDoor = doorArray.filter((item) => {
//         if(!carFound && item == "car"){
//             carFound = true;
//             return true;
//         }
//         else{
//             return false;
//         }
//     });
//     if(lastDoor.length < 1) lastDoor.push("goat");

// }