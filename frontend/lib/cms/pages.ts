"use client";

import defaults from "./pageDefaults.json";
import { useAdmin } from "@/context/AdminContext";

export type PageSlug = keyof typeof defaults;
type PageSections<P extends PageSlug> = (typeof defaults)[P]["sections"];
type PageContent<P extends PageSlug> = {
  [K in keyof PageSections<P>]: PageSections<P>[K] extends { content: infer C } ? C : never;
};

export function usePageContent<P extends PageSlug>(page: P): PageContent<P> {
  const { homeData } = useAdmin();
  return Object.fromEntries(
    Object.entries(defaults[page].sections).map(([key, section]) => [
      key,
      homeData[key]?.data ?? section.content,
    ])
  ) as PageContent<P>;
}
