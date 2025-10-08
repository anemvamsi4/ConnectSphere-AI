import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HeroHeader } from './header'

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section>
                    <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
                        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">personalized networking with no effort</h1>
                                <p className="mt-8 max-w-2xl text-pretty text-lg">AI platform for personalized networking messages to enhance your professional connections and job opportunities.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link href="/sign-up">
                                            <span className="text-nowrap">Get Started</span>
                                        </Link>
                                    </Button>
                                    {/* <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="px-5 text-base">
                                        <Link href="https://github.com/anemvamsi4/connectsphere-ai">
                                            <span className="text-nowrap">github repo &gt;</span>
                                        </Link>
                                    </Button> */}
                                </div>
                            </div>
                            <Image
                                className="-z-10 order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
                                alt="Abstract Object"
                                height="2000"
                                width="2000"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
