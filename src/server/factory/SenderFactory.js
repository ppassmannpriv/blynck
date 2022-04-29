import Sender from "../model/Dmxnet/Sender.js";
import SenderValidator from "../validator/SenderValidator.js";

export default class SenderFactory {
  static create(props) {
    const instance = new Sender(props);
    const validator = new SenderValidator();
    if (validator.validate(instance)) {
      return instance;
    }
    return null;
  }
}
