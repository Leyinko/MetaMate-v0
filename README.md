# MetaMate v0

![MetaMate-Main](https://res.cloudinary.com/drft9abh4/image/upload/v1733255581/2024-12-03_20h27_24_hphbt6.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Usage](#usage)
   - [Running the Application](#running-the-application)
   - [Project Structure](#project-structure)
4. [Screenshots](#screenshots)

# MetaMate v0 Documentation

## 1. Introduction

MetaMate is a web scraping application designed to retrieve detailed information about any video game. From release dates, publisher and developer names, to Speedrun records and achievements guides, it delivers all the essential data you need in a 40s/60s time search. A great tool for quick and accurate information about any video game.

## 2. Features

- Integrated Frontend and Backend using my [Vite Full JS](https://github.com/Leyinko/vite-full-js) folder structure.
- Independent NODE Process for Scraping operation using Puppeteer.
- Global search and lock feature with Rawg.io API.
- Custom MetaDotLog feature for logs processes sharing from Backend to Frontend.
- MetaMate answer in a .json file.

## 3. Getting Started

### Prerequisites

Note: Make sure you have Node.js and NPM installed on your system before running these commands.

### Usage

To get started, follow these steps:

1. Clone the project locally.

2. Install the dependencies:

```
npm install
```

3. Run the Application:

```
npm run dev
```

This will start both the frontend and backend servers.

### Project Structure

```
├── src
│   ├── client
│   │   ├── components
│   │   ├── pages
│   │   ├── router
│   │   ├── utils
│   │   ├── style.css
│   │   └── main.js
│   └── server
│       ├── api
│       │   ├── controllers
│       │   └── routes
│       ├── mate
│       │   ├── brain.js
│       │   ├── communication.js
│       │   ├── index.js
│       │   ├── tools.js
│       │   └── mate-answer.json
│       ├── middlewares
│       ├── utils
│       └── main.js
```

## 4. Screenshots

![MetaMate-Search](https://res.cloudinary.com/drft9abh4/image/upload/v1733255890/2024-12-03_20h33_11_uobhhz.png)

![MetaMate-Result-Top](https://res.cloudinary.com/drft9abh4/image/upload/v1733256602/2024-12-03_20h48_23_r0wiri.png)

![MetaMate-Result-Bottom](https://res.cloudinary.com/drft9abh4/image/upload/v1733256585/2024-12-03_20h47_07_s4n76j.png)
