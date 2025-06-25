import { BaseCommand } from '@adonisjs/core/ace'

export default class UdpServe extends BaseCommand {
  public static commandName = 'udp:serve'
  public static description = 'Start the UDP server'

  public static settings = {
    loadApp: true,
  }

  public async run() {
    console.log('UDP server is running. Press Ctrl+C to stop.')
    await new Promise(() => {}) // Keep the process running
  }
}