# VALORANT UI Clone

A web-based UI replica of the popular tactical shooter game **VALORANT**, built using React, Vite, and Tailwind CSS. This project aims to recreate the in-game menus and user interface with high fidelity, offering a fully responsive and interactive web experience.

**Live Demo:** [https://valorant-omega.vercel.app/](https://valorant-omega.vercel.app/)

*Note: Click on the screen loading image to enter the application.*

## 🌟 Features

- **High-Fidelity UI/UX:** Accurately mimics the look and feel of the original game's interface.
- **Interactive Pages:** Navigate through various sections just like in the game:
  - **Play:** Matchmaking and custom game lobbies.
  - **Premier:** Competitive tournament system interface.
  - **Collection:** View and manage weapon skins, player cards, and sprays.
  - **Agents:** Browse through all agents and their abilities.
  - **Career:** Match history and player stats layout.
  - **Store:** In-game shop interface.
  - **Battlepass:** Progression tracking layout.
- **Smooth Animations:** Powered by `framer-motion` for seamless transitions and interactions.
- **Data Management:** Utilizing `@tanstack/react-query` for efficient data fetching and state management.
- **Progressive Web App (PWA):** Installable web app capabilities using `vite-plugin-pwa`.

## 🛠️ Technologies Used

- **Core:** [React 18](https://reactjs.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** Custom state-based dynamic rendering (Single Page Application)
- **State Management & Fetching:** [TanStack React Query](https://tanstack.com/query/v5)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd VALORANT
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running Locally

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

You can preview the production build locally using:

```bash
npm run preview
```

## 🏗️ Architecture & Data Flow

### Architectural Diagram
This diagram illustrates the high-level architecture of the application, showcasing how different libraries and components interact.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ff4655', 'primaryTextColor': '#fff', 'primaryBorderColor': '#111', 'lineColor': '#888', 'secondaryColor': '#0f1923', 'tertiaryColor': '#ece8e1'}}}%%
graph TD
    User((User)) --> |Interacts with| Browser
    subgraph "VALORANT UI Clone (Client-Side)"
        Browser --> |Loads| Vite[Vite Development/Build]
        Vite --> |Serves| App[React SPA]
        App --> Router[Custom State-Based Router]
        Router --> Pages[Pages: Play, Collection, Agents, etc.]
        Pages --> Components[UI Components]
        Components -.-> |Styled by| Tailwind[Tailwind CSS]
        Components -.-> |Animated by| Framer[Framer Motion]
        Pages --> ReactQuery[TanStack React Query]
        ReactQuery -.-> |Fetches/Manages| LocalData[(Local State/Mock Data)]
    end
    style User fill:#0f1923,stroke:#ff4655,stroke-width:2px,color:#fff
    style Vite fill:#ff4655,stroke:#111,stroke-width:2px,color:#fff
    style App fill:#ece8e1,stroke:#0f1923,stroke-width:2px,color:#111
    style Router fill:#0f1923,stroke:#ff4655,stroke-width:2px,color:#fff
    style Tailwind fill:#38bdf8,stroke:#0f1923,stroke-width:2px,color:#fff
    style Framer fill:#ff0088,stroke:#0f1923,stroke-width:2px,color:#fff
    style ReactQuery fill:#ff4154,stroke:#0f1923,stroke-width:2px,color:#fff
```

### Level 3 Data Flow Diagram (DFD)
This detailed diagram breaks down the processes involved in routing, data fetching (via React Query), and UI rendering within the application.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ece8e1', 'primaryTextColor': '#111', 'primaryBorderColor': '#ff4655', 'lineColor': '#ff4655'}}}%%
flowchart TD
    User[User]:::userStyle
    subgraph "Process 1: Navigation & Routing"
        1.1(Handle Route Change):::processStyle
        1.2(Update View State):::processStyle
    end
    subgraph "Process 2: Data Management (React Query)"
        2.1(Request Agent/Weapon Data):::processStyle
        2.2(Cache Data):::processStyle
        2.3(Return Formatted Data):::processStyle
    end
    subgraph "Process 3: UI Rendering & Animation"
        3.1(Trigger Entrance Animation):::processStyle
        3.2(Render Component):::processStyle
        3.3(Handle Hover/Click Interactions):::processStyle
    end
    DataStore[(Mock Game Data)]:::storeStyle

    User --> |Clicks Navigation| 1.1
    1.1 --> |Action Payload| 1.2
    1.2 --> |Requested View| 3.2

    3.2 --> |Needs Data| 2.1
    2.1 --> |Fetch| DataStore
    DataStore --> |JSON Payload| 2.2
    2.2 --> |Cached Data| 2.3
    2.3 --> |State Update| 3.2

    3.2 --> |Component Mount| 3.1
    3.1 --> |Framer Motion Props| User
    User --> |Interact| 3.3
    3.3 --> |State Update| 3.2

    classDef userStyle fill:#0f1923,stroke:#ff4655,stroke-width:3px,color:#fff;
    classDef processStyle fill:#ece8e1,stroke:#0f1923,stroke-width:2px,color:#111;
    classDef storeStyle fill:#ff4655,stroke:#0f1923,stroke-width:2px,color:#fff;
```

### UI Flow Diagram
This state diagram represents the user journey and navigation paths available within the UI clone.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0f1923', 'primaryTextColor': '#fff', 'primaryBorderColor': '#ff4655', 'lineColor': '#ff4655'}}}%%
stateDiagram-v2
    [*] --> LoadingScreen
    LoadingScreen --> MainMenu : Click/Any Key
    MainMenu --> PlayMode : Select 'Play'
    MainMenu --> AgentsMenu : Select 'Agents'
    MainMenu --> CollectionMenu : Select 'Collection'
    MainMenu --> StoreMenu : Select 'Store'

    state PlayMode {
        [*] --> Unrated
        Unrated --> Competitive
        Competitive --> Swiftplay
        Swiftplay --> Deathmatch
    }

    state AgentsMenu {
        [*] --> AgentList
        AgentList --> AgentDetails : Click Agent Card
        AgentDetails --> AgentList : Back
    }

    state CollectionMenu {
        [*] --> Weapons
        Weapons --> PlayerCards
        PlayerCards --> Sprays
    }

    PlayMode --> MainMenu : Home Button
    AgentsMenu --> MainMenu : Home Button
    CollectionMenu --> MainMenu : Home Button
    StoreMenu --> MainMenu : Home Button
```

### Component File Structure
This tree diagram visualizes the project's file structure and how the main components and pages are linked together.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0f1923', 'primaryTextColor': '#fff', 'primaryBorderColor': '#ff4655', 'lineColor': '#ff4655'}}}%%
graph TD
    App[src/App.jsx<br>Main Application Entry & Routing]
    
    subgraph "src/Pages (Route Views)"
        PlayPage[Play_page.jsx]
        AgentPage[Agent_page.jsx]
        CollectionPage[Collection_page.jsx]
        StorePage[Store_page.jsx]
        MainPage[Main_page.jsx]
        BattlepassPage[Battlepass_page.jsx]
        CareerPage[Career_page.jsx]
        PremierPage[Premieer_page.jsx]
    end
    
    subgraph "src/components (Reusable UI)"
        Nav[Nav.jsx<br>Top Navigation]
        Menu[Mainmenu.jsx]
        PlayMenu[Play_buttons.jsx]
        PlayCard[Play_card.jsx]
        AgentBox[Agent_box.jsx]
        WeaponBox[Weapon_box.jsx]
        PlayerCard[Playercard.jsx]
    end
    
    App --> Nav
    App --> MainPage
    App --> PlayPage
    App --> AgentPage
    App --> CollectionPage
    App --> StorePage
    App --> BattlepassPage
    App --> CareerPage
    App --> PremierPage
    
    MainPage --> Menu
    PlayPage --> PlayMenu
    PlayPage --> PlayCard
    AgentPage --> AgentBox
    CollectionPage --> WeaponBox
    CollectionPage --> PlayerCard
```

## 📄 License

This project is open-source and available under the terms of the included [LICENSE](./LICENSE) file.
