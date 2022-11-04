var val = '123@spacehotline.com';
const events = ['onChange', 'onKeyDown', 'onKeyUp', 'onMouseEnter'];
const x = document.querySelector('[class=email]');
x.value = val;
Object.keys(x).filter(((i) => i.includes('_react'))).forEach((k) => {
	x[k].value = val;
	events.forEach(function(event) {
		try {
			x[k][event]({ target: { value: val, }, });
			x[k].blur();
		} catch (e) {}
	});
});
