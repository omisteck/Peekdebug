# Peek

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.0.1--beta-green.svg)

A modern logging application designed to help developers gain insights into their code and application behavior. Peek provides a clean and intuitive interface to send, view, and analyze log data in real time.

## Features

- 🔄 Real-time log monitoring
- 🔍 Advanced search capabilities
- 🎨 Dark/Light theme support
- 📊 Multiple log types support (SQL, Events, Models, etc.)
- 💾 Log persistence
- 🖥️ Cross-platform support
- ⚡ Fast and lightweight

## Tech Stack

- Electron
- React
- TypeScript
- Tailwind CSS
- LowDB for data persistence
- Jest for testing

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start
```

## Building

### For macOS (Universal Binary)

```bash
npm run make -- --platform=darwin --arch=universal
```

The built application will be available in the `out` directory.

## Development

### Environment Setup

1. Create appropriate `.env` files:

Required environment variables:
- `APPLE_ID`
- `APPLE_ID_PASSWORD`
- `TEAM_ID`
- `DEFAULT_PORT` (defaults to 44315)

### Running Tests

```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Varela Round font by [The Varela Round Project](https://github.com/alefalefalef/Varela-Round-Hebrew/)

## Support

For support, please refer to our [documentation](https://omisio.gitbook.io/peek) or open an issue in the repository.

---

Made with ❤️ by Rasheed Omiwale