import styles from '../styles/Home.module.css';
import { MeetingHeader, DemoMeetingTab, MeetingFooter } from '../components';

const Home = () => {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <MeetingHeader />
        <DemoMeetingTab />
      </main>
      <MeetingFooter />
    </>
  );
};

export default Home;
