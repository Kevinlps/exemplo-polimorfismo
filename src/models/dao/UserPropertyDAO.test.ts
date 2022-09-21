import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import UserProperty from '../entities/UserProperty'
import UserPropertyDAO from './UserPropertyDAO'

const path = join(__dirname, '..', '..', 'data', 'user.properties')
const csvPath = join(__dirname, '..', '..', 'data', 'user.csv')

describe('Tests over new property insertion', () => {
  beforeEach(() => {
    writeFileSync(path, '')
  })

  test('It should contain the new property after add it to the properties file', () => {
    const userProperty: UserProperty = {
      key: 'email',
      value: 'sid@email.com',
    }

    const userPropertyDAO = new UserPropertyDAO()
    userPropertyDAO.set(userProperty)

    const content = readFileSync(path, 'utf-8')
    expect(content).toBe('email=sid@email.com\n')
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

    const userPropertyDAO = new UserPropertyDAO()
    userProperties.forEach((up) => userPropertyDAO.set(up))

    const content = readFileSync(path, 'utf-8')
    const expectedContent =
      'name=Sidney\nemail=sid@email.com\ncpf=99999999999\nage=18\n'
    expect(content).toBe(expectedContent)
  })
})

describe('Tests over querying properties', () => {
  beforeEach(() => {
    writeFileSync(path, '')
  })

  test('It should return null when key is not found', () => {
    const userPropertyDAO = new UserPropertyDAO()
    expect(userPropertyDAO.get('name')).toBe(null)
  })

  test('It should return correct value when key is found', () => {
    const userPropertyDAO = new UserPropertyDAO()
    const userProperty: UserProperty = {
      key: 'name',
      value: 'Sidney Sousa',
    }
    userPropertyDAO.set(userProperty)

    expect(userPropertyDAO.get('name')).toBe('Sidney Sousa')
  })

  test('It should return correct value after a sequence of updates over a property', () => {
    const userPropertyDAO = new UserPropertyDAO()

    let userProperty: UserProperty = {
      key: 'email',
      value: 'sidney@email.com',
    }
    userPropertyDAO.set(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@email.com',
    }
    userPropertyDAO.set(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@email.com',
    }
    userPropertyDAO.set(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@brazilianmail.com',
    }
    userPropertyDAO.set(userProperty)

    expect(userPropertyDAO.get('email')).toBe('sidney.sousa@brazilianmail.com')
  })
})

/*
describe('Tests over querying properties at CSV properties file', () => {
  beforeEach(() => {
    writeFileSync(csvPath, '')
  })

  test('It should return null when key is not found', () => {
    const userPropertyDAO = new UserPropertyDAO()
    expect(userPropertyDAO.getCsv('name')).toBe(null)
  })

  test('It should return correct value when key is found', () => {
    const userPropertyDAO = new UserPropertyDAO()
    const userProperty: UserProperty = {
      key: 'name',
      value: 'Sidney Sousa',
    }
    userPropertyDAO.setCsv(userProperty)

    expect(userPropertyDAO.getCsv('name')).toBe('Sidney Sousa')
  })

  test('It should return correct value after a sequence of updates over a property', () => {
    const userPropertyDAO = new UserPropertyDAO()

    let userProperty: UserProperty = {
      key: 'email',
      value: 'sidney@email.com',
    }
    userPropertyDAO.setCsv(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@email.com',
    }
    userPropertyDAO.setCsv(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@email.com',
    }
    userPropertyDAO.setCsv(userProperty)

    userProperty = {
      key: 'email',
      value: 'sidney.sousa@brazilianmail.com',
    }
    userPropertyDAO.setCsv(userProperty)

    expect(userPropertyDAO.getCsv('email')).toBe(
      'sidney.sousa@brazilianmail.com'
    )
  })
})

describe('Tests over new property insertion at CSV properties file', () => {
  beforeEach(() => {
    writeFileSync(csvPath, '')
  })

  test('It should contain the new property after add it to the properties file', () => {
    const userProperty: UserProperty = {
      key: 'email',
      value: 'sid@email.com',
    }

    const userPropertyDAO = new UserPropertyDAO()
    userPropertyDAO.setCsv(userProperty)

    const content = readFileSync(csvPath, 'utf-8')
    expect(content).toBe('email\nsid@email.com\n')
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
        value: 18,
      },
    ]

    const userPropertyDAO = new UserPropertyDAO()
    userProperties.forEach((up) => userPropertyDAO.setCsv(up))

    const content = readFileSync(csvPath, 'utf-8')
    const expectedContent =
      'name,email,cpf,age\nSidney,sid@email.com,99999999999,18\n'
    expect(content).toBe(expectedContent)
  })
})

*/
