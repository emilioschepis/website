const Footer = () => {
  return (
    <footer className="flex-none h-16 border-t-2">
      <div className="max-w-5xl h-full lg:mx-auto">
        <div className="flex h-full mx-4 justify-center items-center font-bold space-x-2">
          <p className="text-sm">Get in touch!</p>
          <a
            href="https://twitter.com/emilioschepis"
            className="text-sm text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://github.com/emilioschepis"
            className="text-sm text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
