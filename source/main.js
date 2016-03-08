'use strict';

var dataURL = "http://bertha.ig.ft.com/republish/publish/ig/1ATt2KloxRVmM7Bogmu1DQzf42OIiEnhBPUpOic8DJHo/basic,papers";
var request = require('d3-request');
var select = require('d3-selection').select;
var selectAll = require('d3-selection').selectAll;
var data = require('./data-processing');
var drawGDP = require('./draw-gdp');

//var drawGrid = require('./draw-grid');

var papers;

request.json(dataURL, function(d){
	papers = data.add(d);
	update({ paper:undefined, position:undefined });
	//select('.visualisation').call(drawGrid, data);
	drawGDP.event.on('selected', function(d){
		console.log('selected',this);
	})
	select('.visualisation').call(drawGDP.draw, d.papers);	
});


function update(state){
	select('.papers').call(drawPapers, state);
	select('.positions').call(drawPositions, state);
	select('.details').call(drawDetails, state);

};

function drawDetails(parent, state){
	var info = []
	if(state.position){
		var d = data.getPosition(state.position);
		info.push({
			headline: d.headline,
			body: d.detail
		});
	}else if(state.paper){
		var d = data.getPaper(state.paper);
		info.push({
			headline: d.title,
			body: d.description
		});
	}
	var selection = parent.selectAll('div')
			.data(info)
		
		selection.enter().append('div');

		selection.exit().remove();

	parent.selectAll('div').html(function(d){
			return '<h3>'+d.headline+'</h3>'
					+ d.body;
		});

//		.data()
}

function drawPositions(parent, state){
	parent.selectAll('div')
		.data(data.getPositions(state.paper))
			.enter()
		.append('div')
			.text(function(d){
				return d.headline;
			})
			.on('click',function(d){
				update({
					position:d.headline
				});
			});

	parent.selectAll('div')
			.classed('selected', function(d){ return state.position === d.headline; })
			.classed('highlighted', function(d){
				return d.paper[state.paper];
			});
			
}

function drawPapers(parent, state){

	parent.selectAll('div')
		.data(papers)
			.enter()
		.append('div')
			.text(function(d){
				return d.shortcode;
			})
			.on('click', function(d){
				update({
					paper: d.shortcode
				});
			});

	parent.selectAll('div')
			.classed('selected', function(d){ return state.paper === d.shortcode; })
			.classed('highlighted', function(d){ 
				for(var i=0; i<d.positions.length; i++){
					if(d.positions[i].headline == state.position){
						return true;
					}
				}
				return false; 
			});	
}