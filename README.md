<div align="center">
<img src="public/logo.png" alt="Workout Cool Logo" width="120" height="120">
<h1>Workout Cool</h1>
<h3><em>Modern fitness coaching platform with comprehensive exercise database</em></h3>
<p>
<img src="https://img.shields.io/github/contributors/Snouzy/workout-cool?style=plastic" alt="Contributors">
<img src="https://img.shields.io/github/forks/Snouzy/workout-cool" alt="Forks">
<img src="https://img.shields.io/github/stars/Snouzy/workout-cool" alt="Stars">
<img src="https://img.shields.io/github/issues/Snouzy/workout-cool" alt="Issues">
<img src="https://img.shields.io/github/languages/count/Snouzy/workout-cool" alt="Languages">
<img src="https://img.shields.io/github/repo-size/Snouzy/workout-cool" alt="Repository Size">
</p>
</div>

## About

A comprehensive fitness coaching platform that allows trainers to manage their clients, create workout plans, track progress, and access a
vast exercise database with detailed instructions and video demonstrations.

## Features

- 🏋️ **Comprehensive Exercise Database** - Thousands of exercises with detailed descriptions, videos, and muscle targeting
- 📊 **Progress Tracking** - Monitor client progress and workout statistics
- 🎯 **Custom Workouts** - Create personalized workout routines
- 🌐 **Multi-language Support** - English and French translations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth
- **Language**: TypeScript
- **Architecture**: Feature-Sliced Design (FSD)

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mathiasbradiceanu/workout-cool.git
   cd workout-cool
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your database URL and other required environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/workout_cool"
   BETTER_AUTH_SECRET="your-secret-key"
   # ... other variables
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser** Navigate to [http://localhost:3000](http://localhost:3000)

## Exercise Database Import

The project includes a comprehensive exercise database. To import a sample of exercises:

### Prerequisites for Import

1. **Prepare your CSV file**

Your CSV should have these columns:

```
id,name,name_en,description,description_en,full_video_url,full_video_image_url,introduction,introduction_en,slug,slug_en,attribute_name,attribute_value
```

You can use the provided example.

### Import Commands

```bash
# Import exercises from a CSV file
pnpm run import:exercises-full /path/to/your/exercises.csv

# Example with the provided sample data
pnpm run import:exercises-full ./data/sample-exercises.csv
```

### CSV Format Example

```csv
id,name,name_en,description,description_en,full_video_url,full_video_image_url,introduction,introduction_en,slug,slug_en,attribute_name,attribute_value
157,"Fentes arrières à la barre","Barbell Reverse Lunges","<p>Stand upright...</p>","<p>Stand upright...</p>",https://youtube.com/...,https://img.youtube.com/...,slug-fr,slug-en,TYPE,STRENGTH
157,"Fentes arrières à la barre","Barbell Reverse Lunges","<p>Stand upright...</p>","<p>Stand upright...</p>",https://youtube.com/...,https://img.youtube.com/...,slug-fr,slug-en,PRIMARY_MUSCLE,QUADRICEPS
```

### Available Attribute Types

- **TYPE**: `STRENGTH`, `CARDIO`, `PLYOMETRICS`, `STRETCHING`, etc.
- **PRIMARY_MUSCLE**: `QUADRICEPS`, `CHEST`, `BACK`, `SHOULDERS`, etc.
- **SECONDARY_MUSCLE**: Secondary muscle groups targeted
- **EQUIPMENT**: `BARBELL`, `DUMBBELL`, `BODYWEIGHT`, `MACHINE`, etc.
- **MECHANICS_TYPE**: `COMPOUND`, `ISOLATION`

## Project Architecture

This project follows **Feature-Sliced Design (FSD)** principles with Next.js App Router:

```
src/
├── app/ # Next.js pages, routes and layouts
├── processes/ # Business flows (multi-feature)
├── widgets/ # Composable UI with logic (Sidebar, Header)
├── features/ # Business units (auth, exercise-management)
├── entities/ # Domain entities (user, exercise, workout)
├── shared/ # Shared code (UI, lib, config, types)
└── styles/ # Global CSS, themes
```

### Architecture Principles

- **Feature-driven**: Each feature is independent and reusable
- **Clear domain isolation**: `shared` → `entities` → `features` → `widgets` → `app`
- **Consistency**: Between business logic, UI, and data layers

### Example Feature Structure

```
features/
└── exercise-management/
├── ui/ # UI components (ExerciseForm, ExerciseCard)
├── model/ # Hooks, state management (useExercises)
├── lib/ # Utilities (exercise-helpers)
└── api/ # Server actions or API calls
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use Feature-Sliced Design architecture
- Write meaningful commit messages
- Add tests for new features

## Deployment

### Using Docker

```bash
# Build the Docker image
docker build -t workout-cool .

# Run the container
docker run -p 3000:3000 workout-cool
```

### Manual Deployment

```bash
# Build the application
pnpm build

# Run database migrations
export DATABASE_URL="your-production-db-url"
npx prisma migrate deploy

# Start the production server
pnpm start
```

## Resources

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Better Auth](https://github.com/better-auth/better-auth)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Support

If you found this project helpful, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

<div align="center">
Made with ❤️ by fitness enthusiasts for the fitness community
</div>
