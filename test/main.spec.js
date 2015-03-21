import {TimeLine} from 'src/main';

describe('a Timeline', ()=>{
	var timeLine;
	beforeEach(() => timeLine = new TimeLine());
	it('should call .get() -> [] with no entries', () => {
		expect(timeLine.get()).toEqual([]);
	});
	it('should be able to add a single entrie', () => {
		timeLine.add([1,3]);
		expect(timeLine.get()).toEqual([1,3]);

	});
	it('should be able to add [1,10], clobbered all', () => {
		timeLine.add([1,10]);
		expect(timeLine.get()).toEqual([1,10]);
	});
	it('should display non overlapping entries', () => {
		timeLine.add([1,3]);
		timeLine.add([4,5]);
		timeLine.add([9,10]);
		expect(timeLine.get()).toEqual([[1,3],[4,5],[9,10]]);
	});
	it('should display overlapping, combined entries', () => {
		timeLine.add([1,4]);
		timeLine.add([4,10]);
		expect(timeLine.get()).toEqual([1,10]);
		timeLine.clear();
		timeLine.add([1,3]);
		timeLine.add([2,5]);
		expect(timeLine.get()).toEqual([1,5]);
	});
	afterEach(()=> timeLine.clear());
});
