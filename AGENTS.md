# gopallin.github.io

This is the source code for my personal blog, built using the static site generator [Hugo](https://gohugo.io/) and themed with a clean, GitHub-style layout. The site is automatically deployed to GitHub Pages.

## ✨ Features

- **Static Site:** Fast, secure, and reliable.
- **Hugo Powered:** Simple and powerful content management with Markdown.
- **Custom Theme:** A clean, responsive theme resembling the GitHub interface.
- **Automated Deployment:** Continuous deployment to GitHub Pages using GitHub Actions.

## 🚀 Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/): Make sure you have the Hugo binary installed on your machine.
- [Git](https://git-scm.com/): For cloning the repository.

### Local Development

1.  **Clone the repository:**
    This project uses a Git submodule for the theme, so you must clone it recursively.
    ```bash
    git clone --recurse-submodules https://github.com/gopallin/gopallin.github.io.git
    cd gopallin.github.io
    ```
    If you have already cloned the repository without the submodules, you can initialize them with:
    ```bash
    git submodule update --init --recursive
    ```

2.  **Run the Hugo server:**
    Start the local development server to see a live preview of your changes.
    ```bash
    hugo server -D
    ```
    The `-D` flag builds and serves draft posts as well. Your site will be available at `http://localhost:1313`.

## ✍️ Creating a New Post

1.  **Create a new Markdown file:**
    You can create a new post using the `hugo new` command, which will generate a file with the correct front matter.
    ```bash
    hugo new post/my-new-post.md
    ```

2.  **Add content:**
    Open the newly created file in `content/post/my-new-post.md` and start writing. The front matter at the top of the file allows you to configure the post's title, date, and tags.

    Example:
    ```toml
    ---
    title: "My New Post"
    date: 2025-12-18T10:00:00+00:00
    draft: false
    tags: ["tech", "new"]
    ---

    This is the content of my new post.
    ```

## 📦 Deployment

The blog is automatically deployed to GitHub Pages whenever new changes are pushed to the `main` branch. The process is handled by the GitHub Actions workflow defined in `.github/workflows/hugo.yml`. No manual deployment steps are needed.

---

# Gemini Project Knowledge Base

**Important Directive for AI Agents:**
Always read this `GEMINI.md` file thoroughly before initiating any development tasks or making modifications to the project. This document serves as the primary source of truth for project structure, development workflows, and deployment procedures. Furthermore, when any new "know-how," critical information, or changes in development practices emerge, ensure this `GEMINI.md` file is updated accordingly to maintain its accuracy and utility for future AI interactions.

## 1. Project Overview

- **Project Type**: Static Blog Website
- **Static Site Generator**: [Hugo](https://gohugo.io/)
- **Hosting**: GitHub Pages
- **Theme**: `github-style` (located in `themes/github-style` as a Git submodule)
- **Primary Language**: Markdown for content, TOML for configuration.
- **Continuous Deployment**: The site is built and deployed automatically via a GitHub Actions workflow.

## 2. File and Directory Structure

- **`/config.toml`**: The main Hugo configuration file. It contains settings for the site title, base URL, theme, menus, and other parameters.
- **`/content/`**: Contains all Markdown content for the site.
- **`/content/post/`**: The directory for all blog posts. Each post is a separate `.md` file.
- **`/static/`**: Holds static assets like images, CSS, and JavaScript files that are copied directly to the output directory.
- **`/themes/github-style/`**: The theme directory, included as a Git submodule. It contains all layout templates, partials, and theme-specific static assets.
- **`/.github/workflows/hugo.yml`**: The GitHub Actions workflow definition for CI/CD.
- **`/public/`**: The output directory where the generated static site is stored. This directory is created by the `hugo` command and is the artifact deployed to GitHub Pages. It is listed in `.gitignore`.

<h2> 3. Local Development Workflow</h2>

<h3> 3.1. Initial Setup</h3>

1.  **Clone the repository with submodules**:
    The theme is a submodule, so it's critical to clone recursively.
    ```bash
    git clone --recurse-submodules https://github.com/gopallin/gopallin.github.io.git
    cd gopallin.github.io
    ```
2.  **Initialize submodules (if not cloned recursively)**:
    If the repository was cloned without the `--recurse-submodules` flag, run this command from the project root:
    ```bash
    git submodule update --init --recursive
    ```

<h3> 3.2. Running the Local Server</h3>

- To preview the site, including draft posts, run:
  ```bash
  hugo server -D
  ```
- The local server will be accessible at `http://localhost:1313`.

<h2> 4. Content Creation</h2>

<h3> 4.1. Creating a New Post</h3>

- A new post can be scaffolded using the Hugo CLI:
  ```bash
  hugo new post/your-post-title.md
  ```
- This command uses the archetype defined at `themes/github-style/archetypes/default.md` to create a new Markdown file at `content/post/your-post-title.md` with pre-populated front matter.

<h3> 4.2. Front Matter</h3>

- Each post begins with a TOML block for metadata, enclosed by `---`.
- **Key Fields**:
  - `title` (string): The title of the post.
  - `date` (datetime): The publication date and time (e.g., `2025-12-18T16:04:15+08:00`).
  - `draft` (boolean): If `true`, the post will not be included in the production build. Set to `false` to publish.
  - `tags` (array of strings): A list of tags for classifying the post.

- **Example Front Matter**:
  ```toml
  ---
  title: "My Awesome Post"
  date: 2025-12-18T16:04:15+08:00
  draft: false
  tags: ["hugo", "development", "guide"]
  ---

  Your post content starts here.
  ```

<h2> 5. Build and Deployment</h2>

<h3> 5.1. Build Process</h3>

- The site is built using the `hugo` command. The workflow uses the `--minify` flag to optimize the output.
  ```bash
  hugo --minify
  ```
- This command generates the complete static site in the `/public` directory.

<h3> 5.2. Automated Deployment Workflow</h3>

- **Workflow File**: `.github/workflows/hugo.yml`
- **Trigger**: A `push` event to the `main` branch.
- **Key Steps**:
  1.  **Checkout**: The `actions/checkout@v4` action checks out the repository.
      - `submodules: true` ensures the theme is fetched.
      - `fetch-depth: 0` fetches all Git history, which is necessary for features like `.Lastmod`.
  2.  **Setup Hugo**: The `peaceiris/actions-hugo@v2` action installs the latest version of Hugo.
  3.  **Build**: The `hugo --minify` command is run to build the site.
  4.  **Add .nojekyll**: A `.nojekyll` file is created in the `public` directory to signal to GitHub Pages that it should not run the site through Jekyll.
  5.  **Deploy**: The `peaceiris/actions-gh-pages@v3` action deploys the contents of the `public` directory to the `gh-pages` branch, making it live.
      - This step only runs on pushes to the `main` branch.
      - It uses the `GITHUB_TOKEN` secret, which is automatically provided by GitHub Actions.

---

## Shortcode Behavior Notes (2026-03-03)

- File: `layouts/shortcodes/nvim_series.html`
- Updated behavior:
  - Series items are no longer hardcoded text labels.
  - Each item now resolves the target page with `site.GetPage` and renders:
    - `Title`
    - `Summary` (when available)
  - Current page marker remains based on `.Page.File.Path`.
- Post list currently includes:
  - `post/nvim_overview`
  - `post/nvim_lazy`
  - `post/nvim_style`
  - `post/nvim_terminal`
  - `post/nvim_wrap`

## Update 2026-03-03 (nvim_series shortcode)
- `layouts/shortcodes/nvim_series.html` now renders each item from target post front matter.
- Display format: `<Title> - <Summary>` (summary only when available).
- Uses `site.GetPage` + `.RelPermalink` and keeps current-page marker via `.File.Path`.
- nvim_series shortcode note: use `.Params.summary` instead of `.Summary` to avoid recursive summary rendering when posts include the same shortcode.
