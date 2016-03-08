var positions;
var papers;

function addData(spreadsheet){
	
	positions = spreadsheet.data;

	papers = spreadsheet.papers.map(function(paper){
		return {
			shortcode: paper.shortcode,
			name: paper.name,
			title: paper.title,
			description: paper.description,
			link: paper.link,
			year: paper.year,
			gdpimpact: paper.gdpimpact,
			impactBucket:Math.round(paper.gdpimpact.central),
			positions: getPositions(paper.shortcode).map(function(d){
				return {
					headline:d.headline, detail:d.detail
				}
			})
		}
	});
	return papers;
}

function getPositionPopularity(headline){
	var popularity = positions.map(function(d){
		var count = 0;
		for(var key in d.paper){
			if(d.paper[key] === true) count ++;
		}
		return {
			headline:d.headline,
			count:count
		}
	})

	if(!headline){
		 return popularity.sort(function(a,b){
			return a.count - b.count;
		})
	}
}

function getPositions(shortcode){
	return positions.filter(function(d){
		if(shortcode){
			return d.paper[shortcode];
		}
		return true;
	});
}


function getPaper(shortcode){
	return papers.find(function(d){
		return (d.shortcode === shortcode);
	})
}

function getPosition(headline){
	return positions.find(function(d){
		return (d.headline === headline);
	})
}

module.exports = {
	add: addData,
	getPositions: getPositions,
	getPositionPopularity: getPositionPopularity,
	getPaper: getPaper,
	getPosition: getPosition
};

function makeLookup(array, key){
	var lookup = {};
	array.forEach(function(d){
		lookup[d[key]] = d;
	})
	return lookup;
}