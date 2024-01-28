import { Employees } from './Employees';
import { Employee } from './Employee';
import { Position } from './Position';

function run() {
	Employees.add(new Employee('John', Position.MANAGER, 1000));
	Employees.add(new Employee('Bill', Position.DEVELOPER, 5000));
	Employees.add(new Employee('James', Position.DIRECTOR, 4000));

	const employees: Employee[] = Employees.list();

	const listEl = document.querySelector('#employees');
	console.log(listEl);

	for (const e of employees) {
		if (listEl) {
			listEl.insertAdjacentHTML('beforeend', `<li>${e.getInfo()}</li>`);
		}
	}
}

// run();

// declare global {
// 	interface Window {
// 		run: () => void;
// 	}
// }

window.run = run;

window.run();
