# build step

FROM node:16.13 as build
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# run step

FROM node:16.13
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./yarn.lock ./
RUN yarn install --prod
COPY --from=build /usr/src/app/dist ./dist
CMD yarn start