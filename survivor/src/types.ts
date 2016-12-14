export type Team = {
    name: string,
    region: string,
    seed: number
};

export type Game = {
    id: number,
    home: Team,
    away: Team,
    winner: string,
    day: Date
};