import categories from "@/data/jobCategories.json";
import { Menu, MenuProps, Select } from "antd"
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
      }
    const menuItems: MenuItem[] = categories.map(cat => getItem(cat.label, cat.label));
    const selectItems = categories.map(cat => ({value: cat.label, label: cat.label}));
    const handleMenuSelection = async ({ key }: {key: string}) => {
        setCategory(key);
    }
    return (
      <>
        <Menu 
            mode="inline" 
            theme="dark" 
            items={menuItems} 
            defaultSelectedKeys={["All"]}
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