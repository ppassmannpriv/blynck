import Receiver from "../model/Dmxnet/Receiver.js";
import ReceiverValidator from "../validator/ReceiverValidator.js";

export default class ReceiverFactory {
  static create(props) {
    const instance = new Receiver(props);
    const validator = new ReceiverValidator();
    if (validator.validate(instance)) {
      return instance;
    }
    return null;
  }
}
