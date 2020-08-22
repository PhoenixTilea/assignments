const count = { fizzbuzz: 0, fizz: 0, buzz: 0 };
function track(val) {
	switch (val) {
		case "fizzbuzz":
			++count.fizzbuzz;
			break;
		case "fizz":
			++count.fizz;
			break;
		case "buzz":
			++count.buzz;
			break;
	}
}

for (let i = 1; i <= 100; ++i) {
	let val = "";
	if (i % 3 === 0) {
		val += "fizz";
	}
	if (i % 5 === 0) {
		val += "buzz";
	}
	if (val.length > 0) {
		track(val);
	} else {
		val = i;
	}
	console.log(val);
}

console.log(`${count.fizzbuzz} ${count.fizz} ${count.buzz}`);