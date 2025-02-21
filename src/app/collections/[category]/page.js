import axios from "axios";
import Category from "@/components/Category";
import { notFound } from "next/navigation";


async function GetData(category) {
  const getData = await axios
    .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getcategory/${category}`)
    .then((res) => res.data.data);
  return getData;
}


async function page({ params }) {
  const { category } = await params;
  try {
    const data = await GetData(category);
    return <Category data={data} />;
  } catch (error) {
    if (error.status == 404) {
      notFound();
    }
  }
}

export default page;
