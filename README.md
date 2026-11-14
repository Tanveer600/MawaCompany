# MAWA Air Cond Service website

This is a standalone website project and is separate from the NexaErp application.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Website QR code

Run `npm run generate:website-qr` to create the website QR image at
`public/mawa-website-qr.png` and its printable PDF at
`public/mawa-website-qr.pdf`. The production build generates both automatically.

## Hero price-card photos

The original first-slide MAWA photo is unchanged. The four price slides use
locally stored stock photos:

- General service: Caroline Badran, [Unsplash](https://unsplash.com/photos/modern-living-room-with-air-conditioner-and-decor-BsHycOlU6Bg)
- Chemical service: Birmingham Airduct Cleaning Services, [Unsplash](https://unsplash.com/photos/a-person-is-working-on-a-ceiling-air-conditioner-WwzK2S0h6zU)
- Overhaul service: Joel Muniz, [Unsplash](https://unsplash.com/photos/technician-servicing-outdoor-air-conditioning-unit-L5sEqpQukJI)
- Installation: NEOSiAM 18+, [Pexels](https://www.pexels.com/photo/wall-mounted-air-conditioner-in-modern-interior-38788452/)
