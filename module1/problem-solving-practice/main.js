function largest(arr) {
	let largest = arr[0];
	for (let i = 1; i < arr.length; ++i) {
		if (arr[i] > largest) {
			largest = arr[i];
		}
	}
	return largest;
}

function charSearch(words, chr) {
	let foundWords = [];
	arr.forEach(word => {
		if (word.indexOf(chr) >= 0) {
			foundWords.push(word);
		}
	});
	return foundWords;
}

function isDivisible(num1, num2) {
	return (num1 % num2 === 0);
}

