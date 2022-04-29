export default class Validator {
  validate(instance) {
    const checks =
      this.checkRequiredProps(instance) && this.checkTypes(instance);

    return checks;
  }

  checkRequiredProps(instance) {
    this.required.forEach((prop) => {
      if (instance[prop] === undefined) {
        throw new Error(`${prop} is required!`);
      }
    });

    return true;
  }

  checkTypes(instance) {
    Object.keys(this.types).forEach((prop) => {
      if (typeof instance[prop] !== this.types[prop]) {
        throw new Error(`Type of ${prop} must be ${this.types[prop]}`);
      }
    });

    return true;
  }
}
