'use client'
import { Dialog ,Transition } from '@headlessui/react'
import { CldImage } from 'next-cloudinary'
import { Fragment } from 'react'

export default function ImageWithPopup({isOpen, src, alt,setIsOpen }) {
  

  return (
    <>
        <Transition
            as={Fragment}
            show={isOpen}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0">
        <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
          <Dialog.Panel className="relative max-w-4xl">
            <CldImage
              src={src}
              alt={alt}
              width={800}
              height={800}
              className="rounded-lg shadow-lg"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded"
            >
              ✕
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      </Transition>
    </>
  )
}
