import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import UserProperty from "../entities/userProperty"
import UserPropertyDao from "./UserPropertyDAO"
const path = join(__dirname,"..", "..", "data", "user.properties")

describe('Tests over new property insertion ',()=>{
    beforeEach(()=>{
        writeFileSync(path, '')
    })
    test('It should contain the new property after add it to the properties file',()=>{
        const userProperty: UserProperty = {
            key: 'email',
            value: 'sid@email.com',
        }

        const userPropertyDao = new UserPropertyDao()
        userPropertyDao.add(userProperty)

        const content = readFileSync(path, 'utf-8')
        expect(content).toBe('email=sid@email.com\n')
    })
    test('IT should contain all the new properties after add them to the proprties file',()=>{
        let userProperty: UserProperty[] = [{
            key: 'name',
            value: 'Kevin',
        },
        {
            key: 'email',
            value: 'Kevin@email',
        },
        {
            key: 'cpf',
            value: '999999999-99',
        },
        {
            key: 'idade',
            value: 20,
        },
    ]
        const userPropertyDao = new UserPropertyDao()
        userProperty.forEach((up)=>userPropertyDao.add(up))

        const content = readFileSync(path, 'utf-8')
        const expectContent = 'name=Kevin\nemail=Kevin@email\ncpf=999999999-99\nidade=20\n'
        expect(content).toBe(expectContent)
    })
})
describe('Tests over querying properties',()=>{
    beforeEach(()=>{
            writeFileSync(path, '')
    })

    test('It should return null when key is not found',()=>{
        const userPropertyDao =new UserPropertyDao()
        expect(userPropertyDao.get('name')).toBe(null)
    })

    test('It should return correct value when key is found',()=>{
        const userPropertyDao = new UserPropertyDao
        const userProperty: UserProperty =  {
            key: 'name',
            value: 'Kevin',
        }
        userPropertyDao.add(userProperty)

        expect(userPropertyDao.get('name')).toBe('Kevin')
    })

})