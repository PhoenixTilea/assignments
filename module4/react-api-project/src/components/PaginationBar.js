import React from "react";

export default function PaginationBar(props) {
	const buildBar = () => {
		const bar = [];
		if (props.current > 0) {
			bar.push(<button role="link" onclick={() => props.change(0)}>First</button>);
			bar.push(<button role="link" onClick={() => props.change(props.current - 1)}>Prev</button>);
		}
		let count = 1;
		while (count <= props.total) {
			if (count === props.current + 1) {
				bar.push(<strong>{count}</strong>);
			} else if ((count <= 5) ||
				(count >= props.total - 5) ||
				(count >= props.current - 1 && count <= props.current + 3))
			{
				let i = count;
				bar.push(<button role="link" onClick={() => props.change(i - 1)}>{i}</button>);
			} else {
				if (count < props.current) {
					count = props.current - 1;
				} else {
					count = props.total - 5;
				}
				bar.push(<span> ... </span>);
				continue;
			}
			count++;
		}
		if (props.current < props.total - 1) {
			bar.push(<button role="link" onClick={() => props.change(props.current + 1)}>Next</button>);
			bar.push(<button role="link" onClick={() => props.change(props.total - 1)}>Last</button>);
		}
		return bar;
	};
	
	if (props.total > 1) {
		return (
			<nav className="pagination-bar" aria-roledescription="pages navigation">
				{buildBar()}
			</nav>
		);
	} else {
		return <div></div>;
	}
}