import { appendFileSync } from "fs";
import { join } from "path";
import UserProperty from "../entities/userProperty";

export default class UserPropertyDao {
  private _userPropertyFilePath: string;

  constructor() {
    this._userPropertyFilePath = join(__dirname,"..", "..", "data", "user.properties");
  }

  add(UserProperty: UserProperty) {
    const { key, value } = UserProperty;
    const newProperty = `${key}=${value}\n`;

    appendFileSync(this._userPropertyFilePath, newProperty);
  }
}
