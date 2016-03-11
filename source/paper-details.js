
module.exports = {
	paper: paperInfo,
	assumptions: assumptionsInfo
};

function paperInfo(parent, paper){


	parent.select('#paper-name')
		.html( paper.name );

	parent.select('#paper-title')
		.html( '<p><a href="' + paper.link + '">' + paper.title + ' ('+paper.year+')</a></p>');
	
	parent.select('#paper-gdp')
		.html( gdpString( paper.gdpimpact ) );

	parent.select('#paper-description')
		.html( paper.description );

}

function assumptionsInfo(parent, assumptions){
	var join = parent.selectAll('li')
					.data(assumptions);
	join.exit().remove();
	join.enter().append('li')
		.attr('class','assumption').text(function(d){
			return d.headline;
		});
}

function gdpString(impact){
	if(impact.low != null){
		return impact.low + ' &mdash; ' + impact.high + '%';
	}
	return impact.central + '%';
}