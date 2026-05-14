import { LineupStore, emptyStore } from './types';

const KEY = 'lineup:v1';

export function load(): LineupStore {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return emptyStore();
		const parsed = JSON.parse(raw) as LineupStore;
		if (parsed.version !== 1) return emptyStore();
		// Reload safety: if a match was running, pause it so phone-lock/refresh doesn't inflate the timer.
		if (parsed.match && parsed.match.startedAt !== null) {
			const runMs = Date.now() - parsed.match.startedAt;
			parsed.match.accumulatedMs = (parsed.match.accumulatedMs || 0) + Math.max(0, runMs);
			parsed.match.startedAt = null;
		}
		// Drop ids from field/subs that no longer exist on the roster.
		if (parsed.match) {
			const ids = new Set(parsed.players.map((p) => p.id));
			parsed.match.field.goalie = parsed.match.field.goalie.map((id) =>
				id && ids.has(id) ? id : null
			);
			parsed.match.field.outfield = parsed.match.field.outfield.map((id) =>
				id && ids.has(id) ? id : null
			);
			parsed.match.field.subs = parsed.match.field.subs.filter((id) => ids.has(id));
		}
		return parsed;
	} catch {
		return emptyStore();
	}
}

export function save(store: LineupStore) {
	try {
		localStorage.setItem(KEY, JSON.stringify(store));
	} catch {
		// quota / disabled storage — ignore
	}
}

export function clearAll() {
	try {
		localStorage.removeItem(KEY);
	} catch {
		// ignore
	}
}

export function newId(): string {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}
	return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
