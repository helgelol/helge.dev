export type Player = {
	id: string;
	name: string;
	number?: number;
};

export type Formation = {
	goalies: number;
	outfield: number;
};

export type FieldState = {
	goalie: (string | null)[];
	outfield: (string | null)[];
	subs: string[];
};

export type MatchState = {
	formation: Formation;
	subIntervalSec: number;
	field: FieldState;
	startedAt: number | null;
	accumulatedMs: number;
	lastSubAlertAt: number;
};

export type LineupStore = {
	version: 1;
	players: Player[];
	match: MatchState | null;
};

export const DEFAULT_FORMATION: Formation = { goalies: 1, outfield: 4 };
export const DEFAULT_SUB_INTERVAL_SEC = 360;

export const emptyStore = (): LineupStore => ({
	version: 1,
	players: [],
	match: null
});

export const emptyField = (formation: Formation): FieldState => ({
	goalie: Array(formation.goalies).fill(null),
	outfield: Array(formation.outfield).fill(null),
	subs: []
});
