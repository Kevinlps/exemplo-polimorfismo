import UserProperty from "../entities/UserProperty"

export default abstract class UserPropertyDAO {
   protected _userPropertyFilePath: string
   protected _properties : UserProperty[]

    constructor(userPropertyFilePath: string){
        this._userPropertyFilePath = userPropertyFilePath
        this._loadProperties()
    }

    protected abstract _loadProperties(): void
    protected abstract _saveProperties(): void

    set(userProperty: UserProperty) {
        const { key } = userProperty;
        const index = this._properties.findIndex((p) => p.key == key);
    
        if (index > -1) {
          this._properties[index] = userProperty;
        } else {
          this._properties.push(userProperty);
        }
    
        this._saveProperties();
      }
    
      get(key: string): string | null {
        const property = this._properties.find((p) => p.key == key);
    
        return property ? property.value : null;
      }
}