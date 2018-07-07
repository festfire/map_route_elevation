function drawGraph(canvas, data, distance) {
	/*var data = [
		{alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, {alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, {alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, {alt: 10}, {alt: 20}, {alt: 30}, {alt: 40}, {alt: 15}, {alt: 25}, 
	]*/;


	var ctx = canvas;//document.getElementById('canvas').getContext('2d');
	

	var altDataUp = [];
	var altDataDown = [];
	var altDataFlat = [];
	var labels = [];
	var colors = [];
	var min = 10000;
	var max = -10000;
	var lastAlt = 0;
	data.forEach(function(item, i, arr) {
		//altData.push(item.alt);
		labels.push((i / (data.length - 1) * distance).toFixed(0));
		if (item.alt > max) {
			max = item.alt;
		}
		if (item.alt < min) {
			min = item.alt;
		}
		if (i > 0) {
			var angle = Math.atan2(item.alt - lastAlt, distance / data.length);
			colors.push(Math.abs(angle) > .02 ? (angle >= 0 ? 1 : -1) : 0);
		}
		lastAlt = item.alt;
	});

	data.forEach(function(item, i, arr) {
		switch(colors[i]) {
			case -1:
				altDataDown.push(item.alt);
				altDataFlat.push(null);
				altDataUp.push(null);
			break;
			case 0:
				altDataDown.push(null);
				altDataFlat.push(item.alt);
				altDataUp.push(null);
			break;
			case 1:
				altDataDown.push(null);
				altDataFlat.push(null);
				altDataUp.push(item.alt);
			break;
		}

		if (colors[i] != colors[i-1]) {
			switch(colors[i-1]) {
				case -1:
					altDataDown[i] = item.alt;
				break;
				case 0:
					altDataFlat[i] = item.alt;
				break;
				case 1:
					altDataUp[i] = item.alt;
				break;
			}			
		}
	});

	data.forEach(function(item, i, arr) {

	});

	var lowScale = min - (max - min) * .2;
	var highScale = max + (max - min) * .2;
	var minDist = 300;
	lowScale = Math.max(0, lowScale);

	if (highScale - lowScale < minDist) {
		highScale += ((minDist - (highScale - lowScale)) / 2);
		lowScale -= ((minDist - (highScale - lowScale)) / 2);	
	}

	if (lowScale < 0) {
		highScale -= lowScale;
		lowScale = 0;
	}

	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: labels,//["January", "February", "March", "April", "May", "June", "July"],
	        datasets: [{
	            label: "Going down",
		        backgroundColor: 'rgb(199, 255, 199)',
	            borderColor: 'rgb(99, 255, 99)',
	            lineTension: 0,
	            data: altDataDown,
	        },
	        {
	            label: "Going flat",
		        backgroundColor: 'rgb(232, 199, 255)',
	            borderColor: 'rgb(132, 99, 255)',
	            lineTension: 0,
	            data: altDataFlat,
	        },
	        {
	            label: "Going up",
		        backgroundColor: 'rgb(255, 199, 199)',
	            borderColor: 'rgb(255, 99, 99)',
	            lineTension: 0,
	            data: altDataUp,
	        },
	        ]
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