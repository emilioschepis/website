import styles from './Index.module.scss';
import Introduction from './Introduction';
import Projects from './Projects';
import Repository from 'models/Repository';

type Props = {
  repositories: Repository[];
};

const Index: React.FC<Props> = ({ repositories }) => {
  return (
    <main className={styles.root}>
      <Introduction />
      <Projects repositories={repositories} />
    </main>
  );
};

export default Index;
