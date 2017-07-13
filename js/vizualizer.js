
//Wait for window.onload to fire. See crbug.com/112368
window.addEventListener('load', function(e) {

	var frequencyData = new Uint8Array(200);
	var dataset = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];
	var svgHeight = '300';
	var svgWidth = '600';
	var barPadding = '1';
	
	//first select the parent element we passed to it
	//then create a new SVG element and append it within the parent
	//then set the height and width attributes of the new SVG element
	function createSvg(parent, height, width) 
	{
		return d3.select(parent)
			 .append('svg')
			 .attr('height', height)
			 .attr('width', '100%'); //since the last method in the chain .attr() is referencing the SVG element, the return statement in createSVG() is returning a reference to the SVG element
	}

	//create the SVG and then stores the reference to the SVG element in the graph variable
	var svg = createSvg('#visualizer', svgHeight, svgWidth);


	svg.selectAll('rect')
	   	.data(frequencyData)
	  	.enter()
	   	.append('rect')
		.attr('x', function (d, i) {
      		return i * (svgWidth / frequencyData.length);
   		})
   		.attr('width', svgWidth / frequencyData.length - barPadding);



	   /* 
	   //static bar graph
	   .attr('width', svgWidth / dataset.length - barPadding)
	   .attr('height', function (d) {
	   		return d * 4;
	   })
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / dataset.length);
	   })
	   .attr('y', function (d) {
	   		return svgHeight - (d * 4); // Align the bars to the bottom of the SVG.
	   });
		*/
	
		// Continuously loop and update chart with frequency data.
		function renderChart() {
		   requestAnimationFrame(renderChart);
		   var color1 = 255; //Math.floor(Math.random() * 254) + 1 
		   var color2 = Math.floor(Math.random() * 100) 

		   // Copy frequency data to frequencyData array.
		   try{
		   		analyser.getByteFrequencyData(frequencyData);
		   }
		   catch(e) {
		   		console.log("No audio playing.");
		   }
		   

		   // Update d3 chart with new data.
		   svg.selectAll('rect')
		      .data(frequencyData)
		      .attr('y', function(d) {
		         return svgHeight - d;
		      })
		      .attr('height', function(d) {
		         return d;
		      })
		      .attr('fill', function(d) {
		         return 'rgb('+color1+', '+color2+', ' + d + ')';
		      });
		}

		// Run the loop
		renderChart();

}, false);




