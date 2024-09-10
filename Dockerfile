FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* tailwind.config.js ./

RUN pnpm i

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
