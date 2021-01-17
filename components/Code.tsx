import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';

type CodeProps = {
  language: string;
  value: string;
};

const Code: React.FC<CodeProps> = ({ language = 'text', value }) => {
  return (
    <SyntaxHighlighter language={language} showLineNumbers style={theme}>
      {value}
    </SyntaxHighlighter>
  );
};

export default Code;
