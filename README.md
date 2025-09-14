# Airbnb Clone - Microservices

A microservices-based Airbnb clone built with Node.js, TypeScript, and Docker.

![System Architecture](https://media.licdn.com/dms/image/v2/D4D22AQGJkEjR38UfTg/feedshare-shrink_2048_1536/B4DZh4oMwuGQAo-/0/1754370462905?e=1759363200&v=beta&t=bYzFxi0ax8fOZAbMix_Q5mXSmXPMkWqcDkplG7B3y3A)

## Services

- **HotelServices** - Hotel listings and management (Sequelize + MySQL)
- **BookingService** - Booking operations (Prisma + PostgreSQL)
- **NotificationService** - Email notifications (Redis + Bull Queue)

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Databases:** MySQL, PostgreSQL, Redis
- **Tools:** Docker, ESLint, Prettier, Husky
- **Package Manager:** pnpm

## Quick Start

```bash
# Clone and setup
git clone https://github.com/ayushrajput8021/Airbnb.git
cd Airbnb
npm install

# Start all services
docker compose up -d
```

## Scripts

- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm test` - Run tests

## Contributing

Code is automatically linted and formatted on commit via Husky hooks.
