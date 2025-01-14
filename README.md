# 🎯 React Search Bar KS

A modern, animated voice-enabled search component built with React, TypeScript, and Framer Motion.

![React Search Bar KS ]

## ✨ Features

- 🎤 Voice Search with Speech Recognition API
- 🎨 Beautiful gradient background with smooth animations
- 🌓 Glass-morphism UI design
- 🎯 TypeScript support for type safety
- 🎪 Framer Motion animations for smooth transitions
- 📱 Fully responsive design
- ⚡ Loading states and error handling
- 🔍 Real-time search feedback

## 🚀 Installation

```bash
# Using npm
npm install react-search-bar-ks

# Using yarn
yarn add react-search-bar-ks
```

## 💻 Usage

```tsx
import { SearchBar } from 'react-elegant-voice-search';

function App() {
  const handleSearch = async (query: string) => {
    // Handle search logic here
    console.log('Searching for:', query);
  };

  return (
    <SearchBar 
      onSearch={handleSearch}
      placeholder="Search anything..."
    />
  );
}
```

## 🛠️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | `(query: string) => void` | Required | Callback function when search is triggered |
| `placeholder` | `string` | "Search..." | Placeholder text for search input |

## 🎨 Features in Detail

### Voice Search
- Uses the Web Speech API for voice recognition
- Visual feedback during voice recording
- Automatic search trigger after voice input
- Error handling for unsupported browsers

### Animations
- Smooth entrance animations
- Microphone button hover effects
- Loading state animations
- Voice recording indicator pulse effect

### UI/UX
- Clean, minimal design
- Glass-morphism effects
- Responsive layout
- Focus states and accessibility

## 🔧 Browser Support

- Chrome/Edge (Full support)
- Firefox (Full support except voice)
- Safari (Full support)
- Opera (Full support)

## 📦 Dependencies

- React 16.8+ (for Hooks)
- Framer Motion
- Lucide React
- Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See LICENSE for more information.

## 🙏 Credits

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 🐛 Bug Reports

Found a bug? Please create an issue with:
1. Bug description
2. Steps to reproduce
3. Expected vs actual behavior
4. Browser and OS details

## 📞 Support

- GitHub Issues: [Create an issue](https://github.com/sankarkumark34/react-search-bar.git)
- Email:ksankarkumar34@gmail.com
- LinkedIn: [@sankarkumarkathirvel](https://www.linkedin.com/in/sankarkumarkathirvel/)

---

Made with ❤️ by Sankarkumar Kathirvel
