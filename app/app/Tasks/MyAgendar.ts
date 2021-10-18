import { BaseTask } from 'adonis5-scheduler/build'
const schedule = require('node-schedule');
import Mail from '@ioc:Adonis/Addons/Mail'
import Usuario from 'App/Models/Usuario';

function sendEmail(email) {
	Mail.send((message) => {
		message
			.from('info@example.com')
			.to(email)
			.subject('Welcome Onboard!')
			.htmlView('emails/newgame', { name: 'name' })
	}).catch((e) => console.log(e))
}

export default class MyAgendar extends BaseTask {
	public static get schedule() {
		return '* * * * * *'
	}

	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}
	public async handle() {

		const rule = new schedule.RecurrenceRule();
		rule.dayOfWeek = [0, new schedule.Range(0, 6)];
		rule.hour = 21;
		rule.minute = 44;
		let hoje = new Date();


		const job = schedule.scheduleJob(rule, async function () {

			const us = await Usuario.query().preload('jogador',
				(postsQuery) => {
					postsQuery.preload('jogo').orderBy('created_at', 'desc')
				}).
				where('type', 'JOGADOR')

			us.forEach((user) => {

				if (!user.jogador.jogo[0]) {
					sendEmail(user.email)
				} else {
					let dayApos = user.jogador.jogo[0].$extras.pivot_created_at.c.day
					if (dayApos + 6 == hoje.getDate())
						sendEmail(user.email)
				}
			})
		});
		job
	}
}
