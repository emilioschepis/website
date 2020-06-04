import styles from './Project.module.scss';
import Repository from 'models/Repository';

type Props = {
  repository: Repository;
};

const Project: React.FC<Props> = ({ repository }) => {
  return (
    <div className={styles.root}>
      <h3>{repository.name}</h3>
      <p>{repository.description}</p>
      <a href={repository.html_url} target="_blank" rel="noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default Project;
