import Fixture from "../Fixture.js";

export default class LaserWorldCS1000RGBMk2 extends Fixture {
  constructor({ universe, startChannel }) {
    const channels = 11;
    super({ universe, startChannel, channels });
    this.isRgb = true;
    this.isLaser = true;
    this.type = "LaserWorldCS1000RGBMk2";
  }
}
