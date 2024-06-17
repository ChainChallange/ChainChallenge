import { IDatabaseApplicant, IDatabaseApplications, IDatabaseChallenges, IDatabaseCreators, IDatabaseRanking } from "./IDatabase";

export let creators: IDatabaseCreators = {};
export let applicants: IDatabaseApplicant = {};
export let challenges: IDatabaseChallenges = {}
export let applications: IDatabaseApplications = {};

export let ranking: IDatabaseRanking = [];
export function sortRanking() {
    ranking = ranking.sort((a, b) => {
        if(b.score === a.score) {
            return a.attempts_quantity - b.attempts_quantity;
        }

        return b.score - a.score
    }).map((participant, index) => {
        participant.position = index + 1;
        return participant;
    });
}