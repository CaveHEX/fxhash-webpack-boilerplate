import p5 from 'p5';

export const capture_p5 = function (count = 1) {
	let removed = false;
	let captured = false;
	let captureCount;
	let captureMode;

	if (typeof count === 'object') {
		captureMode = (Object.keys(count).includes('millis')) ? 'millis' : 'frames';
		captureCount = count[captureMode];
	}
	else {
		captureMode = 'frames';
		captureCount = count;
	}

	p5.prototype.registerMethod('post', function listen() {
		if (!captured) {
			if (captureMode === 'frames' && captureCount > this.frameCount) return;
			if (captureMode === 'millis' && captureCount > this.millis()) return;
			fxpreview();
			console.log(this.frameCount, this.millis());
			captured = true;
		}

		if (captured && !removed) {
			const fnIndex = this._registeredMethods.post.findIndex((fn) => fn === listen);
			this._registeredMethods.post.splice(fnIndex, 1);
			console.log('removed', this._registeredMethods.post)
			removed = true;
		}
	});
};