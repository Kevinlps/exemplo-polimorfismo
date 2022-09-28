import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import UserProperty from "../entities/UserProperty";
import UserPropertyCsvDAO from "./UserPropertyCsvDAO";

const path = join(__dirname, '..' , '..' , 'data' , 'user.csv')

describe('Tests over new properties insertion', ()=>{
    beforeEach(() => writeFileSync(path, ''))

    test('It should contain the new property after add it to the properties ',() => {
        const userProperty: UserProperty = {
            key:'email',
            value: 'kevin@email.com',
        }
        const userPropertyDAO = new UserPropertyCsvDAO()       
        userPropertyDAO.set(userProperty)

        const content = readFileSync(path, 'utf-8')
        const expectedContent = 'key,value\nemail,kevin@email.com\n'
        expect(content).toBe(expectedContent)
    })
    test('It should contain all the new properties after add them to the properties file',()=>{
        const userProperties: UserProperty[] = [
            {
                key: 'name',
                value: 'kevin'
            },
            {
                key: 'email',
                value: 'kevin@email.com'
            },
            {
                key: 'cpf',
                 value: '999.999.999-99'
            }
        ]

        const userPropertyDAO = new UserPropertyCsvDAO()
        userProperties.forEach((up)=> userPropertyDAO.set(up))

        const  content = readFileSync(path, 'utf-8')
        const expectedContent = 'key,value\nname,kevin\nemail,kevin@email.com\ncpf,999.999.999-99\n'

        expect(content).toBe(expectedContent)
    })
})
describe('Tests over property querying', ()=>{
    beforeEach(() => writeFileSync(path, ''))
    
    test('It should retrieve a previously inserted property',()=>{
        const userProperties: UserProperty = {
            key: 'name',
            value: 'abcd',
        }
        const userPropertyDAO = new UserPropertyCsvDAO
        userPropertyDAO.set(userProperties)
        const value = userPropertyDAO.get('name') 
        expect(value).toBe(userProperties.value)
    })
    test('It should correctly update a property value',()=>{
        const userProperties: UserProperty = {
            key: 'name',
            value: 'abcd',
        }
        const userPropertyDAO = new UserPropertyCsvDAO() 
    })
})