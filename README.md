# NaiRobi Ecommerce

[NaiRobi](https://nairobi1.vercel.app/) is a web application for selling custom-made furniture.

Build with a bunch of technologies, but to name a few:

- [Next.js](https://nextjs.org/) 
- [Stripe Gateway](https://stripe.com/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth](https://next-auth.js.org/)
- [Styled-jsx](https://nextjs.org/blog/styling-next-with-styled-jsx)

## Set Up 
Install npm packages
```bash
npm install 
```
Register for  [Stripe gateway](https://stripe.com) and obtain your public and private keys.

Create a .env file in the root and paste your stripe key with the name STRIPE_PUBLIC_KEY: and STRIPE_SECRET_KEY:

## Available Scripts
In the project directory, you can run:

## npm run dev
```python
npm run dev
```
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any errors in the console.

## npm run build
```python
npm run build
```
Builds the app for production to the .next folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## npm run start
```python
npm run start
```
Starts the application in production mode. The application should be compiled with `next build` first.

See the section in Next docs about deployment for more information.

## Using CSS
To enable high reusability and clean CSS files, the styled component was utilized.
```jsx
const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  }
```
## Build & Deploy to Vercel
```python
npm run build
```
Vercel offers instant and automatic deployment when code is pushed to Git repositories.
Import the project to vercel to activate automatic deployment
## Contributing

Pull requests are welcome. For significant changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
