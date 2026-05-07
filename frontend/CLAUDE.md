# Project Otaku - Frontend

## Tech Stack

- Vite for build tool
- React + TypeScript
- Yarn package manager

## Project Structure

.
├── src                         # API modules
│   ├── api                       # Handles api calls
│   ├── assets                    # Contains images, logos
│   ├── components                # Handles proxy for Jikan API
│   │   ├── brand                   # Contains branding components like Hero
│   │   ├── common                  # Contains common components like buttons, inputs
│   │   ├── features                # Contains feature related components with logic
│   │   └── layout                  # Contains layout components like Navbar, Footer, Container
│   ├── context                   # Contains app react contexts
│   ├── pages                     # Contains app pages
│   ├── types                     # Contains app pages
│   └── main.tsx                  # Entry file
└── package.json                # Used by package manager
