import categories from "@/data/jobCategories.json";
import { Menu, MenuProps } from "antd"
import { JobService } from "@/services/Restful/jobs";
type MenuItem = Required<MenuProps>['items'][number];
interface ICategoryMenu {
    setJobs: (j: IJob[]) => void;
}
const CategoryMenu: React.FC<ICategoryMenu> = ({setJobs}) => {
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
    const items: MenuItem[] = categories.map(cat => getItem(cat.label, cat.label))
    const handleMenuSelection = async ({ key }: {key: string}) => {
        const res = await JobService.getJobs({category: key});
        setJobs(res);
    }
    return <Menu mode="inline" theme="dark" items={items} className="rounded-lg" onClick={handleMenuSelection}/>
};
export default CategoryMenu;