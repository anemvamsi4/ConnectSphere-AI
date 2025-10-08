import { cn } from '../lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <span className={cn('text-foreground font-bold text-xl', className)}>
            Connect Sphere AI
        </span>
    )
}

export const LogoIcon = ({ className }: { className?: string }) => {
    return (
        <span className={cn('text-foreground font-bold text-xl', className)}>
            C
        </span>
    )
}

// You can remove LogoStroke if not needed, or keep a simplified version
export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <span className={cn('text-foreground font-bold text-xl', className)}>
            Connect Sphere AI
        </span>
    )
}
