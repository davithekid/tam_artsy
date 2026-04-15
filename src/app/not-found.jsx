'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation";
import Link from 'next/link'

const NotFound = () => {
    const router = useRouter()
    return (
        <div className='mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16'>
            <div className='text-center'>
                <h1 className='mb-2 text-3xl font-bold'>Página não encontrada</h1>
                <p>Oops! Essa página que você está acessando não existe.</p>
                <div className='mt-6 flex items-center justify-center gap-4 md:mt-8'>
                    <Button className='cursor-pointer'>
                        <Link href={'/'}>Início</Link></Button>
                    <Button variant='ghost' onClick={() => router.back()} className='flex cursor-pointer items-center gap-1'>
                        <span>Voltar para página anterior</span>
                        <ArrowRight className='size-4'></ArrowRight>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound