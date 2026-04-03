# Project Otaku

## Overview

ProjectOtaku is a web-based application designed to help anime enthusiasts manage their watch lists using an intuitive, visual drag-and-drop interface. By leveraging the Jikan API, users can search for titles and organize them into custom progress columns, moving away from traditional static lists toward a more interactive experience.


## User Stories

- **Account Management**: As a user, I want to create an account so that my watch list is saved and accessible from any device.
- **Search**: As a user, I want to search for anime so I can add them to my kanban list column.
- **Management**: As a user, I want to drag an anime card from "Watch", "Watching", or "Watched" to update my progress visually.
- **Detail View**: As a user, I want to click a card and it should route me to the MyAnimeList (original source) url which is returned from Jikan API.


## Functional Requirements

### Authentication & Profile

- **Registration/Login**: JWT-based authentication.
- **User Persistence**: Each user has a unique ID linked to their specific Kanban board state.

### Kanban Board

- **Columns**: Must include at least 3 columns: **Watch**, **Watching**, and **Watched**.
- **Drang and Drop**: Users can move the cards between columns.
- **Persistence**: Every "drop" event must trigger a background API call to the backend to update the `status` of that anime in our database.

### Data Integration

- **Search Endpoint***: Use `/v4/anime?q={query}` to populate search results.
- **Caching**: To stay within Jikan's rate limits and improve performance, your FastAPI backend should cache frequently searched titles.


## Data Model

Even though Jikan API provides the anime data, our database needs to track the **User's relationship** to that data.

|Field|Type|Description|
| - | - | - |
|user_id|UUID|Foreign key to User table.|
|mal_id|Integer|The ID from Jikan/MyAnimeList to reference data.|
|status|String|'watch', 'watching', 'watched'|
|added_at|DateTime|When the anime was added to the list.|
|position|Float|Position of the anime in the list.|


## Tech Stack

- **Frontend**: Use React and Vite.
- **Backend**: FastAPI + Python for RESTful API.
- **Database**: PostgreSQL


## Technical Constraints

- **Rate Limiting**: Jikan has a rate limit (2 request per second). Implement a "Debounce" feature or suggest how to tackle rate limit.
- **MobileResponsiveness**: The kanban board must shift to a single-column accordion or "swipe" view on mobile screens.
- **Empty States**: Clear UI instructions when a user has no anime in their list yet.


## Additional Requests

- **Landing Page**: Create a landing page so that when new user's visit our website. They will be presented on what it is all about and create interest.
