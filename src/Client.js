const { Client, Collection } = require('discord.js');
const { EventEmitter } = require('events');

const config = require('./settings/config.json');
const custom = require('./settings/custom.json');

class Counting extends Client {
	constructor() {
		super({
			intents: ['GUILDS', 'GUILD_MESSAGES'],
		});
		
		this.commands = new Collection();
		this.cooldown = new Collection();
		this.counting = new CountingStore(this);
	};
	
	delay(timeout) {
		return new Promise((resolve, reject) => {
			if (timeout || typeof(timeout) === 'number') {
				return this.setTimeout(() => resolve(timeout), timeout);
			}; reject(new Error('Number not set!'));
		});
	}
};

class CountingStore extends EventEmitter {
	constructor(client) {
		super();

		this.disable = false;
		this.version = require('../package.json').version;
		this.reminders = custom.reminders;
		this.owoprefix = new RegExp(`(owo|${custom.owoprefix})`);
		this.cooldowns = {
			owo: 10000,
			hunt: 15000,
			battle: 15000,
			pray_curse: 300000,
		};
		this.custom_owoprefix = custom.owoprefix || null;

		client.on('ready', () => {
			this.client = client;
			this.readyAt = new Date();
			this.readyTimestamp = Date.now();
			
			this.emit('ready', this);
		});
	};
	
	create() {
		this.client.on('messageCreate', async (message) => {
			if (message.author.bot && message.author.id !== 'xxx') return; // listen to owo bot only to improve utility
			await created(message, this);
		});
	};
};

async function created(message, counting) {
	// some handle
}

module.exports = Counting;