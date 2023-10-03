import { STATIONS, displayCurrency } from "./utils";

export type User = {
  name: string;
  card: {
    balance: number;
    lastDeparture: STATIONS | null;
  };
};

export const createUser = (name: string) => {
  console.log(`Created user: ${name}`);
  return {
    name: name,
    card: {
      balance: 0,
      lastDeparture: null,
    },
  };
};

export const addFunds = (user: User, amount: number) => {
  user.card.balance += amount;
  console.log(`${user.name} added funds: ${displayCurrency(amount)}`);
  return user;
};

export const viewBalance = (user: User) => {
  console.log(
    `${user.name} card balance: ${displayCurrency(user.card.balance)}`
  );
  return user.card.balance;
};
