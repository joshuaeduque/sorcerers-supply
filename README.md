## About Sorcerer's Supply

Sorcerer's Supply is a wizard centric ecommerce site 🧙‍♂️.

### Built With

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

## Getting Started

### Prerequisites

Sorcerer's Supply requires Node.js to be installed on your machine.

### Installation

1. Clone the GitHub repository.

```bash
git clone https://github.com/joshuaeduque/sorcerers-supply.git sorcerers-supply
```

2. Navigate to the project directory.

```bash
cd sorcerers-supply
```

3. Make sure the installation script is executable.

```bash
chmod +x install.sh
```

4. Run the installation script.

```bash
./install.sh
```

### Configuring environment variables

Sorcerer's Supply requires you to configure some environment variables to use Firebase.

1. Create a `.env` file in the `fullstack` directory of the project.

2. Insert the following into the `.env` file and replace the values with your own.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID="your_message_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your_measurement_id"
```

**Note: These environment variables will be exposed to the browser!**

## Usage

Only development script are provided at the moment.

### Start the fullstack server

1. Make sure the start script is executable.

```bash
chmod +x dev_start.sh
```

2. Run the start script.

```bash
./dev_start.sh
```

## License

Distributed under the GNU GPLv3 license. See `LICENSE` for more information.

## Contact

Joshua Duque - joshuaeduque@gmail.com