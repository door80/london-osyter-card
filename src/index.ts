import { STATIONS, TRANSPORT } from "./utils";
import { createUser, addFunds, viewBalance } from "./user";
import { newDepature, newArrival } from "./trip";

/**
 * Modify this file to test different scenarios. See the output in the console.
 */

// Create new user
const user = createUser("John");

// User adds funds to their card
addFunds(user, 30);
viewBalance(user);

// User swipes card at a new station
newDepature(user, STATIONS.HOLBURN, TRANSPORT.TUBE);
viewBalance(user);

// User swipes card to exist a new station
newArrival(user, STATIONS.EARLS_COURT, TRANSPORT.TUBE);
viewBalance(user);

// User swipes card entering a bus
newDepature(user, STATIONS.EARLS_COURT, TRANSPORT.BUS);
viewBalance(user);

// User swipes card leaving a bus [OPTIONAL - this should change nothing]
newArrival(user, STATIONS.CHELSEA, TRANSPORT.BUS);
viewBalance(user);

// User swipes card at a new station
newDepature(user, STATIONS.CHELSEA, TRANSPORT.TUBE);
viewBalance(user);

// User swipes card to exist a new station
newArrival(user, STATIONS.WIMBLEDON, TRANSPORT.TUBE);
viewBalance(user);
