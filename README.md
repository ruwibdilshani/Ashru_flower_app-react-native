# AshRuu - Flower Ordering Mobile App

AshRuu is a full-stack mobile application for online flower ordering, built using React Native with TypeScript and Expo. The backend is powered by Node.js with Express and Prisma ORM. The app includes features like Stripe payment integration, order history, order status tracking, and push notifications for order updates.

## Features

- Browse and order flowers online
- Add to cart and checkout with Stripe payment integration
- Track order history and status updates
- Receive push notifications for order updates
- Secure authentication system

## Tech Stack

### Frontend:
- React Native
- TypeScript
- Expo
- React Navigation

### Backend:
- Node.js
- Express.js
- Prisma ORM
- MySQL/PostgreSQL
- Stripe API (for payments)

### Additional Services:
- Firebase (for push notifications)
- Expo Notifications API

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** or **yarn** (latest version recommended)
- **Expo CLI** (`npm install -g expo-cli`)
- **Git** (to clone the repository)
- **Android Studio/Xcode** (for mobile emulators, if testing locally)

## Getting Started

### 1. Clone the Repository

```sh
git clone <https://github.com/ruwibdilshani/Ashru_flower_app-react-native.git>
cd Ashru_flower_app-react-native
```

### 2. Install Dependencies

```sh
yarn install
# OR
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the required environment variables.

```

# Stripe
STRIPE_PUBLIC_KEY=your-stripe-public-key

# Firebase
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
```

### 4. Start the Development Server

```sh
expo start
```

Use `a` to open Android emulator, `i` for iOS emulator, or scan the QR code to run it on a physical device with the **Expo Go** app.

### 5. Running the Backend (Optional)

If you are also setting up the backend:

1. Navigate to the backend folder (`cd backend`)
2. Install dependencies (`npm install`)
3. Set up the database using Prisma (`npx prisma migrate dev`)
4. Start the backend server (`npm run dev`)

## Deployment

### Frontend Deployment
- You can build the app using **EAS (Expo Application Services)**:

```sh
eas build --platform android
# OR
eas build --platform ios
```

### Backend Deployment
- Host the backend on a service like **Vercel, Render, or AWS**.

## Contributing

Feel free to fork the repository and submit pull requests.

## License

MIT License - You are free to modify and distribute this software.

---

### Contact
For any issues or feature requests, please open an issue on GitHub.

