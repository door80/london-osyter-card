/**
 * This is a simple formatter that would be better to use a library to handle
 * edge cases, but for the sake of this exercise I'll keep it simple
 */
export const displayCurrency = (amount: number) => {
  return `£${amount.toFixed(2)}`;
};

export enum TRANSPORT {
  BUS = "Bus",
  TUBE = "Tube",
}

export enum STATIONS {
  HOLBURN = "Holburn",
  CHELSEA = "Chelsea",
  EARLS_COURT = "Earl’s Court",
  WIMBLEDON = "Wimbledon",
  HAMMERSMITH = "Hammersmith",
}

export const ZONES = {
  [STATIONS.HOLBURN]: [1],
  [STATIONS.CHELSEA]: [1],
  [STATIONS.EARLS_COURT]: [1, 2],
  [STATIONS.WIMBLEDON]: [3],
  [STATIONS.HAMMERSMITH]: [2],
};

export const FARES = {
  z1: 2.5,
  single_zone_not_z1: 2.0,
  two_zones_including_z1: 3.0,
  two_zones_excluding_z1: 2.25,
  three_zones: 3.2,
  bus: 1.8,
};

export const MAX_FARE = FARES.three_zones;
