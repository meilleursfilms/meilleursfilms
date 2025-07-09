import fs from "fs";
import path from "path";

// Next.js 13+ app router
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/films");
  const files = fs.readdirSync(dir);
  return files.filter(f => f.endsWith('.json')).map(f => ({ id: f.replace('.json', '') }));
}

export default async function Page({ params }) {
  const filePath = path.join(process.cwd(), "src/content/films", `${params.id}.json`);
  const film = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <main>
      <h1>{film.title}</h1>
      <p>{film.overview}</p>
      <pre>{JSON.stringify(film, null, 2)}</pre>
    </main>
  );
}
