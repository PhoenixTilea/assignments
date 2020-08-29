function stalinSort(...items) {
	let sorted = items.slice();
	for (let i = 0; i < sorted.length - 1; ++i) {
		if (sorted[i] > sorted[i + 1]) {
			sorted.splice(i + 1, 1);
			--i;
		}
	}
	return sorted;
}

console.log(stalinSort(4, 8, 2, 5, 16, 9, 20, 4));
