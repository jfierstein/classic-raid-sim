FROM node:10.13.0-alpine
ARG APP_VERSION
ARG BUILD_TIMESTAMP

COPY . .

RUN yarn install

RUN sed -i "s|::appversion|$APP_VERSION|g" /server/buildinfo.js
RUN sed -i "s|::buildtimestamp|$BUILD_TIMESTAMP|g" /server/buildinfo.js

RUN NODE_ENV=production yarn build

CMD yarn server-start