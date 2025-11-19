import React from 'react'
import { Toaster, toast } from './sonner'

export function ToastOutlet() {
    return <Toaster pauseWhenPageIsHidden />
}

export function show(content: React.ReactNode, {type = "default", ...options}) {

}