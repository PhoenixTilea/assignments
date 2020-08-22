function Employee(name, title, salary) {
	this.name = name;
	this.title = title;
	this.salary = salary;
	this.status = "fulltime";
}
Employee.prototype.printRecords = function () {
	console.log("Name: " + this.name);
	console.log("Job Title: " + this.title);
	console.log("Salary: " + this.salary);
	console.log("Status: " + this.status);
}

let emp1 = new Employee("Jon Snow", "Ranger", "15,000");
let emp2 = new Employee("Bron", "Mercenary", "20,000");
emp2.status = "contract";
let emp3 = new Employee("Obarin Martell", "Prince of Dorne", "120,000");

emp1.printRecords();
emp2.printRecords();
emp3.printRecords();

let employees = [emp1, emp2, emp3];