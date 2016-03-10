'use strict';

var dataURL = "http://bertha.ig.ft.com/republish/publish/ig/1ATt2KloxRVmM7Bogmu1DQzf42OIiEnhBPUpOic8DJHo/basic,papers";
var request = require('d3-request');
var select = require('d3-selection').select;
var selectAll = require('d3-selection').selectAll;
var arrayScan = require('d3-array').scan;
var data = require('./data-processing');
var gdpViz = require('./draw-gdp');
var details = require('./paper-details');

var papers;

request.json(dataURL, function(d){
	papers = data.add(d);


	gdpViz.event.on('selected', function(){
		var paperCode = this.shortcode;
		select('#paper').call(details.paper, data.getPaper(paperCode));
		select('#assumptions').call(details.assumptions, data.getPositions(paperCode))
	})

	var papersList = d.papers.sort(function(a,b){
		return a.gdpimpact.central - b.gdpimpact.central;
	});

	select('#lower-estimate').on('click', function(){ 
		var current = gdpViz.selected(); 
		var currentIndex = papersList.map(function(p){
			return p.shortcode;
		}).indexOf(current.shortcode);

		var nextIndex = Math.max(currentIndex-1, 0);
		gdpViz.selectPaper( papersList[nextIndex] );
	});

	select('#higher-estimate').on('click', function(){ 
		var current = gdpViz.selected(); 
		var currentIndex = papersList.map(function(p){
			return p.shortcode;
		}).indexOf(current.shortcode);
		
		var nextIndex = Math.min(currentIndex+1, papersList.length-1);
		gdpViz.selectPaper( papersList[nextIndex] );
	});

	select('.visualisation')
		.call(gdpViz.draw, papersList);

	//the default paper
	gdpViz.selectPaper(data.getPaper('us'));
});
