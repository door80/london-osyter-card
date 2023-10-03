# The London Transportation Problem

This is a simple node application that creates a fare card system based on
the London Oyster card system. It does not have a user interface of any kind,
and instead console logs the actions simulated by modifying the function calls
within `src/index.js`.

## Installation

Clone this repo to your local machine and then install all the dependencies.

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Update the Simulation

To update the simulated experience for a user going from station to station and
seeing changes to their card balance, modify the function calls within
`src/index.js`.

You can create a user with a card by calling `createUser()` and passing in a
string for the user's name. This will return a user object with a card object
attached to it.

```javascript
const user = createUser("John");
```

You can add money to a user's card by calling `addFunds()` and passing in the
user object and the amount of money to add.

```javascript
addFunds(user, 30);
```

At any point you can view the current balance of a user's card by calling the
`viewBalance()` function and passing in the user object.

```javascript
viewBalance(user);
```

You can simulate a user swiping their card at a station they are departing from
by calling the `newDepature()` function and passing in the user object, the name
of the station they are departing from, and the type of transportation they are
using. Note that there are types for both the stations (`STATIONS`) and the
transportation type (`TRANSPORT`) for type safety.

```javascript
newDepature(user, STATIONS.HOLBURN, TRANSPORT.TUBE);
```

You can simulate a user swiping their card at a station they are arriving at by
calling the `newArrival()` function and passing in the user object, the name of
the station they are arriving at, and the type of transportation they are using.

```javascript
newArrival(user, STATIONS.EARLS_COURT, TRANSPORT.TUBE);
```

## Run the Simulation

The simulation is run each time you make updates to the function calls within
`src/index.js`. You can view the results of the simulation in the console. It
should look something like this:

```bash
Created user: John
John added funds: £30.00
John card balance: £30.00
John has a new tube trip departure at Holburn station
John card balance: £26.80
John ended a trip at Earl’s Court station, and was refunded £0.70
John card balance: £27.50
John has a new bus trip departure at Earl’s Court station
John card balance: £25.70
John ended a trip on a bus at Chelsea station
John card balance: £25.70
John has a new tube trip departure at Chelsea station
John card balance: £22.50
John ended a trip at Wimbledon station, and was refunded £0.00
John card balance: £22.50
```
