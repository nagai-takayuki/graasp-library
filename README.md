<p align="center">
  <a href="https://graasp.eu/">
    <img alt="Graasp" src="https://avatars3.githubusercontent.com/u/43075056" width="300">
  </a>
</p>

<h1 align="center">Graasp Explore</h1>

<p align="center">
  <a href="https://conventionalcommits.org">
    <img
      alt="Conventional Commits"
      src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg"
    >
  </a>
</p>

<p align="center">
  <img
    alt="Screenshot"
    src="https://raw.githubusercontent.com/graasp/graasp-explore/master/docs/assets/screenshot.png"
    width="900"
  >
</p>

## Getting Started

To run this app locally you need to have [Node](https://nodejs.org) and
[NPM](https://www.npmjs.com) installed in your operating system. We strongly recommend that you
also have [Yarn](https://yarnpkg.com/). All the commands that you will see here use `yarn`,
but they have an `npm` equivalent.

Download or clone the repository to your local machine, preferably using [Git](https://git-scm.com).

### Installation

Inside the project directory, run `yarn` to install the project dependencies.

You will also need to create a file called `.env.local` with the following contents.

```dotenv
REACT_APP_GOOGLE_ANALYTICS_ID=
```

In order to ensure that you can contribute and test, also create a file called `.env.test`.
You can leave this file empty.

### Running Locally

Navigate to the cloned or forked project directory using the command line, type `yarn start`.
The app will automatically run on `localhost:3000`. Any changes you make should be automatically
rendered in the browser.
