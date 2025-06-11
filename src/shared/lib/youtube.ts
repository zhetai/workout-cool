// src/shared/lib/get-youtube-embed-url.ts

interface YouTubeEmbedOptions {
  autoplay?: boolean;
  // Add other embed options if needed (e.g., controls, loop, start)
  // controls?: boolean;
  // loop?: boolean;
  // start?: number; // Start time in seconds
}

/**
 * Converts various YouTube URL formats into a standard embeddable URL.
 * Handles regular videos, shorts, youtu.be links, and playlists.
 * Returns null if the URL is invalid or the ID cannot be extracted.
 *
 * @param url The original YouTube URL string.
 * @param options Optional configuration for the embed (e.g., autoplay).
 * @returns The embeddable YouTube URL string or null.
 */
export function getYouTubeEmbedUrl(url: string, options: YouTubeEmbedOptions = {}): string | null {
  if (!url) {
    return null;
  }

  let videoId: string | null = null;
  let playlistId: string | null = null;

  try {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;
    const pathname = urlObject.pathname;
    const searchParams = urlObject.searchParams;

    // 1. Check for standard video URLs (youtube.com/watch?v=...)
    if (hostname.includes("youtube.com") && pathname === "/watch") {
      videoId = searchParams.get("v");
      // Check if it's also part of a playlist
      if (searchParams.get("list")) {
        playlistId = searchParams.get("list");
      }
    }
    // 2. Check for short URLs (youtu.be/...)
    else if (hostname === "youtu.be") {
      videoId = pathname.substring(1); // Remove leading '/'
    }
    // 3. Check for embed URLs (/embed/...)
    else if (hostname.includes("youtube.com") && pathname.startsWith("/embed/")) {
      videoId = pathname.substring("/embed/".length);
    }
    // 4. Check for shorts URLs (/shorts/...)
    else if (hostname.includes("youtube.com") && pathname.startsWith("/shorts/")) {
      videoId = pathname.substring("/shorts/".length);
    }
    // 5. Check for playlist URLs (youtube.com/playlist?list=...)
    else if (hostname.includes("youtube.com") && pathname === "/playlist") {
      playlistId = searchParams.get("list");
    }
    // Note: Channel URLs (/channel/..., /c/..., /@handle) are not directly embeddable in the same way.
    // You usually embed a specific video or playlist from a channel.
  } catch (error) {
    // If URL parsing fails, maybe it's just an ID/handle? We don't handle that here for embeds.
    console.warn("Could not parse as URL for embed:", url, error);
    // For embeds, we need a video or playlist ID extracted from a valid URL structure.
    return null;
  }

  // --- Construct Embed URL ---

  const baseEmbedUrl = "https://www.youtube.com/embed/";
  const queryParams = new URLSearchParams();

  if (options.autoplay) {
    queryParams.set("autoplay", "1");
  }
  // Add other options here
  // if (options.controls !== undefined) queryParams.set('controls', options.controls ? '1' : '0');
  // if (options.loop) queryParams.set('loop', '1'); // Note: loop often requires playlist param too
  // if (options.start) queryParams.set('start', String(options.start));

  // Prioritize playlist embed if playlistId is found
  if (playlistId) {
    // For playlist embed, use videoseries?list=...
    queryParams.set("list", playlistId);
    // If a videoId was also found, it becomes the first video in the playlist context
    const path = videoId ? videoId : "videoseries";
    return `${baseEmbedUrl}${path}?${queryParams.toString()}`;
  }
  // Otherwise, embed the single video if videoId is found
  else if (videoId) {
    // If looping a single video, playlist param needs to be the videoId itself
    // if (options.loop) queryParams.set('playlist', videoId);
    return `${baseEmbedUrl}${videoId}?${queryParams.toString()}`;
  }

  // If neither videoId nor playlistId could be extracted
  return null;
}
