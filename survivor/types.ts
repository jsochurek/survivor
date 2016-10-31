export type Team = {
    name: string,
    region: string,
    seed: string
};

export type Game = {
    id: number,
    home: string,
    away: string,
    winner: string,
    day: Date
};