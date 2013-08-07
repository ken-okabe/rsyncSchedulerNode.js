(function()
{
  'use strict';
	//,,,,,,,,,,,,,,

	var rsyncScheduler = function(shCmd, sec)
	{
		var parseShCmd = function(cmd)
		{
			var cmdA = cmd.split(/ /);
			console.log(cmdA);
			var cmd1 = cmdA[0];
			var args1 = [];
			cmdA.map(function(s, i)
			{
				if (i === 0)
				{
					console.log('-------------------'); //do nothing
				}
				else
				{
					args1[i - 1] = cmdA[i].replace(/_@_/g, ' ');
				}
			});
			return [cmd1, args1];
		};

		var cmd1 = parseShCmd(shCmd);
		console.log(cmd1[0]);
		console.log(cmd1[1]);
		console.log('==================');
		var spawn = require('child_process')
			.spawn;

		var rsync = function()
		{
			spawn(cmd1[0], cmd1[1])
				.stdout
				.pipe(process.stdout);
		};

		rsync();
		console.log('rsync:' + sec + ' seconds interval');
		var iv = setInterval(rsync, sec * 1000);

	};

	var shCmd = 'rsync' +
		' -r -t -p -o -g -v --progress --delete -l -H ' +
		'/Users/ken/Library/Application_@_Support/Sublime_@_Text_@_3/Packages ' +
		'/Users/ken/Google_@_Drive/__config-GD/ST3';
	rsyncScheduler(shCmd, 60);

	//,,,,,,,,,,,,,,,,
}());
