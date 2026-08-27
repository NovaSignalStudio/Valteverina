import InternalPage from "../InternalPages";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("Journal — Val Teverina", "Storie di luoghi, persone e tradizioni della Val Teverina.", "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg");
export default function BlogPage() { return <InternalPage kind="blog" />; }
