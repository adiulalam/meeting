import { LocalUserChoices } from '@livekit/components-react';

export type ActiveRoomProps = {
  userChoices: LocalUserChoices;
  roomName: string;
  region?: string;
  onLeave?: () => void;
};
