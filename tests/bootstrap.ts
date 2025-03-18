import { assert } from '@japa/assert'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'
import {apiClient} from '@japa/api-client'
import { configure } from '@japa/runner'

export const plugins: Config['plugins'] = [
  assert(), 
  pluginAdonisJS(app),
  apiClient(),
]

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [],
  teardown: [],
}

export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}

configure({
  files: ['tests/**/*.spec.ts'], // Fichiers de test à exécuter
  plugins: [assert(), pluginAdonisJS(app)], // Plugins pour assertions et AdonisJS
  setup: [async () => { 
    await testUtils.httpServer().start() // Démarrer le serveur HTTP pour les tests
  }],
  configureSuite: (suite) => {
    if (['browser', 'functional', 'e2e'].includes(suite.name)) {
      suite.setup(() => testUtils.httpServer().start()) // Démarrer le serveur pour certaines suites
    }
  },
})