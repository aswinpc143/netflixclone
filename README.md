# Netflix Clone with Supabase Backend

A full-featured Netflix clone built with React and Supabase, featuring user authentication, movie browsing, personal lists, and viewing history.

## Features

### 🎬 Core Features
- **User Authentication** - Sign up, login, and logout with Supabase Auth
- **Movie Browsing** - Browse movies by genre, trending, and categories
- **Search Functionality** - Search for movies, TV shows, and actors
- **My List** - Save movies to personal watchlist
- **Viewing History** - Track watched movies with progress
- **User Profiles** - Manage user profiles and preferences
- **Responsive Design** - Optimized for all devices

### 🔧 Technical Features
- **Real-time Data** - Supabase real-time subscriptions
- **Secure Backend** - Row Level Security (RLS) policies
- **Modern UI** - Netflix-inspired design with smooth animations
- **TMDB Integration** - Real movie data from The Movie Database
- **YouTube Trailers** - Integrated trailer playback

## Tech Stack

- **Frontend**: React 17, React Router, Context API
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Styling**: CSS3 with responsive design
- **APIs**: TMDB (The Movie Database), YouTube
- **Deployment**: Netlify

## Getting Started

### Prerequisites
- Node.js 14+ 
- Supabase account
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the migration script in the Supabase SQL editor:
     ```sql
     -- Copy and paste the content from supabase/migrations/001_initial_schema.sql
     ```

4. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
     ```env
     REACT_APP_SUPABASE_URL=your_supabase_project_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key
     ```

5. **Start the development server**
   ```bash
   npm start
   ```

## Database Schema

### Tables

#### `profiles`
- User profile information
- Links to Supabase Auth users
- Stores name, email, avatar

#### `my_list`
- User's saved movies/shows
- References TMDB movie IDs
- Stores movie metadata for offline access

#### `viewing_history`
- Track watched content
- Progress tracking (0-100%)
- Chronological viewing data

#### `user_preferences`
- User settings and preferences
- Language, autoplay, notifications

## API Integration

### TMDB (The Movie Database)
- Movie and TV show data
- Search functionality
- Genre information
- Movie trailers

### YouTube
- Trailer playback
- Embedded video player

## Security

- **Row Level Security (RLS)** - Users can only access their own data
- **Authentication** - Supabase Auth with email/password
- **Data Validation** - Input validation and sanitization
- **Secure API Keys** - Environment variables for sensitive data

## Deployment

The app is configured for easy deployment on Netlify:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set environment variables in Netlify dashboard
   - Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [Supabase](https://supabase.com/) for backend services
- [Netflix](https://netflix.com/) for design inspiration