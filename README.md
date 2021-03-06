Traffic Lights Simulation
=========================
### Disclaimer:
This little app outputs the result of simulating a set of traffic lights within a time frame and with preset
 configurations. This was my first contact with Node.js and I leaned it on-the-fly, so some misapplication of
 concepts or non-conformity for standards are to be expected.

## Design choices
 The exercise prompt called for a simulation of a set of traffic lights (NS) and (EW) in a cross road where each
 direction should be Red for 5 minutes, while the opposing set remained 4:30 secs in Green and 30 secs in Yellow,
 before going Red while the previous Red lights went green, and the cycle repeats. It was necessary to output the
  result of this running for 30 minutes.

  * **EventEmitter**: the problem looks like a good candidate for the application of an Observer Pattern, so the traffic
  lights were modelled to be controlled via events.

  * **The main application**: I designed the logic of the traffic lights to be expansible and include multiple sets of
  traffic lights, but in the spirit of remaining within the bounds of the proposed problem the main executable of the
  application acts more like a template that solves the proposed problem, but the real meat lies within the code
  inside the `lib/` package. All manner of crossroads configurations could possibly be achieved by
  multiple instances of `LinkedLightsManager` coordinating via events.

  * **Output format**: as it was not specified, I went with simplicity, so when ran the application simply outputs to
  terminal console the resulting state changes along with its simulated times. Again, this can be easily adapted to a
  more useful format and the variables controlling the simulation start and running time are the top of
  `crossroad-lights.js` in the root folder. Cycle and Yellow time configurations are found in
  `/config/time-configs.js`


# Running

## Requirements
This application was developed with [Node.js version **5.9.0**](https://nodejs.org/en/). Earlier versions
were not tested, but it uses some features of ECMA Script 6, so be advised it might not work in earlier versions of
 Node.js

## Instalation

Clone this repository:

    git clone https://github.com/vantroy/traffic-lights-safetyculture.git
    cd traffic-lights-safetyculture

**Install**

    npm install


## Run
    npm start

## Tests & Coverage
**Running tests**

    npm test
    
**Generating Coverage**

 Install the Istanbul coverage tool
   
    npm install istanbul -g

 Then run:
 
    istanbul cover node_modules/mocha/bin/_mocha      
    
Open in a browser:

    open ./coverage/lcov-report/index.html

----------------------------------
*Have a good day   :)*