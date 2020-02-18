import * as PIXI from "pixi.js";

/**
 * Temporary timer
 */
export const delay = function (fn: () => void, timeMS: number) {
	const frames = timeMS / 60;
	let counter = 0;

	const end = () => {
		PIXI.ticker.shared.remove(proccess, this);
		fn();
	};

	const proccess = () => {
		if (counter < frames) {
			counter++;
			return;
		}

		end();
	};

	PIXI.ticker.shared.add(proccess, this);
};

export const delayAsync = (timeMS: number) => {
	return new Promise((resolve => {
		delay(resolve, timeMS);
	}));
};
