// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
        let finalMissionDestitnation = document.getElementById("missionTarget");
                finalMissionDestitnation.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">
                 `
    
}

function validateInput(testInput) {
    if (testInput == "") {
        return "Empty"
    }
    else if (isNaN(testInput)) {
        return "Is a Number"
    }
    else {return "Not a Number"}
}


function formSubmission(document,pilot,copilot,fuelLevel,cargoMass) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let newLaunchStatus = document.getElementById("launchStatus");
    let list = document.getElementById("faultyItems");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        alert("All fields are required!");
    }
    else if (validateInput(pilot)!== "Is a Number" || validateInput(copilot) !== "Is a Number") {
        alert("Name required");
    }
    else if (validateInput(fuelLevel) !== "Not a Number" || validateInput(cargoMass) !== "Not a Number") {
        alert("Number required");
    }

    else{

    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} Ready`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} Ready`;
 

    if(fuelLevel < 10000 && cargoMass > 10000){
        newLaunchStatus.innerHTML = "Shuttle not ready for Launch";
        newLaunchStatus.style.color = "red";
        fuelStatus.innerHTML = "Not enough fuel for the journey";
        cargoStatus.innerHTML = "Too much mass for the journey";
       
        
    } else if(fuelLevel < 10000 && cargoMass < 10000){
        newLaunchStatus.innerHTML = "Shuttle not ready for Launch";
        newLaunchStatus.style.color = "red";
        fuelStatus.innerHTML = "Not enough fuel for the journey";
        cargoStatus.innerHTML = `CargoMass : ${cargoMass}`;

    } else if(fuelLevel > 10000 && cargoMass > 10000){
        newLaunchStatus.innerHTML = "Shuttle not ready for Launch";
        newLaunchStatus.style.color = "red";
        fuelStatus.innerHTML = `Fuel Level : ${fuelLevel}`;
        cargoStatus.innerHTML = "Too much mass for the journey";

    } else if(fuelLevel > 10000 && cargoMass < 10000){
        newLaunchStatus.innerHTML = "Shuttle ready for Launch";
        newLaunchStatus.style.color = "green";
        fuelStatus.innerHTML = `Fuel Level : ${fuelLevel}`;
        cargoStatus.innerHTML = `CargoMass : ${cargoMass}`;
    }
}
}
   



async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            if (response.status >= 400) {
                throw new Error ("Bad response");
            }
            else {
                return response.json();
            }
        });

    return planetsReturned;
}



function pickPlanet(planets) {
    let planet = Math.floor(Math.random()* planets.length)
    return planets[planet]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;