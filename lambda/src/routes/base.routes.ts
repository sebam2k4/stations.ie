import express from 'express';

export abstract class CommonRoutesConfig {
  constructor(public router: express.Router, public name: string) {
    this.configureRoutes();
  }

  public getName() {
    return this.name;
  }

  abstract configureRoutes(): express.Router;
}
