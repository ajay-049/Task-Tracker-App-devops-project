# Sirf Nginx base image chahiye (No Node.js needed)
FROM nginx:alpine

# Aapka saara HTML/JS code Nginx ke public folder mein copy karein
COPY . /usr/share/nginx/html

# Custom Nginx config file copy karein
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Nginx start karein
CMD ["nginx", "-g", "daemon off;"]