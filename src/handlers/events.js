const { readdirSync } = require('fs');

module.exports = function(client){
	const discordjsEvent = readdirSync('./src/events/discordjs');
	for (name of discordjsEvent) {
		const events = require(`../events/discordjs/${name}`);
		client.on(name.split('.')[0], events.bind(null, client));
	};
	const countingEvent = readdirSync('./src/events/counting');
	for (name of countingEvent) {
		const events = require(`../events/counting/${name}`);
		client.counting.on(name.split('.')[0], events.bind(null, client));
	};
}
