import {
  LiveKitRoom,
  useToken,
  VideoConference,
  formatChatMessageLinks,
} from '@livekit/components-react';
import { LogLevel, RoomOptions, VideoPresets } from 'livekit-client';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { DebugMode } from '../../lib/Debug';
import { useServerUrl } from '../../lib/client-utils';
import { ActiveRoomProps } from '../../types/room';

export const ActiveRoom = ({ roomName, userChoices, onLeave }: ActiveRoomProps) => {
  const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
    userInfo: {
      identity: userChoices.username,
      name: userChoices.username,
    },
  });

  const router = useRouter();
  const { region } = router.query;

  const liveKitUrl = useServerUrl(region as string | undefined);

  const roomOptions = useMemo((): RoomOptions => {
    return {
      videoCaptureDefaults: {
        deviceId: userChoices.videoDeviceId ?? undefined,
        resolution: VideoPresets.h1080,
      },
      publishDefaults: {
        videoSimulcastLayers: [VideoPresets.h1080, VideoPresets.h720],
      },
      audioCaptureDefaults: {
        deviceId: userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
    };
  }, [userChoices]);

  async function onClickHandler() {
    await fetch('/api/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_name: roomName }),
    });
  }

  return (
    <>
      {liveKitUrl && (
        <LiveKitRoom
          token={token}
          serverUrl={liveKitUrl}
          options={roomOptions}
          video={userChoices.videoEnabled}
          audio={userChoices.audioEnabled}
          onDisconnected={onLeave}
        >
          {/* <button onClick={onClickHandler}>Record Meeting</button> */}
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
      )}
    </>
  );
};
