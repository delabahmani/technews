import Link from "next/link";
import { TCategory } from "@/app/types";



const getCategories = async(): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)

    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error)
    return null;    
  }
  return null;
}

export default async function CategoriesList() {
  const categories = await getCategories();
  return (
    <div className="flex gap-2 text-sm flex-wrap ">
      {categories &&
        categories.map((category) => (
          <Link
            className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer"
            href={`/categories/${category.catName}`} key={category.id}
          >
            {category.catName}
          </Link>
        ))}
    </div>
  );
}
