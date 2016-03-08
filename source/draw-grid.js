var scaleLinear = require('d3-scale').scaleLinear;
var scaleOrdinal = require('d3-scale').scaleOrdinal;
var range = require('d3-array').range;
var select = require('d3-selection').select;
var selectAll = require('d3-selection').selectAll;

module.exports = function(parent, data){

	var width = 600, height = 600 , margin = { top:20, bottom:20, left:20, right:20 };

	var svg = parent.append('svg')
					.attr('width', width)
					.attr('height', height)
					.append('g').attr('transform','translate(' + margin.left + ',' + margin.top + ')');

	var positionDomain = data.getPositions().map(function(d){
		return d.headline;
	});

	//make a catagorical scale
	var paperScale = scaleLinear()
					.domain([-4, 4])
					.range([0, width]);

	var positionScale = scaleOrdinal()
					.domain( positionDomain )
					.range( range(0, height, height/positionDomain.length) );

	console.log( data.getPositions() );

	svg.selectAll('g')
				.data(data.getPositions)
					.enter()
				.append('g')
					.attr('transform', function(d){
						return 'translate(0,' + positionScale(d.headline) + ')';
					})
				.each(function(datum){
					var papers = Object.keys(datum.paper).filter(function(d){
						return datum.paper[d];
					});

					select(this).selectAll('rect')	//.append('text').text('HHHH')
						.data(papers)
						.enter()
						.append('rect')
							.attr('x', function(d){ 
								var paperData = data.getPaper(d);
								return paperScale(paperData.gdpimpact.central); 
							})
							.attr('width', 20)
							.attr('height', 20);
				});
				

}