export function formatMoney(amount) {
	const d = Math.floor(amount);
	const c = Math.abs((amount * 100) % 100);
	
	const str = `$${d}.`;
	if (c < 10) {
		return str + `0${c}`;
	}
	return str + c;
}