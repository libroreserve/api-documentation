# LibroReserve API Documentation

## Quick Start

To start the development server locally:

```bash
bundle exec middleman server
```

The site will be available at http://localhost:4567

## File Structure

- Pages are written in Markdown in the `source/includes/` directory
- A `template` directory is available in `source/includes/` to facilitate the creation of new sections. Copy/paste this directory to create a new resource, then add the files to the includes section in index.md.
- Resource attributes are stored in the `source/data/attributes.json` file

## Deployment

To generate static files:

```bash
bundle exec middleman build
```

Then copy the generated files to the `docs` folder for GitHub Pages deployment:

```bash
cp -r build/* docs
```

The documentation will be available at https://libroreserve.github.io/api-documentation/
