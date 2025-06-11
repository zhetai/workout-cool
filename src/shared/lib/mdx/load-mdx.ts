import path from "path";
import { readFile } from "fs/promises";

import { compileMDX } from "next-mdx-remote/rsc";

export async function getLocalizedMdx(
  pageSlug: string, // ex: "privacy-policy"
  locale: string, // ex: "fr" or "en"
) {
  const filePath = path.join(process.cwd(), "content", pageSlug, `${locale}.mdx`);

  const source = await readFile(filePath, "utf-8");

  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return content;
}
