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
					let overlapping = this.times.filter((e)=>{
						return !this.notOverlapping([e,t]);
					});
					let notOverlapping = this.times.filter((e)=>{
						return this.notOverlapping([e,t]);
					});
					if(overlapping.length >= 1){
						let combined = this.combine([_.first(overlapping), t]);
						this.clear();
						this.times.push(combined)
						if(notOverlapping.length >= 1){
							this.times.push(notOverlapping);
						}
                    }else{
						this.times.push(t);
					}
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
		}else{ // combined, not notOverlapping
			return this.combine(this.times);
		}
	}

	combine(times){
		let series = this.normalize(times);
		return [this.min(series), this.max(series)];
	}

	clear(){
		this.times = [];
	}

	clobbered(pair){
		let [x,y] = pair;
		return x == this.openingTime && y == this.closingTime;
	}

	diffSum(times){
		let sum = 0;
		times.forEach((a) => sum += a[1] - a[0]);
		return sum;
	}

	notOverlapping(times) {
		let series = this.normalize(times);
		let diffSum = this.diffSum(times);
		return _.unique(series,true).length === series.length && this.max(series) - diffSum > 0;
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
		});

	}
}

export {TimeLine}