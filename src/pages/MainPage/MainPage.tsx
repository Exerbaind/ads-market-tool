import { Text } from '@shared/components'
import { useMainPage } from './useMainPage'

export const MainPage = () => {
  const { a } = useMainPage()

  return (
    <Text type="title1" className="font-semibold" as="h1">
      Main Page
    </Text>
  )
}
