# Nuxt 3 DocuSearch AI

Nuxt 3 DocuSearch AI offers a streamlined interface for developers to interact with Nuxt 3 documentation more efficiently. By leveraging a fine-tuned GPT-3.5 model and integrating directly with Nuxt 3, the application provides concise, context-aware answers to user queries, enhancing developer experience and productivity. This tool combines Nuxt 3's modern web development framework with the latest advancements in AI to offer a responsive and intuitive query-response interface, simplified by the use of websockets for real-time communication. Designed with simplicity and efficiency in mind, it is an essential tool for developers looking to navigate Nuxt 3 documentation effectively.
## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Usage](#usage)
4. [Building for Production](#building-for-production)
5. [Contribution](#contribution)
6. [License](#license)

## Project Structure

The Nuxt 3 DocuSearch AI features a streamlined chat-like interface that facilitates an engaging way for developers to interact with Nuxt 3 documentation. At its core, the interface boasts a responsive top navigation bar and a dedicated input area at the bottom, encouraging users to submit their queries in a conversational manner. This design choice departs from traditional documentation interfaces, offering a more dynamic and interactive user experience. Responses, powered by a fine-tuned GPT-3.5 model, are delivered in real-time, thanks to the integration of websockets, ensuring prompt and relevant information retrieval. A side navigation menu provides quick access to additional features and settings, enhancing the application's usability. The application leverages LangChain for streamlined AI interactions, ShikiJS for syntax highlighting within returned code snippets, and Markdown-it for parsing and displaying markdown content, ensuring a rich and informative display of information.
## Setup and Installation

To set up this project locally, please follow these steps:

1. Clone this repository to your local machine.
2. Navigate into the project directory.
3. Install the necessary packages with `pnpm install`.
4. Create an `.env` file in the root directory and provide your OpenAI API key
5. Start the development server on `http://localhost:3000` with `pnpm run dev`.

Please ensure you have Node.js, npm, and Redis installed on your system before attempting to run this project.

## Usage

To use the application:

1. Navigate to `http://localhost:3000` in your web browser.
2. Input your request in the provided textarea field at the bottom of the page.
3. Press the "Send" button or hit "Enter" to submit your query.
4. The application will respond with relevant information in real-time, providing concise and context-aware answers to your queries.

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

We welcome contributions from everyone, and are grateful for every pull request! If you'd like to contribute, please
consider the following steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Write clear, concise, and descriptive commit messages.
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a pull request.
7. If your pull request addresses an issue, please include `closes #xxx` in your PR message where `xxx` is the issue
   number.

Please ensure to adhere to this project's [Code of Conduct](CODE_OF_CONDUCT.md). Ensure your contributions pass all
tests before opening a pull request. If you add or change any code, please add tests to accompany your changes. For more
details, check our [Contributing Guidelines](CONTRIBUTING.md).

## Code of Conduct

We aim to foster an inclusive and respectful community for everyone involved. All contributors and participants agree to
adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please make sure to read it before participating.

## License

This project is licensed under the MIT License. The license allows others to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, provided that they include the original copyright notice,
this permission notice, and disclaimers of warranty. See the [LICENSE](LICENSE) file for full details.
