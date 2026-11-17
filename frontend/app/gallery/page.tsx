import ContentPageView from "@/components/cms/ContentPageView";
import { fetchPageData } from "@/lib/cms/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialData = await fetchPageData("gallery");
  return <ContentPageView page="gallery" initialData={initialData} />;
}
