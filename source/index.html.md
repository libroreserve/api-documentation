---
title: Libro API Reference

language_tabs:
  - shell: cURL

toc_footers:
  - "To get an API access, please contact:"
  - <a href="mailto:admin@libroreserve.com">admin@libroreserve.com</a>

includes:
  - introduction
  - authentication
  - restaurants/_intro.md
  - restaurants/_get.md
  - restaurants/_list.md
  - restaurants/_availabilities.md
  - bookings/_intro.md
  - bookings/_get.md
  - bookings/_list.md
  - bookings/_create.md
  - bookings/_update.md
  - bookings/_cancel.md
  - bookings/_reschedule.md
  - people/_intro.md
  - people/_get.md
  - people/_update.md

search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for the Libro API
---

# Libro API

Welcome to the **Libro API** — your comprehensive toolkit for integrating restaurant reservation management into your applications. 

This documentation will guide you through the process of integrating with our platform, from authentication to making your first API call and implementing advanced features.

## Base URLs

| Environment | Base URL | Purpose |
|------------|----------|----------|
| Production | `https://api.libroreserve.com` | Live system integration |
| Staging | `https://api.staging.libro.app` | Testing and development |

## API Overview

The Libro API follows REST principles and provides JSON:API-compliant responses. Here's a quick overview of the main resources:

| Resource | Description |
|----------|------------|
| [Restaurants](#restaurants) | Restaurant profiles, availability, and settings |
| [Bookings](#bookings) | Reservation creation and management |
