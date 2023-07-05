# Nuxt 3 DocuSearch AI

This project is an innovative single-page application that harnesses the capabilities of GPT-4 and the Nuxt 3
documentation to assist developers in enhancing their coding skills. The application is built with Nuxt 3, Langchain,
NuxtLabs UI, and uses Upstash for Redis.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Usage](#usage)
4. [Contribution](#contribution)
5. [Future Plans](#future-plans)

## Project Structure

The application consists of a single page with a top navigation bar. This bar houses a search input that opens a modal
when clicked. The modal, though simple in its structure, is where the magic happens. Users can input their query related
to Nuxt 3, which is then processed using the power of GPT-4. The answer streams back, providing an intuitive learning
experience for the users.

## Setup and Installation

To set up this project locally, please follow these steps:

1. Clone this repository to your local machine.
2. Navigate into the project directory.
3. Install the necessary packages with `pnpm install`.
4. Create an `.env` file in the root directory and provide your OpenAI API key and your Redis instance details.
5. Start the development server on `http://localhost:3000` with `pnpm run dev`.

Please ensure you have Node.js, npm, and Redis installed on your system before attempting to run this project.

## Usage

To use the application:

1. Navigate to `http://localhost:3000` in your web browser.
2. Click on the search bar in the navigation.
3. A modal will open, input your question or query related to Nuxt 3 in the provided field.
4. The application will process the query using GPT-4, and you will see the answer streaming back.

## Building for Production

If you want to build the application for production, use the following command:

```bash
pnpm run build
```

To preview the production build locally:

```bash
pnpm run preview
```

## Contribution

If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

Please ensure to adhere to this project's code of conduct and ensure your contributions pass all tests before opening a
pull request.

## Future Plans

(Discuss any future improvements or features you plan to implement.)

## License

This project is licensed under the [MIT License](LICENSE).
