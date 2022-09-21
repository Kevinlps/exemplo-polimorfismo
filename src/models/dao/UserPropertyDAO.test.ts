import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import UserProperty from '../entities/UserProperty'
import IUserPropertyDAO from './IUserPPropertyDAO'
import UserPropertyCsvDAO from './UserPropertyCsvDAO'
import UserPropertyDAO from './UserPropertyDAO'

const path = join(__dirname, '..', '..', 'data', 'user.properties')
const csvPath = join(__dirname, '..', '..', 'data', 'user.csv')

describe('Tests over new property insertion', () => {
  beforeEach(() => {
    writeFileSync(path, '')
    writeFileSync(csvPath, '')
  })

  test('It should contain the new property after add it to the properties file', () => {
    const userProperty: UserProperty = {
      key: 'email',
      value: 'sid@email.com',
    }

    let userPropertyDAO: IUserPropertyDAO = new UserPropertyDAO()
    userPropertyDAO.set(userProperty)

    let content = readFileSync(path, 'utf-8')
    expect(content).toBe('email=sid@email.com\n')

    userPropertyDAO = new UserPropertyCsvDAO()
    userPropertyDAO.set(userProperty)

    content = readFileSync(csvPath,'utf-8')
    const expectedValue = 'key,value\nemail,sid@email.com\n'

    expect(content).toBe(expectedValue)

  })

  test('It should contain all the new properties after add them to the properties file', () => {
    let userProperties: UserProperty[] = [
      {
        key: 'name',
        value: 'Sidney',
      },
      {
        key: 'email',
        value: 'sid@email.com',
      },
      {
        key: 'cpf',
        value: '99999999999',
      },
      {
        key: 'age',
        value: '18',
      },
    ]

    let userPropertyDAO: IUserPropertyDAO = new UserPropertyDAO()
    userProperties.forEach((up) => userPropertyDAO.set(up))

    let content = readFileSync(path, 'utf-8')
    let expectedContent =
      'name=Sidney\nemail=sid@email.com\ncpf=99999999999\nage=18\n'
    expect(content).toBe(expectedContent)

    userPropertyDAO = new UserPropertyCsvDAO()
    userProperties.forEach((up) => userPropertyDAO.set(up))
    content = readFileSync(csvPath,'utf-8')
    expectedContent = 
    'key,value\nname,Sidney\nemail,sid@email.com\ncpf,99999999999\nage,18\n'

    expect(content).toBe(expectedContent)
  })
})

describe('Tests over querying properties', () => {
  beforeEach(() => {
    writeFileSync(path, '')
    writeFileSync(csvPath, '')
  })

  test('It should return null when key is not found', () => {
    let userPropertyDAO: IUserPropertyDAO = new UserPropertyDAO()
    expect(userPropertyDAO.get('name')).toBe(null)
    userPropertyDAO =  new UserPropertyCsvDAO
    expect(userPropertyDAO.get('name')).toBe(null)
  })

  test('It should return correct value when key is found', () => {
    let userPropertyDAO:IUserPropertyDAO = new UserPropertyDAO()
    const userProperty: UserProperty = {
      key: 'name',
      value: 'Sidney Sousa',
    }
    userPropertyDAO.set(userProperty)

    expect(userPropertyDAO.get('name')).toBe('Sidney Sousa')
    userPropertyDAO = new UserPropertyCsvDAO()
    userPropertyDAO.set(userProperty)

    expect(userPropertyDAO.get('name')).toBe('Sidney Sousa')
    
  })

  test('It should return correct value after a sequence of updates over a property', () => {
    const userPropertyDAO = new UserPropertyDAO()
    const userPropertyCsvDAO = new UserPropertyCsvDAO()

    let userProperty: UserProperty = {
      key: 'email',
      value: 'sidney@email.com',
    }
    userPropertyDAO.set(userProperty)
    userPropertyCsvDAO.set(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@email.com',
    }
    userPropertyDAO.set(userProperty)
    userPropertyCsvDAO.set(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa2@email.com',
    }
    userPropertyDAO.set(userProperty)
    userPropertyCsvDAO.set(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@brazilianmail.com',
    }
    userPropertyDAO.set(userProperty)
    userPropertyCsvDAO.set(userProperty)

    expect(userPropertyDAO.get('email')).toBe('sidney.sousa@brazilianmail.com')
    expect(userPropertyCsvDAO.get('email')).toBe('sidney.sousa@brazilianmail.com')
  })
})

