# Nuxt 3 DocuSearch AI

Nuxt 3 DocuSearch AI is an innovative single-page application designed to revolutionize the way developers learn and use
Nuxt 3. By leveraging the computational power of GPT-4 and the comprehensive Nuxt 3 documentation, the application
provides context-aware answers to user queries, effectively enhancing their coding skills and experience.

The application is built using Nuxt 3 and LangChain, complemented by the aesthetic and functional capabilities of
NuxtLabs UI. The tool utilizes the Vercel-AI package, which enables edge compatibility.
To manage embeddings, the application integrates with the Pinecone Vector database, which is a powerful tool
for handling and manipulating high-dimensional vector data.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Usage](#usage)
4. [Building for Production](#building-for-production)
5. [Contribution](#contribution)
6. [License](#license))

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
