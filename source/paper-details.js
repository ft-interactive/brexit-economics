
module.exports = {
	paper: paperInfo,
	assumptions: assumptionsInfo
};

function paperInfo(parent, paper){
	parent.select('#paper-title')
		.html( paper.title );
	
	parent.select('#paper-gdp')
		.html( gdpString( paper.gdpimpact ) );

	parent.select('#paper-description')
		.html( paper.description );

}

function assumptionsInfo(parent, assumptions){
	console.log('assumptions', assumptions.length);
	var join = parent.selectAll('li')
					.data(assumptions);

	join.enter().append('li')
		.attr('class','assumption').text(function(d){
			console.log(d);
			return d.headline;
		});
}

function gdpString(impact){
	if(impact.low != null){
		return impact.low + ' &mdash; ' + impact.high + '%';
	}
	return impact.central;
}