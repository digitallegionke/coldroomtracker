# Coldroom Produce Tracking System

A modern web application for tracking and managing cold storage facilities. Monitor temperature, capacity, and inventory in real-time.

## Features

- Real-time monitoring of cold room status
- Capacity tracking and alerts
- Maintenance scheduling
- Inventory management
- Critical items tracking
- Pickup schedule management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coldroom-produce-tracking-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Material-UI Components
- React Icons

## Project Structure

```
src/
  ├── components/
  │   ├── ui/
  │   │   ├── alert.tsx
  │   │   ├── button.tsx
  │   │   └── card.tsx
  │   └── ColdRoomTracker.tsx
  ├── App.tsx
  └── index.tsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 