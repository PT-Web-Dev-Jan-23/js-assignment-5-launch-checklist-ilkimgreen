// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
        let missionDestination = document.getElementById("missionTarget");
                missionDestination.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">`;
                 document.getElementById("missionDestination").innerHTML = missionDestination;
    
} 

function validateInput(testInput) {
    if (testInput == "") {
        return "Empty"
    }
    else if (isNaN(testInput)) {
        return "Not a Number"
    }
    else {return "Is a Number"}
}


function formSubmission(document,pilot,copilot,fuelLevel,cargoMass) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuel = document.getElementById('fuelStatus');
    let cargo = document.getElementById('cargoStatus');
    let list = document.getElementById("faultyItems");

 

    let readyToTakeOff = true;
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        alert("All fields are required!");
        readyToTakeOff = false;
    } 
    
    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number" ) {
        alert("Please make sure to enter valid information for each field!");
        readyToTakeOff = false;
    }
    
    if (Number(fuelLevel)<10000) {
        document.getElementById("faultyItems").style.visibility = 'visible';
        document.getElementById("pilotStatus").innerHTML ="Pilot " + pilot + " is ready for launch";
        document.getElementById("copilotStatus").innerHTML = "Co-pilot " + copilot + " is ready for launch";
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "red";
        readyForTakeOff = false;
    } else {
        document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
    }

    if (Number(cargoLevel)>10000) {
        document.getElementById("faultyItems").style.visibility = 'visible';
        document.getElementById("pilotStatus").innerHTML ="Pilot " + pilot + " is ready for launch";
        document.getElementById("copilotStatus").innerHTML = "Co-pilot " + copilot + " is ready for launch";
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "red";
        readyForTakeOff = false;
    } else {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
    }

    if (readyForTakeOff) {
        document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "green";
        list.style.visibility = 'visible';
    }
    return readyForTakeOff;
}
   



 async function myFetch() {
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
                return response.json();
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = Math.floor(Math.random()*planets.length);
    return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;