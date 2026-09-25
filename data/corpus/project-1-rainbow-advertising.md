---
source: project-1-rainbow-advertising
title: Project - Rainbow Advertising (Billboard Management Platform)
verified_commit: 83bfcce274645fcc0afb2be3ff898d856fbec5bb
---

# Rainbow Advertising - Billboard Management Platform

## What it is
Rainbow Advertising is a Django web application for managing billboard (hoarding)
inventory, client bookings, and payment records. It has public pages and a staff
management dashboard. Repository: https://github.com/AshishSingh-25/Rainbow_advertising.
These implementation details describe the checked GitHub revision; a hosted version
may differ from that source snapshot.

## Live demo
Rainbow Advertising is hosted at https://ashish25.pythonanywhere.com/.
This is the billboard management project's public site, separate from the Stella
portfolio and the Claim Resolve demo.

## Stack
The checked Rainbow Advertising code uses Python, Django, SQLite, Django templates,
Tailwind CSS loaded in the base template, and custom CSS. The database engine in
mediasite/mediasite/settings.py is django.db.backends.sqlite3. PostgreSQL appears
elsewhere in Ashish's skills, but is not the database configured for this project.

## Data model
Hoarding stores a unique name, location, rate, booking status, optional width/height,
and an uploaded image. Its area is width times height when both are supplied, and
total price is area times rate. A Client belongs to a Hoarding and has booking dates
and contact fields. A Payment belongs to a Client and records month, amount, payment
date, payment mode, paid status, and remarks. These are linked Django models, not
separate disconnected lists.

## Dashboard and access
The custom dashboard and management views require a logged-in user with is_staff.
The code does not implement multiple custom staff permission levels. Staff can
create, update, and delete hoardings, clients, and payments. The dashboard supports
name/location search, booking-status filtering, minimum/maximum area filters, and
pagination with 25 hoardings per page. Summary metrics count total, available,
booked, and pending hoardings.

## Export and limitations
The checked code does not implement CSV export. A generate_pdf view uses pdfkit and
wkhtmltopdf, but its template receives a fixed demonstration message rather than
inventory records. It also hardcodes a Windows executable path. This is a demo PDF
endpoint, not a complete reporting feature. SQLite, the Tailwind CDN, and the PDF
path are current implementation choices; production readiness is not established
by the repository alone.
