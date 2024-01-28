import { Employee } from './Employee';

export class Employees {
	static employees: Array<Employee> = [];

	static add(employee: Employee) {
		if (employee instanceof Employee) {
			Employees.employees.push(employee);
		}
	}

	static list(): Employee[] {
		return [...this.employees];
	}

	static remove(employee: Employee) {
		const idx = this.employees.indexOf(employee);
		this.employees.splice(idx, 1);
	}
}
