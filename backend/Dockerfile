FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

USER node

CMD ["npm", "start"]
