import categories from "@/data/jobCategories.json";
import { Menu, MenuProps, Select } from "antd";
import { useState } from "react";
type MenuItem = Required<MenuProps>['items'][number];
interface ICategoryMenu {
    setCategory: (category: string) => void;
}
const CategoryMenu: React.FC<ICategoryMenu> = ({setCategory}) => {
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
      ): MenuItem {
        return {
          key,
          icon,
          children,
          label,
          type,
        } as MenuItem;
      };
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['All']);
    const menuItems: MenuItem[] = categories.map(cat => getItem(cat.label, cat.label));
    const selectItems = categories.map(cat => ({value: cat.label, label: cat.label}));
    const handleMenuSelection = async ({ key }: {key: string}) => {
      setSelectedKeys([key]);
      if (key !== 'All') {
        setCategory(key);
      } else {
        setCategory("");
      }
    }
    return (
      <>
        <Menu 
            mode="inline" 
            theme="dark" 
            items={menuItems} 
            // defaultSelectedKeys={["All"]}
            selectedKeys={selectedKeys}
            className="rounded-lg hidden sm:block sticky top-40" 
            onClick={handleMenuSelection}
        />
        <Select 
          placeholder="Select Job Category" 
          onChange={handleMenuSelection} 
          options={selectItems}
          className="sm:hidden block"
        />
      </>
    )
};
export default CategoryMenu;