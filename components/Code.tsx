import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import darcula from 'react-syntax-highlighter/dist/cjs/styles/prism/darcula';
import styles from './Code.module.scss';

type Props = {
  language: string;
  value: string;
};

const Code: React.FC<Props> = ({ language = 'text', value }) => {
  return (
    <div className={styles.root}>
      <SyntaxHighlighter language={language} showLineNumbers style={darcula}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
