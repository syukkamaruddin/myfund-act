FROM node:alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm add glob rimraf
RUN npm install --only=development
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm add glob rimraf
RUN npm install --only=production
COPY . .
RUN npx prisma generate
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]