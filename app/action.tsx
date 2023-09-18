'use client';
import { Transition } from '@headlessui/react';

import { useRouter } from 'next/navigation';

export default function Action({ name, href }: { name: string, href: string }) {
    const router = useRouter();

    return (
      <Transition
      appear={true}
      show={true}
      enter="transition-all duration-500"
      enterFrom="opacity-0 transform translate-y-2"
      enterTo="opacity-100 transform translate-y-0"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 transform translate-y-0"
      leaveTo="opacity-0 transform translate-y-2"
      >
        <button 
        className='rounded border border-white padding py-2 px-4 text-center'
        onClick={() => router.push(href)}
        onMouseOver={() => router.prefetch(href)}
        >{name}</button>
      </Transition>
    )
  }