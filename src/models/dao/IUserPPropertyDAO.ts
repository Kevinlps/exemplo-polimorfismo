import UserProperty from "../entities/UserProperty";

export default interface IUserPropertyDAO {
    set(userProperty: UserProperty) : void
    get(key:string) : string|null

}