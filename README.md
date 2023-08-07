# Nuxt 3 DocuSearch AI

Nuxt 3 DocuSearch AI is a cutting-edge interface aiming to transform how developers interact with and understand Nuxt 3. Harnessing GPT-4's computational capabilities and integrating with Nuxt 3's exhaustive documentation, this application furnishes users with context-driven answers, amplifying their coding acumen and user experience.

Crafted with Nuxt 3 and LangChain, the application's visual and functional charm is further polished by NuxtLabs UI. For ensuring edge compatibility, the Vercel-AI package is utilized. The application is also intricately woven with the Pinecone Vector database, a robust platform adept at managing high-dimensional vector data.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Usage](#usage)
4. [Building for Production](#building-for-production)
5. [Contribution](#contribution)
6. [License](#license)

## Project Structure

The platform's architecture is built around a chat-styled interface. The main page incorporates a top navigation bar, and an input field located at the bottom enables users to type in their Nuxt 3 queries. This structure, unlike traditional modal-based designs, mimics a chat environment for an intuitive user experience. As users input their questions, GPT-4 processes them, channeling back comprehensive answers. Additionally, a side navigation menu on the left caters to settings and other functionalities. To augment the display of returned code snippets, the application is integrated with md-editor-v3, offering syntax highlighting along with copy-paste capabilities.

## Setup and Installation

To set up this project locally, please follow these steps:

1. Clone this repository to your local machine.
2. Navigate into the project directory.
3. Install the necessary packages with `pnpm install`.
4. Create an `.env` file in the root directory and provide your OpenAI API key and your Pinecone Database Details
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
