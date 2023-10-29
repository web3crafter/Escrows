# W3Crafter Escrows - Escrow DApp

W3Crafter Escrows is an DApp created as part of the Alchemy University course.
With Web3Crafter Escrows, Users have the power to create, and manage your very own escrow contracts. Deployed on the Sepolia test network, tailored to their unique needs.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Hardhat](https://hardhat.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Viem](https://viem.sh/)
- [Wagmi](https://wagmi.sh/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Zod](https://zod.dev/)

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/YourUserName/W3C-Escrows`

2. `cd` into the `backend` directory and run `npm install`

3. Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/artifacts` folder, in the `frontend` which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

4. `cd` into the `frontend` directory and run `npm install`

5. Set up environment variables: `NEXT_PUBLIC_RPC_URL=YOUR_API_KEY`, `NEXT_PUBLIC_SEPOLIA_API_KEY` & `NEXT_PUBLIC_WC_PROJECT_ID`.

6. To get access to KV Database you need to `deploy` the project on `Vercel`, create a `db` and `connect` it to your `project` on Vercel.

7. Run the development server: `npm run dev`

8. Open your browser and go to: `http://localhost:3000`

## License

[W3Crafter Escrows](https://github.com/web3crafter/W3C-Escrows) is open-source and released under the [MIT License].
