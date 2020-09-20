export function pannable(node) {
	let x;

	function handleMousemove(event) {
		x = event.clientX;

		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x }
		}));

		window.addEventListener('scroll', handleScroll);
	}


	function handleMouseup(event) {
		x = event.clientX;

		node.dispatchEvent(new CustomEvent('panend', {
			detail: { x }
		}));

		window.removeEventListener('mousemove', handleMousemove);
	}

	node.addEventListener('mousemove', handleMousemove);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousemove);
		}
	};
}