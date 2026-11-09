import Manager from '@/components/admin/Manager'
import { branchDefaults, branchFields } from '@/components/admin/config'
export default function Page() {
  return <Manager table="branches" title={['Branches', 'الفروع']} fields={branchFields} labelKey="name_en" subKey="address_en" defaults={branchDefaults} />
}
