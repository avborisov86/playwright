FROM mcr.microsoft.com/playwright:v1.34.3-focal
WORKDIR /app
COPY . /app
RUN npm install
RUN npx playwright install --with-deps
CMD ["npm", "run", "test"]
