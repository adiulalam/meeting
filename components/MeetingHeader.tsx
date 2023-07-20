import Image from 'next/image';

const MeetingHeader = () => {
  return (
    <div className="header">
      <Image src="/images/livekit-meet-home.svg" alt="LiveKit Meet" width="360" height="45" />
      <h2>
        Open source video conferencing app built on{' '}
        <a href="https://github.com/livekit/components-js?ref=meet" rel="noopener">
          LiveKit&nbsp;Components
        </a>
        ,{' '}
        <a href="https://livekit.io/cloud?ref=meet" rel="noopener">
          LiveKit&nbsp;Cloud
        </a>{' '}
        and Next.js.
      </h2>
    </div>
  );
};

export default MeetingHeader;
