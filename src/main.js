import _ from 'lodash';

class TimeLine {

	constructor(options = {
		openingTime:1,
		closingTime:10
	}){
		this.times = [];
		this.openingTime = options.openingTime;
		this.closingTime = options.closingTime;
	}

	add(t){
		try{
			if(Array.isArray(t) && t.length === 2 && this.isNumberPair(t)){
				if(this.clobbered(t)) {
					this.clear();
					this.times.push(t);
				} else if(t[0] >= this.openingTime && t[1] <= this.closingTime){
					this.times.push(t);
				} else {
					throw new Error('argument is out of range..');
				}
			}else{
				throw new Error("arguments to .add() must be an (int) array [x,y]");
			}
		}catch(e){
			console.error(e);
		}
	}

	get(){
		if(this.times.length == 0 ){
			return this.times;
		}else if(this.times.length == 1){
			return _.first(this.times);
		}else if(this.clobbered(this.times)) {
			this.clear();
			return [this.openingTime, this.closingTime];
		}else if(this.notOverlapping(this.times)){
			return this.times;
		}else{ // combined, not overlapping
			let series = this.normalize(this.times);
			this.clear();
			this.times.push([this.min(series), this.max(series)])
			return _.first(this.times);
		}
	}

	clear(){
		this.times = [];
	}

	clobbered(pair){
		let [x,y] = pair;
		return x == this.openingTime && y == this.closingTime;
	}

	notOverlapping(times) {
		let series = this.normalize(times);
		let diffSum = 0;
		times.forEach((a) => diffSum += a[1] - a[0]);
		return _.unique(series,true).length === series.length && this.closingTime - diffSum > diffSum;
	}

	max(s){
		return Math.max.apply(null, s);
	}

	min(s){
		return Math.min.apply(null, s);
	}

	normalize(series){
		return series.reduce((a,b) => a.concat(b).sort((a,b) => a - b));
	}

	isNumberPair(pair){
		return pair.every((e) => typeof e === 'number');
	}

	report(){
		console.log(`entries :: ${this.times.length}`);
		this.times.map((x)=>{
			for(let [index, element] of x.entries()){
			console.log(`Time ${index}: ${element}pm`)
		}
	})

	}
}

export {TimeLine}