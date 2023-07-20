import { NextApiRequest, NextApiResponse } from 'next';
import { EgressClient, EncodedFileType } from 'livekit-server-sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ egress_id: string } | ErrorResponse>,
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Invalid method' });
  }

  const broadcastDetails = req.body as BroadcastDetails;

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const livekitHost = wsUrl?.replace('wss://', 'https://');

  const egressClient = new EgressClient(livekitHost, apiKey, apiSecret);

  const output = {
    fileType: EncodedFileType.MP4,
    filepath: 'livekit-demo/{room_name}_{time}.mp4',
    s3: {
      accessKey: process.env.AWS_ACCESS_KEY,
      secret: process.env.AWS_SECRET,
      region: 'eu-west-2',
      bucket: 'nextauth-bucket-dev',
    },
  };

  const info = await egressClient.startRoomCompositeEgress(
    broadcastDetails?.room_name || 'Not Found',
    output,
    {
      layout: 'speaker',
    },
  );

  const egress_id = info.egressId as string;

  res.status(200).json({ egress_id });
}

type BroadcastDetails = {
  room_name: string;
};

type ErrorResponse = {
  error: string;
};
