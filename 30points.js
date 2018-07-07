function calcLength(x0, y0, x1, y1) {
	x = x1 - x0;
	y = y1 - y0;
	l = Math.sqrt(x*x + y*y);
	return l;
}

function getPoint(x0, y0, x1, y1, section, step) {
	k = step / section;
	x = x0 + (x1 - x0) * k;
	y = y0 + (y1 - y0) * k;
	return { x:x, y:y };
}

function getInShape(stringShape) {
	//return
}

function getPoints(shape, step) {
	last_one = shape[shape.length - 1];
	list_out = [shape[0]];
	shape.shift();

	x0 = list_out[list_out.length - 1].x;
	y0 = list_out[list_out.length - 1].y;
	x1 = shape[0].x;
	y1 = shape[0].y;

	subsection = 0;
	i = 0;
	indeces = [];

	while (shape.length > 0) {
		try {
			section = calcLength(x0, y0, x1, y1);
			if (section + subsection > step) {
				point = getPoint(x0, y0, x1, y1, section, step - subsection);
				list_out.push(point);
				indeces.push(i);
				x0 = list_out[list_out.length - 1].x;
				y0 = list_out[list_out.length - 1].y;

				subsection = 0;
				continue;
			} else if (section < step) {
				subsection = section;
				x0 = shape[0].x;
				y0 = shape[0].y;
				shape.shift();
				i++;
				x1 = shape[0].x;
				y1 = shape[0].y;
				continue;
			} else {
				list_out.push(shape[0]);
				indeces.push(i);
			}

			shape.shift();
			i++;
			x0 = list_out[list_out.length - 1].x;
			y0 = list_out[list_out.length - 1].y;
			x1 = shape[0].x;
			y1 = shape[0].y;
		} catch (error) {
			list_out.push(last_one);
			return list_out;
		}
	}
}