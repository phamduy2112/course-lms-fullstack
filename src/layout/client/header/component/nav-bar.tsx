import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useCategoryQuery } from "@/hooks/query/useCategory";
import type { TCreateCategory } from "@/service/category/category.type";

const Navbar = () => {
  const { data, isLoading } = useCategoryQuery();
  const categories: any[] = data?.data ?? [];
  console.log(categories)

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Khám phá</MenubarTrigger>
          <MenubarContent className="">
            {categories.map((cat) =>
              cat.other_categories && cat.other_categories.length > 0 ? (
                // Nếu có menu con → tạo submenu
                <MenubarSub key={cat.id}>
                  <MenubarSubTrigger className="">{cat.name}</MenubarSubTrigger>
                  <MenubarSubContent>
                    {cat.other_categories.map((child) => (
                      <MenubarItem
                        key={child.id}
                        onSelect={() =>
                          (window.location.href = `/category/${child.slug}`)
                        }
                      >
                        {child.name}
                      </MenubarItem>
                    ))}
                  </MenubarSubContent>
                </MenubarSub>
              ) : (
                // Nếu không có con → link cha luôn
                <MenubarItem
                  key={cat.id}
                  onSelect={() =>
                    (window.location.href = `/category/${cat.slug}`)
                  }
                >
                  {cat.name}
                </MenubarItem>
              )
            )}

            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;
