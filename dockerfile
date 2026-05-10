# Stage 1: Build the project
FROM node:alpine AS builder
WORKDIR /bazaar
COPY package*.json ./
RUN npm install
COPY . .
RUN npx ng build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the compiled files from the builder stage to Nginx
# Check your dist/ folder name - it might be /bazaar/dist/bazaar/browser
COPY --from=builder /bazaar/dist/bazaar/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]