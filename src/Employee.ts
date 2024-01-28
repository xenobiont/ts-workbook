import { Person } from './Person';
import { Position } from './Position';

export class Employee extends Person {
	constructor(name: string, public position: Position, public salary: number) {
		super(name);
	}

	getInfo() {
		return `${super.getInfo()} ${Position[this.position]} ${this.salary}`;
	}
}
