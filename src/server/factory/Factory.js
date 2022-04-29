export default class Factory {
  static create(props, modelClass, validatorClass) {
    const instance = new modelClass(props);
    const validator = new validatorClass();
    if (validator.validate(instance)) {
      return instance;
    }
    return null;
  }
}
