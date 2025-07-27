import { icons, LucideProps } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import { memo, useMemo } from 'react'

type IconName = keyof typeof icons
type IconProps = LucideProps & { name: IconName; className?: string }

const Icon: React.FC<IconProps> = memo(
    ({ name, className, ...props }: IconProps) => {
        const CustomIcon = useMemo(() => {
            // eslint-disable-next-line import/namespace
            const Icon = icons[name]
            Icon.displayName = name

            return cssInterop(Icon, {
                className: {
                    target: 'style',
                    nativeStyleToProp: {
                        color: true,
                        width: true,
                        height: true,
                    },
                },
            })
        }, [name])

        return <CustomIcon className={className} {...props} />
    },
)

Icon.displayName = 'Icon'

export default Icon