# Echoes in Orbit 🌌

> Cast your thoughts into the cosmos. A spherical planetarium where confessions become stars.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-blue)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**Echoes in Orbit** is an immersive 3D web experience that transforms confessions into stars on a cosmic dome. Users can post anonymous or authenticated messages across five emotional categories, each mapped to a unique zone in a spherical planetarium.

### ✨ Key Features

- **🌐 Spherical Planetarium** - Navigate a 3D cosmic dome with stars positioned using Fibonacci sphere distribution
- **💫 Five Galaxies** - Hope, Regret, Advice, Dream, Gratitude - each with dedicated zones
- **🔒 Privacy Options** - Post anonymously or with authentication
- **⏰ Time-Locked Messages** - Schedule confessions for future delivery
- **⭐ Social Interactions** - Like and comment on echoes
- **🎮 Intuitive Controls** - Touch, mouse, and keyboard navigation

## 🚀 Live Demo

Visit the live application: [echoes-in-orbit.vercel.app](https://your-deployment-url.vercel.app)

## 📸 Screenshots

![Home Page](docs/screenshots/home.png)
![Planetarium View](docs/screenshots/planetarium.png)
![Documentation](docs/screenshots/docs.png)

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **3D Rendering**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Deployment**: [Vercel](https://vercel.com/)

## 📚 Documentation

**For detailed technical documentation, architecture, and implementation details, see the [`docs/`](./docs) folder:**

- **[Technical Architecture](./docs/ARCHITECTURE.md)** - System design, algorithms, and data flow
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Step-by-step deployment instructions
- **[Redeploy Instructions](./docs/REDEPLOY.md)** - How to redeploy on Vercel
- **[API Reference](./docs/API.md)** - API endpoints and usage

### Quick Links

- [Spherical Distribution Algorithm](./docs/ARCHITECTURE.md#spherical-distribution)
- [Camera System](./docs/ARCHITECTURE.md#camera-system)
- [Challenges & Solutions](./docs/ARCHITECTURE.md#challenges-solutions)
- [Database Schema](./docs/ARCHITECTURE.md#database-schema)

## 🏃 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Clerk account (optional, for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sai21-learn/echo-in-orbits.git
   cd echo-in-orbits
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Clerk (optional)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Set up database**
   
   Run the SQL schema in Supabase:
   ```bash
   # Execute supabase_schema.sql in your Supabase SQL editor
   ```

5. **Seed database (optional)**
   ```bash
   npm run seed
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
echos_in_orbit/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── planetarium/       # 3D experience
│   │   ├── documentation/     # Technical docs page
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── canvas/            # Three.js components
│   │   │   ├── StarField.tsx  # Star rendering
│   │   │   ├── DomeGrid.tsx   # Spherical grid
│   │   │   └── ...
│   │   └── ui/                # UI components
│   └── lib/
│       ├── utils.ts           # Spherical distribution algorithm
│       ├── supabase.ts        # Database client
│       └── store.tsx          # Global state
├── docs/                       # Documentation
├── scripts/                    # Utility scripts
└── public/                     # Static assets
```

## 🎮 Usage

### Navigation

- **Mouse**: Click and drag to rotate view, scroll to zoom
- **Touch**: Pinch to zoom, drag to rotate
- **Keyboard**: WASD to move camera

### Creating an Echo

1. Click "Create Echo" button
2. Choose a category (Hope, Regret, Advice, Dream, Gratitude)
3. Write your message (10-500 characters)
4. Select visibility (public/private)
5. Optional: Set time-lock for future delivery
6. Submit

### Interacting with Stars

- Click a star to view the echo
- Like and comment on public echoes
- Private echoes appear locked to non-owners

## 🚢 Deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sai21-learn/echo-in-orbits)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Fibonacci sphere algorithm for even star distribution
- Three.js community for 3D rendering resources
- Next.js team for the amazing framework
- Supabase for seamless database integration

## 📧 Contact

- **Author**: Sai
- **GitHub**: [@sai21-learn](https://github.com/sai21-learn)
- **Project Link**: [https://github.com/sai21-learn/echo-in-orbits](https://github.com/sai21-learn/echo-in-orbits)

---

<p align="center">Made with ❤️ and ✨ cosmic dust</p>
