var scaleLinear = require('d3-scale').scaleLinear;
var extent = require('d3-array').extent;
var ticks = require('d3-array').range;
var dispatch = require('d3-dispatch').dispatch;
var select = require('d3-selection').select;
var selectAll = require('d3-selection').selectAll;
var dispatcher = dispatch('selected');

module.exports = {
	draw:draw,
	event:dispatcher,
	selected:'a',
	selectPaper:highlight
}

function draw(parent, data){

	var bounds = parent.node().getBoundingClientRect();
	var width = bounds.width;
	var height = bounds.height;
	var margin = {top:10,left:10, bottom:10, right:10 };
	var centerLine = 20;
	var smallTick  = 5;
	var largeTick = 10;

	var plot = parent.append('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('viewBox','0 0 ' + width + ' ' + height)
		.append('g')
			.attr('transform','translate(' + margin.left + ',' + margin.top + ')')

	var domain = extent(data, function(d){
			return d.gdpimpact.central;
		});

	//make the extent symetrical and round to the outer 0.5
	var abs = Math.max(Math.abs(domain[0]), Math.abs(domain[1]));
	abs = Math.ceil(((abs*10)/5)*5) /10; 
	domain = [-abs,abs];

	var range = [0, width-(margin.left + margin.right)]

	var gdpScale = scaleLinear()
		.domain(domain)
		.range(range);

		//axis

	plot.selectAll('g.tick')
		.data(ticks(domain[0],domain[1]+0.1,0.5))
			.enter()
		.append('g')
			.attr('class', 'tick')
			.attr('transform', function(d){
				return 'translate(' + Math.round(gdpScale(d)) + ',0)'
			})
		.call(function(tick){
			tick.append('text')
				.text(function(d){ return d; });

			tick.append('line')
				.attr('x1',0)
				.attr('x2',0)
				.attr('y1',function(d){
					if((d)%1==0){
						return centerLine-largeTick/2;
					}
					return centerLine-smallTick/2;
				})
				.attr('y2',function(d){
					if((d)%1==0){
						return centerLine+largeTick/2;
					}
					return centerLine+smallTick/2;
				});
		})

		//data
	plot.selectAll('g.paper')
		.data(data)
			.enter()
		.append('g')
			.attr('class','paper')
			.attr('transform',function(d){
				return 'translate('+gdpScale(d.gdpimpact.central)+','+centerLine+')'
			})
			.on('click',function(d){
				highlight( d );
			})
			.on('mouseover',function(d){
				over( d );
			})
			.on('mouseout', function(d){
				out( d );
			})
		.call(function(group){
			group.append('rect')
					.attr('class',function(d){
						if(d.gdpimpact.central == 0){
							return 'outline gdp-outline-neutral';
						}
						if(d.gdpimpact.central > 0){
							return 'outline gdp-outline-positive';
						}
						return 'outline gdp-outline-negative';
					})
					.attr('width', 14)
					.attr('height', 14)
					.attr('x', -7)
					.attr('y', -7)
					.attr('transform', 'rotate(45)');

			group.append('rect')
					.attr('class',function(d){
						if(d.gdpimpact.central == 0){
							return 'marker gdp-marker-neutral';
						}
						if(d.gdpimpact.central > 0){
							return 'marker gdp-marker-positive';
						}
						return 'marker gdp-marker-negative';
					})
					.attr('width', 10)
					.attr('height', 10)
					.attr('x', -5)
					.attr('y', -5)
					.attr('transform', 'rotate(45)');
		});
}

function highlight(datum){
	selectAll('.outline')
		.classed('highlight',function(d){
			return datum.shortcode == d.shortcode;
		});
	dispatcher.call('selected', datum);
}

function over(datum){
	selectAll('.outline')
		.classed('over',function(d){
			return datum.shortcode == d.shortcode;
		});
}

function out(datum){
	selectAll('.outline').classed('over', false);
}