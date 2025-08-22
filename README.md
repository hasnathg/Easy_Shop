# Easy Shop

A simple Next.js 15 (App Router) app with public & protected routes, NextAuth (credentials), and MongoDB Atlas.

## Tech
- Next.js 15 (App Router)
- Tailwind CSS v4
- NextAuth (credentials)
- MongoDB Atlas 

## Live
- Live: https://easy-shop-tan.vercel.app/


## Setup

```bash
git clone <repo>
cd easy_shop
npm install

Routes

/ – Landing (Navbar, Hero, Highlights, Footer)

/login – Credentials login (NextAuth)

/products – Product list (DB)

/products/[id] – Product details (DB)

/dashboard – Protected dashboard home

/dashboard/add-product – Protected add product form

/api/products – GET (list), POST (create; auth required)

/api/products/[id] – GET (single)

Notes

Credentials auth stores users in users collection with bcrypt-hashed passwords.

Products are saved to products collection with optional imageUrl.
