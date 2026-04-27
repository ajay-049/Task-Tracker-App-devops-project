# --------- STAGE 1: Build Stage ---------
# Yeh stage aapke code ko download karega aur production-ready banayega
FROM node:18-alpine as build

# Container ke andar folder set karein
WORKDIR /app

# Dependencies install karein
COPY package*.json ./
RUN npm install

# Saara code copy karein aur build chalayein
COPY . .
RUN npm run build  
# (Note: Agar aap Vite use kar rahe hain, toh build folder ka naam 'dist' hota hai. React CRA mein 'build' hota hai.)

# --------- STAGE 2: Production Stage ---------
# Yeh stage Nginx web server banayega aur aapki website serve karega
FROM nginx:alpine

# Stage 1 se banaya hua final code Nginx ke public folder mein daalein
# Agar Vite hai toh /app/dist likhein, agar React hai toh /app/build likhein
COPY --from=build /app/dist /usr/share/nginx/html 

# Aapki custom Nginx config file copy karein
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Nginx start karein
CMD ["nginx", "-g", "daemon off;"]
