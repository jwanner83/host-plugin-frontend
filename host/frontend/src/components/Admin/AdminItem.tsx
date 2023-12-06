import PluginsItem from '../../interfaces/PluginsItem.ts'

interface Props {
  item: PluginsItem
}

export default function AdminItem ({ item }: Props) {
  return <li className={`${item.overwritten && 'text-black/50'}`}>
    {item.scope}/{item.name}@{item.version} {item.overwritten && '(overwritten by customer)'}
  </li>
}