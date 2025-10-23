import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
  useTLS: true,
});

export async function GET() {
  try {
    // On envoie un petit message de test
    const channel = 'test-channel';
    const event = 'test-event';
    const data = { message: '✅ Pusher fonctionne parfaitement !' };

    await pusher.trigger(channel, event, data);

    return NextResponse.json({
      success: true,
      message: '✅ Test envoyé à Pusher avec succès',
      details: { channel, event, data },
    });
  } catch (error) {
    console.error('❌ Erreur Pusher:', error);
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 });
  }
}
