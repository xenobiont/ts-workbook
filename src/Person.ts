export class Person {
	constructor(public name: string) {}

	getInfo() {
		return `person: ${this.name}`;
	}
}
