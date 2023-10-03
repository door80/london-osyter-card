import {
  STATIONS,
  ZONES,
  FARES,
  MAX_FARE,
  TRANSPORT,
  displayCurrency,
} from "./utils";
import { User } from "./user";

export const newDepature = (user: User, station: STATIONS, type: TRANSPORT) => {
  if (type === TRANSPORT.TUBE) {
    // If the user is starting a new trip, we need to deduct the max fare
    user.card.balance -= MAX_FARE;
    user.card.lastDeparture = station;
    console.log(
      `${user.name} has a new tube trip departure at ${station} station`
    );
  } else if (type === TRANSPORT.BUS) {
    // If the user is on a bus, we charge a flat rate
    user.card.balance -= FARES.bus;
    console.log(
      `${user.name} has a new bus trip departure at ${station} station`
    );
  }
  return user;
};

const calculateFare = (user: User, station: STATIONS) => {
  if (!user.card.lastDeparture || !station) return MAX_FARE;

  const startZones = ZONES[user.card.lastDeparture];
  const endZones = ZONES[station];

  // Favorable condition for user to find the shortest distance between zones
  let startZone = startZones[0];
  let endZone = endZones[0];
  let closestDistance = null;
  /**
   * TODO: If stations end up having many zones, we could try to optimize this
   * to not be O(n^2)
   */
  for (let i = 0; i < startZones.length; i++) {
    for (let j = 0; j < endZones.length; j++) {
      const distance = Math.abs(endZones[j] - startZones[i]);
      if (closestDistance === null || distance < closestDistance) {
        closestDistance = distance;
        startZone = startZones[i];
        endZone = endZones[j];
      }
      if (closestDistance === 0) break; // Can't get any closer. Break out.
    }
    if (closestDistance === 0) break; // Can't get any closer. Break out.
  }
  const totalZones = Math.abs(endZone - startZone) + 1;

  // Handle case where user stayed within zone 1
  if (startZone === 1 && startZone === endZone) {
    return FARES.z1;
  }
  // Handle case where user stayed within a zone that is not zone 1
  if (startZone !== 1 && startZone === endZone) {
    return FARES.single_zone_not_z1;
  }
  // Handle case where user traveled between two zones, including zone 1
  if (totalZones === 2 && (startZone === 1 || endZone === 1)) {
    return FARES.two_zones_including_z1;
  }
  // Handle case where user traveled between two zones, excluding zone 1
  if (totalZones === 2 && startZone !== 1 && endZone !== 1) {
    return FARES.two_zones_excluding_z1;
  }
  // Handle case where user traveled between three zones
  if (totalZones === 3) {
    return FARES.three_zones;
  }

  // Unhandled case! Return the max fare
  return MAX_FARE;
};

export const newArrival = (user: User, station: STATIONS, type: TRANSPORT) => {
  // Handle cases where a user actually does swipe out on a bus
  if (type === TRANSPORT.BUS) {
    console.log(`${user.name} ended a trip on a bus at ${station} station`);
    return user;
  }

  /**
   * If the user is ending a trip, we need to refund the difference between the
   * max fare and the actual fare
   */
  const fare = calculateFare(user, station);
  const refund = MAX_FARE - fare;
  user.card.balance += refund;
  user.card.lastDeparture = null;
  console.log(
    `${
      user.name
    } ended a trip at ${station} station, and was refunded ${displayCurrency(
      refund
    )}`
  );
  return user;
};
