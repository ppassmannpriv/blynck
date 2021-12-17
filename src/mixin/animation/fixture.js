const fixtureAnimations = {
  methods: {
    changeFullColor({ r, g, b }) {
      this.setColor({ r, g, b });
    },
    setSpeed(speed) {
      this.speed = speed;
      this.flash();
    },
    flash(stop = false) {
      clearInterval(this.runningFlash.interval);
      if (stop) {
        this.setColor(this.runningFlash.color);
        return;
      }
      if (this.speed === 0) return;
      const interval = Math.ceil(30000 / this.speed);
      const vm = this;
      const rgb = {
        r: this.rColor,
        g: this.gColor,
        b: this.bColor,
      };
      const off = {
        r: 0,
        g: 0,
        b: 0,
      };
      let r = true;
      this.runningFlash.color = rgb;
      this.runningFlash.interval = setInterval(() => {
        if (r) {
          r = false;
          vm.setColor(off);
        } else {
          r = true;
          vm.setColor(rgb);
        }
      }, interval);
    },
    async runColors() {
      this.anim = true;
      const rgb = {
        r: this.rColor,
        g: this.gColor,
        b: this.bColor,
      };
      let dir = { r: -1, g: 1, b: 1 };
      for (let i = 0; i < 50; i++) {
        if (rgb.r > 229) dir.r = -1;
        if (rgb.g > 229) dir.g = -1;
        if (rgb.b > 229) dir.b = -1;
        if (rgb.r < 30) dir.r = 1;
        if (rgb.g < 30) dir.g = 1;
        if (rgb.b < 30) dir.b = 1;
        rgb.r = rgb.r + 10 * dir.r;
        rgb.b = rgb.b + 20 * dir.b;
        rgb.g = rgb.g + 17 * dir.g;
        const interval = Math.ceil(60000 / this.speed);
        await this.delay(interval);
        this.setColor(rgb);
      }
      this.anim = false;
    },
  },
};

export default { fixtureAnimations };
