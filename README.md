# Link Manager

## Introduction
The Link Manager is a web application that helps you manage your links and content. It allows you to scrape content from external websites, summarize it using a Google Generative AI, and manage your links and their associated metadata.

![link-summarizer](https://github.com/user-attachments/assets/79e7f128-af83-409a-9f4b-702f26ae1afe)


## Features
- **Link Management**: The application allows you to create, update, and delete links. Each link has associated metadata such as title, URL, content summary, and creation/update timestamps.
- **Content Scraping**: The application uses a web scraper (powered by Cheerio) to fetch and extract the main content from external websites.
- **Content Summarization**: The application uses the Google Generative AI to generate a concise summary of the scraped content.
- **User Settings**: Users can customize the application's behavior, such as the API key for the Google Generative AI.

## Architecture
The Link Manager application is built using the following components:

### UI Components
The UI Components are responsible for rendering the user interface and handling user interactions. They include the following components:
- `LandingPage`: The landing page of the application.
- `DashboardPage`: The main page where users can manage their links.
- `SettingsPage`: The page where users can configure their settings.
- `Layout`: The layout component that wraps the main pages.

### Global State Management (zustand)
The Global State Management component is responsible for managing the application's state, including links, content summaries, and user settings. It uses the `zustand` library to manage the state.

### Scraper (cheerio)
The Scraper component is responsible for fetching and extracting the main content from external websites. It uses the `cheerio` library to parse the HTML and extract the relevant content.

### AI Summarizer (Google Generative AI)
The AI Summarizer component is responsible for generating a concise summary of the scraped content. It uses the Google Generative AI API to generate the summary.

### Utilities
The Utilities component includes various helper functions and services, such as the `UserSettings` service, which manages the user's API key for the Google Generative AI.

## Installation and Setup
To run the Link Manager application, follow these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/link-manager.git
```

2. Install the dependencies:
```
cd link-manager
npm install
```

3. Set up the Google Generative AI API key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
   - Enable the Generative AI API for your project.
   - Create a new API key and copy it.
   - In the `SettingsPage` component, update the `apiKey` in the `UserSettings` store with the API key you just generated.

4. Start the development server:
```
npm run dev
```

The application should now be running at `http://localhost:3000`.

## Usage
1. On the Landing Page, click on the "Get Started" button to navigate to the Dashboard.
2. On the Dashboard, you can create new links by clicking the "Add Link" button.
3. For each link, you can view the scraped content and the generated summary.
4. You can also update or delete existing links.
5. In the Settings page, you can update your Google Generative AI API key.

## Contributing
If you would like to contribute to the Link Manager project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request from your fork to the main repository.

## License
This project is licensed under the [MIT License](LICENSE).
