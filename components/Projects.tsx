import styles from './Projects.module.scss';
import Repository from 'models/Repository';
import Project from './Project';

type Props = {
  repositories: Repository[];
};

const Projects: React.FC<Props> = ({ repositories }) => {
  return (
    <section className={styles.root}>
      <h2>My Open Source Projects</h2>
      <div className={styles.articlesGrid}>
        {repositories.map((repository) => (
          <Project key={repository.id} repository={repository} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
