import 'reflect-metadata'
import testUtils from '@adonisjs/core/services/test_utils'

export default async function () {
  await testUtils.httpServer().start()
}