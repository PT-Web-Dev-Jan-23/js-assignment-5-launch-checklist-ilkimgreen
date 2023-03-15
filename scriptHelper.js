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
        return "Not a Number"
    }
    else {return "Is a Number"}
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
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number" ) {
        alert("Please make sure to enter valid information for each field!");
    } else {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready!`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready!`;
        let launchStatus = document.getElementById("launchStatus");
        
        if (fuelLevel < 10000 && cargoMass <= 10000) {
            fuel.innerHTML = `Fuel level: ${fuelLevel} is too low!`;
            cargo.innerHTML = `Cargo mass: ${cargoMass} is too low!`
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";

        } else if (fuelLevel >= 10000 && cargoMass > 10000) {
            fuel.innerHTML = `Fuel level: ${fuelLevel} is good for launch!`;
            cargo.innerHTML = `Cargo mass: ${cargoMass} is too heavy!`;
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";

        } else if (fuelLevel < 10000 && cargoMass > 10000) {
            fuel.innerHTML = `Fuel level: ${fuelLevel} is too low!`;
            cargo.innerHTML = `Cargo mass: ${cargoMass} is too heavy!`;
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";

        } else {
            fuel.innerHTML = `Fuel level: ${fuelLevel} is good for launch!`;
            cargo.innerHTML = `Cargo mass: ${cargoMass} is good for launch!`;
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
        }
    }
 }
   



 async function myFetch() {
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
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
    let planet = Math.floor(Math.random()*planets.length);
    return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;