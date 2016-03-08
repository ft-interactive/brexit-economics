//copy: data/*,  images/*, *.html, *.css and bundle.js to a build folder

var fs = require('fs');

var deployDir = 'deploy';

var config = {
	files:['index.html', 'style.css', 'bundle.js'],
	directories:['images', 'data']
};

makeDir(deployDir);

config.files.forEach(function(f){
	try{
		fs.accessSync(f, fs.F_OK);
		copy(f, deployDir + '/' + f);
	}catch(err){}
});

config.directories.forEach(function(d){
	try{
		fs.accessSync(d, fs.F_OK);
		copyDir(d, deployDir + '/' + d);
	}catch(err){}	
});


function makeDir(d){
	try{
		fs.accessSync(d, fs.F_OK );
	}catch(err){
		console.log('creating ' + d + ' directory');
		fs.mkdirSync(d);
	};
}

function copyDir(source, destination){
	makeDir(destination);
	var sourceFiles = fs.readdirSync(source);
	sourceFiles.forEach(function(f){
		copy(source+'/'+f, destination +'/'+ f);
	});
}

function copy(source, destination){ //crude! slow!
	console.log(' copy: ' + source + ' -> ' + destination);
	fs.createReadStream( source )
	  .pipe( fs.createWriteStream(destination) );
}