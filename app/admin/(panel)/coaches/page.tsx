import Manager from '@/components/admin/Manager'
import { coachChild, coachDefaults, coachFields } from '@/components/admin/config'
export default function Page() {
  return <Manager table="coaches" title={['Coaches & assistant coaches', 'المدربون ومساعدو المدربين']} fields={coachFields} labelKey="name_en" subKey="role" defaults={coachDefaults} child={coachChild} />
}
