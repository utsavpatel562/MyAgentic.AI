import { db } from "@/db";
import { meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import { CallSessionStartedEvent } from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWithSDK(body: string, signature: string): boolean {
    return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature");
    const apiKey = req.headers.get("x-api-key");

    if(!signature || !apiKey) {
        return NextResponse.json(
            {error : "Missing signature or API Key"},
            {status: 400},
        )
    }

    const body = await req.text();
    if(!verifySignatureWithSDK(body, signature)) {
        return NextResponse.json({error : "Invalid signature"}, {status: 401})
    }

    let payload: unknown;
    try {
        payload = JSON.parse(body) as Record<string, number>;
    }
    catch {
        return NextResponse.json({error: "Invalid JSON"}, {status: 400})
    }

    const eventType = (payload as Record<string, unknown>)?.type;
    if(eventType === "call.session_started") {
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId;
        if(!meetingId) {
            return NextResponse.json({error: "Missing meetingId"}, {status: 400})
        }
        const [existingMeeting] = await db.select().from(meetings).where(
            and(
                eq(meetings.id, meetingId),
                not(eq(meetings.status, "completed")),
                not(eq(meetings.status, "active")),
                not(eq(meetings.status, "cancelled")),
            )
        )
    }
    return NextResponse.json({status : "ok"});
}