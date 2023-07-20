import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export function DemoMeetingTab() {
  const router = useRouter();

  const startMeeting = () => {
    const uuid = crypto.randomUUID();
    router.push(`/rooms/${uuid}`);
  };

  return (
    <div className={styles.tabContent}>
      <p style={{ marginTop: 0 }}>Try LiveKit Meet for free with our live demo project.</p>
      <button className="lk-button" onClick={startMeeting}>
        Start Meeting
      </button>
    </div>
  );
}
