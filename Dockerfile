FROM node:18-slim

# Install required dependencies for SecuGen SDK
RUN apt-get update && apt-get install -y \
    build-essential \
    libusb-1.0-0 \
    libusb-1.0-0-dev \
    udev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create SDK directory and copy libraries
RUN mkdir -p /usr/local/lib/secugen

# Copy SDK files
COPY sdk/libs/*.so /usr/local/lib/secugen/

# Create symlinks
RUN ln -s /usr/local/lib/secugen/libsgfplib.so /usr/local/lib/
RUN ln -s /usr/local/lib/secugen/libsgfpamx.so /usr/local/lib/
RUN ln -s /usr/local/lib/secugen/libsgfdu06.so /usr/local/lib/

# Update library cache
RUN ldconfig

# Add udev rules for SecuGen device
RUN echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="1162", ATTRS{idProduct}=="1000", MODE="0666"' > /etc/udev/rules.d/99-secugen.rules

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 