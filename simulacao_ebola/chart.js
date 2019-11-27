var labels = [];
for(var i = 0; i < 1000; i++)
	i % 50 == 0? labels.push(i): labels.push('');

// the objects of chart
var ctx_1 = document.getElementById("chart_1").getContext('2d');
var ctx_2 = document.getElementById("chart_2").getContext('2d');

// define properties of charts
var chart_1 = new Chart(ctx_1, {
	type: 'line',
	data: {
		labels: labels,
		datasets: [
		{label: '\% Susce.',data: [], pointRadius: 0, borderColor: '#66dd66aa',
		fill: false, backgroundColor: '#66dd6633', hidden: true},
		{label: '\% Incub.',data: [], pointRadius: 0, borderColor: '#6600ffaa',
		fill: false, backgroundColor: '#6600ff33'},
		{label: '\% Infec.',data: [], pointRadius: 0, borderColor: '#ff6666aa',
		fill: false, backgroundColor: '#ff666633'},
		{label: '\% Isola.',data: [], pointRadius: 0, borderColor: '#666666aa',
		fill: false, backgroundColor: '#66666633'},
	/**{label: 'Recu',data: [], pointRadius: 0, backgroundColor: 'rgb(120,0,0)'}**/]
	},
	options: {
		title: {
			display: true,
			text: 'Percentual da população na África entre compartimentos (dias)'
		}
	}
});

var chart_2 = new Chart(ctx_2, {
	type: 'line',
	data: {
		labels: labels,
		datasets: [
		{
			data: [],
			label: '\% Infectados (incubação, infectantes ou isolados)',
			pointRadius: 0,
			backgroundColor: '#ff3333aa'
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Percentual da população infectada pelo víruz Ebola na África (dias)'
		}
	}
});
