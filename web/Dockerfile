FROM node:20-alpine AS builder

WORKDIR /app

RUN npm cache clean --force

COPY package.json package-lock.json ./
RUN npm install --force

# Set the memory limit for Node.js
ENV NODE_OPTIONS="--max-old-space-size=8000"

ENV PATH="./node_modules/.bin:$PATH"
COPY . ./

# Build the application
# RUN npm run build --prod
RUN ng build --configuration=production

# Nginx
FROM nginx:alpine

COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/web/browser/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]