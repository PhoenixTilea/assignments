export function formatMoney(amount) {
	const d = Math.abs(Math.floor(amount));
	const c = Math.abs((amount * 100) % 100);
	
	let str = `$${d}.`;
	if (amount < 0) {
		str = `-${str}`;
	}
	if (c < 10) {
		return str + `0${c}`;
	}
	return str + c;
}