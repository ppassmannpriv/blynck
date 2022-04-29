import Factory from "./Factory.js";
import Receiver from "../model/Dmxnet/Receiver.js";
import ReceiverValidator from "../validator/ReceiverValidator.js";

export default class ReceiverFactory extends Factory {
  static create(props) {
    return super.create(props, Receiver, ReceiverValidator);
  }
}
