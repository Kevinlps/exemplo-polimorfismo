import { appendFileSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import UserProperty from '../entities/UserProperty'

export default class UserPropertyDAO {
  private _userPropertyFilePath: string
  private _properties: UserProperty[]

  constructor() {
    this._userPropertyFilePath = join(
      __dirname,
      '..',
      '..',
      'data',
      'user.properties'
    )

    this._loadProperties()
  }

  private _loadProperties() {
    this._properties = []
    const content = readFileSync(this._userPropertyFilePath, 'utf-8')
    const lines = content.split('\n')
    lines.forEach((l) => {
      // ["email", "sidney@email.com"]
      if (l && l.includes('=')) {
        const aux = l.split('=')
        const property: UserProperty = {
          key: aux[0],
          value: aux[1],
        }

        this._properties.push(property)
      }
    })
  }

  private _saveProperties() {
    // Reseta o arquivo
    writeFileSync(this._userPropertyFilePath, '')

    this._properties.forEach((p) => {
      const line = `${p.key}=${p.value}\n`
      appendFileSync(this._userPropertyFilePath, line)
    })
  }

  set(userProperty: UserProperty) {
    const { key } = userProperty
    const index = this._properties.findIndex((p) => p.key == key)

    if (index > -1) {
      this._properties[index] = userProperty
    } else {
      this._properties.push(userProperty)
    }

    this._saveProperties()
  }

  get(key: string): string | null {
    const property = this._properties.find((p) => p.key == key)

    return property ? property.value : null
  }
}
