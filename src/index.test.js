var assert = require('assert');
const { x } = require('./index.js')

describe('Array', () => {
	it('should return -1 when the value is not present', () => {
		assert.strictEqual(x(1, 2), 3)
	})
});