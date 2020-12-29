import express from 'express';
import serverless from 'serverless-http';
import { Context, APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

import { expressApp } from './common/app';

let cachedHandler: serverless.Handler;

async function bootstrap(app: express.Application, event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult | APIGatewayProxyStructuredResultV2> {
  try {
    if (!cachedHandler) {
      console.log('NEW HANDLER');
      cachedHandler = serverless(app);
    }
  } catch (err) {
    console.error('Error bootstraping', err)
    throw err;
  }
  console.log('CACHED HANDLER');

  return cachedHandler(event, context);
}

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult | APIGatewayProxyStructuredResultV2> {
  return bootstrap(expressApp, event, context);
}
