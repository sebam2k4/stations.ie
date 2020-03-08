'use strict';

module.exports = class ApiErrorResponse {
  constructor({statusCode, statusText, details}) {
    this.statusCode = statusCode || 500;
    this.statusText = statusText;
    this.details = details;
  } 
};
