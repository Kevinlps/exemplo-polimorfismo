import { appendFileSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import UserProperty from "../entities/UserProperty";
import UserPropertyDAO from "./UserPropertyDAO";

export default class UserPropertyDefaultDAO extends UserPropertyDAO {
  constructor() {
    super(join(__dirname, "..", "..", "data", "user.properties"));
  }

  protected _loadProperties() {
    this._properties = [];
    const content = readFileSync(this._userPropertyFilePath, "utf-8");
    const lines = content.split("\n");
    lines.forEach((l) => {
      // ["email", "sidney@email.com"]
      if (l && l.includes("=")) {
        const aux = l.split("=");
        const property: UserProperty = {
          key: aux[0],
          value: aux[1],
        };

        this._properties.push(property);
      }
    });
  }

  protected _saveProperties() {
    // Reseta o arquivo
    writeFileSync(this._userPropertyFilePath, "");

    this._properties.forEach((p) => {
      const line = `${p.key}=${p.value}\n`;
      appendFileSync(this._userPropertyFilePath, line);
    });
  }
}
