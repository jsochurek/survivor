type Team = {
    name: string,
    region: string,
    seed: number
};

type Game = {
    id: number,
    home: Team,
    away: Team,
    winner: string,
    day: Date | string,
    region?: string,
    round?: number
};

type User = {
    name: string, 
    picks: {team: string, date: Date}[]
};