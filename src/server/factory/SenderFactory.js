import Factory from "./Factory.js";
import Sender from "../model/Dmxnet/Sender.js";
import SenderValidator from "../validator/SenderValidator.js";

export default class SenderFactory extends Factory {
  static create(props) {
    return super.create(props, Sender, SenderValidator);
  }
}
