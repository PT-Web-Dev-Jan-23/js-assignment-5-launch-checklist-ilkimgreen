// Write your JavaScript code here!

window.addEventListener("load", function () {
    let form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let pilotName = document.querySelector("input[name=pilotName]");
        let pilotValue = pilotName.value;
        let copilotName = document.querySelector("input[name=copilotName]");
        let copilotValue = copilotName.value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let fuelLevelValue = fuelLevel.value;
        let cargoMass = document.querySelector("input[name=cargoMass]");
        let cargoMassValue = cargoMass.value;
        
        formSubmission(document,pilotValue,copilotValue,fuelLevelValue,cargoMassValue);
        

    });
        let listedPlanets;
        // Set listedPlanetsResponse equal to the value returned by calling myFetch()
       let listedPlanetsResponse = myFetch();
        listedPlanetsResponse.then(function (result) {
            listedPlanets = result;
            console.log(listedPlanets);
        }).then(function () {
            console.log(listedPlanets);
            // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let newPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, newPlanet.name, newPlanet.diameter, newPlanet.star, newPlanet.distance, newPlanet.moons, newPlanet.image)
        })
    

    
});