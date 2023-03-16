// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   
     let missionTarget =`<h2>Mission Destination</h2>
                <ol>
                    <li>Name:${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">`;

    document.getElementById("missionTarget").innerHTML = missionTarget;
   
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    //let's check if all fields are entered
    
    let readyToTakeOff = true;

    if (validateInput(pilot) === "Empty" ||  validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are requied!");   
        readyToTakeOff = false;
    }

    if (validateInput(pilot) === "Is a Number" ||  validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");  
        readyToTakeOff = false;
    }
    
    if (Number(fuelLevel)<10000) {
        document.getElementById("faultyItems").style.visibility = 'visible';
        document.getElementById("pilotStatus").innerHTML =`Pilot ${pilot} is ready for launch!`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch!`;
        document.getElementById("fuelStatus").innerHTML = `Fuel level: ${fuelLevel} is too low for launch!`
        document.getElementById("launchStatus").innerHTML = `Shuttle is not ready for launch!`;
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        readyToTakeOff = false
    }
    else {
        document.getElementById("fuelStatus").innerHTML = `Fuel level: ${fuelLevel} is high enough for launch!`
    }

    if (Number(cargoLevel)>10000) {
        document.getElementById("faultyItems").style.visibility = 'visible';
        document.getElementById("pilotStatus").innerHTML =`Pilot ${pilot} is ready for launch!`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch!`;
        document.getElementById("cargoStatus").innerHTML = `Cargo mass: ${cargoLevel} is too heavy for launch!`
        document.getElementById("launchStatus").innerHTML = `Shuttle is not ready for launch!`;
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        readyToTakeOff = false;

    } else {
        document.getElementById("cargoStatus").innerHTML = `Cargo mass: ${cargoLevel} is low enough for launch!`;
    }


    if (readyToTakeOff) {
        document.getElementById("launchStatus").innerHTML = `Shuttle is ready for launch!`;
        document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)";
        list.style.visibility = 'visible';
    }


    return readyToTakeOff;

}

async function myFetch() {
    
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
          return response.json();
           
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let selectedPlanetIndex = Math.floor(Math.random()*planets.length)
    return planets[selectedPlanetIndex];
}



module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;