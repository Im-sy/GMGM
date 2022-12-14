# Frontend

### 프론트 빌드하기

```
npm install --force

npm run start || npm run build
```

### package.json

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@craco/craco": "^6.4.5",
    "@fortawesome/fontawesome-svg-core": "^6.2.0",
    "@fortawesome/free-solid-svg-icons": "^6.2.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.11.57",
    "@types/react": "^18.0.18",
    "@types/react-dom": "^18.0.6",
    "@types/redux-persist": "^4.3.1",
    "flowbite": "^1.5.3",
    "flowbite-react": "^0.1.11",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-loader-spinner": "^5.3.4",
    "react-scripts": "5.0.1",
    "react-slick": "^0.29.0",
    "react-toastify": "^9.0.8",
    "redux-persist": "^6.0.0",
    "slick-carousel": "^1.8.1",
    "typescript": "^4.8.2",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "npm run watch:css && craco start",
    "build": "npm run build:css && craco build",
    "test": "craco test",
    "eject": "react-scripts eject",
    "build:css": "postcss src/index.css",
    "watch:css": "postcss src/index.css"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@reduxjs/toolkit": "^1.8.5",
    "@types/axios": "^0.14.0",
    "@types/react-slick": "^0.23.10",
    "@typescript-eslint/eslint-plugin": "^5.36.1",
    "@typescript-eslint/parser": "^5.36.1",
    "autoprefixer": "^10.4.10",
    "axios": "^0.27.2",
    "chart.js": "^3.9.1",
    "craco-alias": "^3.0.1",
    "eslint": "^8.23.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.31.6",
    "postcss": "^8.4.16",
    "postcss-cli": "^10.0.0",
    "prettier": "^2.7.1",
    "prettier-plugin-tailwindcss": "^0.1.13",
    "react-chartjs-2": "^4.3.1",
    "react-redux": "^8.0.2",
    "react-router-dom": "^6.3.0",
    "redux": "^4.2.0",
    "sass": "^1.54.9",
    "tailwindcss": "^3.1.8",
    "v6": "^0.0.0"
  }
}
```
