function drawGraph(data, distance) {
	/*var data = [
		{alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, {alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, {alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, {alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, 
	]*/;


	var ctx = document.getElementById('canvas').getContext('2d');
	

	var altData = [];
	var labels = [];
	var min = 10000;
	var max = -10000;
	data.forEach(function(item, i, arr) {
		altData.push(item.alt);
		labels.push((i / (data.length - 1) * distance).toFixed(0));
		if (item.alt > max) {
			max = item.alt;
		}
		if (item.alt < min) {
			min = item.alt;
		}
	});

	var lowScale = min - (max - min) * .2;
	var highScale = max + (max - min) * .2;
	lowScale = Math.max(0, lowScale);

	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: labels,//["January", "February", "March", "April", "May", "June", "July"],
	        datasets: [{
	            label: "Altitude profile",
	            /*backgroundColor: 
	            
		            pattern.draw('square', '#ff6384'),
		            pattern.draw('circle', '#36a2eb'),
		            pattern.draw('diamond', '#cc65fe'),
		            pattern.draw('triangle', '#ffce56'),
		        ],*/
		        backgroundColor: 'rgb(232, 199, 255)',
	            borderColor: 'rgb(132, 99, 255)',
	            data: altData,//[1100, 1110, 1115, 1112, 1120, 1130, 1145],
	        }]
	    },

	    // Configuration options go here
	    options: {
	    	responsive: true,
	    	maintainAspectRatio: false,
	    	legend: {
	    		display: false,
	    	},
	    	title: {
	    		display: false,
	    		text: 'Altitude profile'
	    	},
	    	scales: {
	    		yAxes: [{
	    			ticks: {
	    				min: lowScale,
	    				max: highScale,
	    			},
	    			scaleLabel: {
		    			display: true,
		    			labelString: 'Altitude, m',
		    			fontStyle: 'bold',
		    			fontSize: 16
		    		}
	    		}],
	    		xAxes: [{
	    			ticks: {
	    				stepSize: 5
	    			},
	    			scaleLabel: {
		    			display: true,
		    			labelString: 'Distance, m',
		    			fontStyle: 'bold',
		    			fontSize: 16
		    		}
	    		}],
	    	}
	    }
	});
}