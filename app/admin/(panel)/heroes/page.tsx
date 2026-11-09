import Manager from '@/components/admin/Manager'
import { heroChild, heroDefaults, heroFields } from '@/components/admin/config'
export default function Page() {
  return <Manager table="heroes" title={['Heroes (champions)', 'الأبطال']} fields={heroFields} labelKey="name_en" defaults={heroDefaults} child={heroChild} />
}
