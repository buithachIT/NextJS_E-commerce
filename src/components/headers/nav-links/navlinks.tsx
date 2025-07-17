import { getCategory } from '@/lib/action/category';
import { CategoryNode } from '@/types/category';
import NavLinksClient from './links-client';

export default async function NavLinks() {
  const links = await getCategory();
  const navLinks = links?.filter(
    (cat: CategoryNode) => cat.display === 'DEFAULT'
  );
  return <NavLinksClient navLinks={navLinks as CategoryNode[]} />;
}
