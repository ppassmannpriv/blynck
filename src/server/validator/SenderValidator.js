import Validator from "./Validator.js";

export default class SenderValidator extends Validator {
  constructor() {
    super();
    this.required = ["ip", "subnet", "universe", "net"];
    this.types = {
      ip: "string",
      subnet: "number",
      universe: "number",
      net: "number",
    };
  }
}
