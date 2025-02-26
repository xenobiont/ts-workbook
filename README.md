# Task

1.  Define `Person` class using `name` as a constructor, parameter. Implement `getInfo()` function using string interpolation - it should return a string representation of `Person`.

- Define the `Person` class in `Person.ts` and export it:

```ts
export class Person {
	constructor(public name: string) {}
}
```

- Define the `getInfo()` method:

```ts
getInfo() {
	return `person: ${this.name}`
}
```

2.  Define the `Employee` class that extends the `Person` class by adding the salary and position properties (and overriding the `getInfo` function):

- Create `Employee.ts` and import Person:

```ts
import { Person } from './Person';
```

- Create `Position.ts` and import it into `Employee.ts`. `Position.ts` should be as follows:

```ts
export enum Position {
	MANAGER,
	DEVELOPER,
	DIRECTOR,
}
```

- Define class `Employee`, which extends `Person`:

```ts
export class Employee extends Person {
	constructor(name: string, public position: Position, public salary: number) {
		super(name);
	}
}
```

Override `getInfo()` and call parent class `getInfo()` method:

```ts
getInfo() {
	return `${super.getInfo()} ${Position[this.position]} ${this.salary}`
}
```

3. Define the `Employees` class with an encapsulated list of employees using static methods:
   a. `add ()` to add an employee to a hidden list of employees; it must include type checking and generate an exception (in case the value added is not `Employee`);
   b. `list ()` to return a copy of the list of all employees.

- Create file `Employees.ts` and import `Employee`:

```ts
import { Employee } from './Employee';
```

- Create exported `Employees` class:

```ts
export class Employees {}
```

- Define static property for the list of employees in `Employees`:

```ts
static employees: Array<Employee> = [];
```

- Add a static `add ()` method to add new employees to the employees array (and make sure that the argument is `Employee`):

```ts
static add(employee: Employee) {
	Employees.employees.push(employee)
}
```

- Add a static `list ()` method that returns a list of employees:

```ts
static list(): Employee[] {
	return [...this.employees];
}
```

- Add a static method `remove(employee)` that removes employees from the `employees` array:

```ts
static remove(employee: Employee) {
	const idx = this.employees.indexOf(employee);
	this.employees.splice(idx,1)
}
```

4. Create a module `main.ts`, which should:

   a) create multiple employees and add them to the Employees array using the `add()` function;

   b) print a list of employees using the `getInfo()` method.

- Create a `main.ts` module and import `Employee` , `Employees` and `Position`:

```ts
import { Employees } from './Employees';
import { Employee } from './Employee';
import { Position } from './Position';
```

- Inside `main.ts`, create a function `run.` Inside it, create several employees and add them using the method `Employees.add()`:

```ts
Employees.add(new Employee('John', Position.MANAGER, 1000));
Employees.add(new Employee('Bill', Position.DEVELOPER, 5000));
Employees.add(new Employee('James', Position.DIRECTOR, 4000));
```

- Get a list of employees:

```ts
const employees: Employee[] = Employees.list();
```

- Get a root element for your employee list:

```ts
const listEl = document.querySelector('#employees');
```

- Iterate through employees to add an html representation:

```ts
for (const e of employees) {
	listEl.insertAdjacentHTML('beforeend', `<li>${e.getInfo()}</li>`);
}
```

- call the script:

```ts
run();
```

6. Create file `index.html` that should use `main.ts` and display all the information:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Employees</title>
		<!-- if bundler is used: -->
		<script src="src/main.ts" defer></script>
		<!-- without bundler: -->
		<!--  <script type="module" src="dist/main.js"></script> -->
	</head>
	<body>
		<ul id="employees"></ul>
	</body>
</html>
```

7 Open the `index.html`. It should have a list of employees with information obtained using `getInfo()`.

## Bonus task - ambient declaration

Comment out `run()` line . Instead let's see how we can make out `main` function available as a global variable in all our scripts. (it's not recommended and usually is better to explicitly export / import variables, but we'll do it to learn how ambient type declarations work)

To do this we need to place to add it to global `window` object like this:

```ts
window.run = run;
```

But you will see an error because there is no `run` method in the `window` object, and so if JS would quietly swallow it, TS will “complain”. Try clicking with Ctrl on the window - and see where you will be. This is the `lib.es6.d.ts` file that provides wrappers for standard types, but the `run` method in it is certainly not described - it must be added.

In this case, we need to extend the window interface - let's do it:

Create `global.d.ts` file that will contain our own ambient types declarations, and add there

```ts
interface Window {
	run: () => void;
}
```

Here we extend `Window` interface with the new method run. After this TS should stop complaining about missing `run` property in window.

### declare global

You can also do it directly from `main.ts` file (not recommended) in this case you need to use this code:

```ts
declare global {
	interface Window {
		run: () => void;
	}
}
```

`declare global` is needed because we should define `window` as a global object, otherwise it is local to the module `main.ts`.

