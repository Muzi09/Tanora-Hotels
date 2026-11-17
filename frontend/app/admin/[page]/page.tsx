import { notFound } from "next/navigation";
import ContentPageView from "@/components/cms/ContentPageView";
import { fetchPageData } from "@/lib/cms/api";
import defaults from "@/lib/cms/pageDefaults.json";
import type { PageSlug } from "@/lib/cms/pages";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Panel | Tanora Hotels CMS", robots: { index: false, follow: false } };

export default async function AdminContentPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!Object.hasOwn(defaults, page)) notFound();
  const initialData = await fetchPageData(page);
  return <ContentPageView page={page as PageSlug} initialData={initialData} isAdmin />;
}
