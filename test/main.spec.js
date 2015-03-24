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
	it('should be able to call .combine()', () => {
		expect(timeLine.combine([[3,4],[1,5]])).toEqual([1,5]);
	});
	it('should display notOverlapping, combined entries', () => {
		timeLine.add([1,4]);
		timeLine.add([4,10]);
		expect(timeLine.get()).toEqual([1,10]);
		timeLine.clear();
		timeLine.add([1,3]);
		timeLine.add([2,5]);
		expect(timeLine.get()).toEqual([1,5]);
		timeLine.clear();
		timeLine.add([3,4]);
		timeLine.add([6,7]);
		timeLine.add([8,10]);
		expect(timeLine.get()).toEqual([[3,4],[6,7],[8,10]]);
		timeLine.add([1,9]);
		expect(timeLine.get()).toEqual([1,9]);
		timeLine.clear();
		// continuing meetings..
		timeLine.add([1,2]);
		timeLine.add([2,3]);
		timeLine.add([3,4]);
		expect(timeLine.get()).toEqual([1,4]);
		timeLine.add([1,8]);
		expect(timeLine.get()).toEqual([1,8]);
		timeLine.add([9,10]);
		expect(timeLine.get()).toEqual([[1,8],[9,10]]);
	});
	afterEach(()=> timeLine.clear());
});
