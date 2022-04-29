import Validator from "./Validator.js";

export default class ReceiverValidator extends Validator {
  constructor() {
    super();
    this.required = ["subnet", "universe", "net", "subUniverse"];
    this.types = {
      subnet: "number",
      universe: "number",
      net: "number",
      subUniverse: "number",
    };
  }
}
