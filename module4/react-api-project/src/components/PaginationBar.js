import React from "react";

export default function PaginationBar(props) {
	const buildBar = () => {
		const bar = [];
		if (props.current > 0) {
			bar.push(<a onclick={() => props.change(0)}>First</a>);
			bar.push(<a onClick={() => props.change(props.current - 1)}>Prev</a>);
		}
		for (let i = 1; i <= props.total; i++) {
			if (i === current) {
				bar.push(<strong>{i}</strong>);
			} else {
				bar.push(<a onClick={() => change(i)}>{i}</a>);
			}
		}
		if (props.current < props.total) {
			bar.push(<a onClick={() => change(props.current + 1)}>Next</a>);
			bar.push(<a onClick={() => change(props.total)}>Last</a>);
		}
		return bar;
	};
	return (
		<nav className="pagination-bar" aria-roledescription="pages navigation">
		{buildBar()}
		</nav>
	);
}