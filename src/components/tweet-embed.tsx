import { TweetHydrator } from "./tweet-hydrator";

async function fetchTweetHtml(id: string): Promise<string> {
  const url = `https://publish.twitter.com/oembed?url=https://twitter.com/i/status/${id}&omit_script=true`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return `<p>Tweet unavailable</p>`;
  const data = await res.json();
  return data.html;
}

export async function TweetEmbed({ id }: { id: string }) {
  const html = await fetchTweetHtml(id);

  return (
    <div className="embed">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <TweetHydrator />
    </div>
  );
}
