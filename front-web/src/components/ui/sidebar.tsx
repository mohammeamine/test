"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface SidebarContextValue {
  isOpen: boolean
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
  isOpen: true,
  toggle: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <SidebarContext.Provider value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}>
      <div className="flex min-h-screen bg-gray-50">{children}</div>
    </SidebarContext.Provider>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = React.useContext(SidebarContext)
  return (
    <aside
      className={cn(
        "fixed inset-y-0 z-50 flex w-64 flex-col border-r bg-white shadow-sm transition-transform duration-300",
        !isOpen && "-translate-x-full"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-lg font-semibold text-gray-900">EduManage</span>
      </div>
      {children}
    </aside>
  )
}

export function SidebarTrigger() {
  const { toggle } = React.useContext(SidebarContext)
  return (
    <button
      onClick={toggle}
      className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600"
      title="Toggle Sidebar"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  )
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  const { isOpen } = React.useContext(SidebarContext)
  return (
    <div
      className={cn(
        "flex flex-1 flex-col transition-all duration-300",
        isOpen ? "ml-64" : "ml-0"
      )}
    >
      {children}
    </div>
  )
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col overflow-auto py-2">{children}</div>
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-2">{children}</div>
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</div>
}

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav className="space-y-1">{children}</nav>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

interface SidebarMenuButtonProps {
  children: React.ReactNode
  className?: string
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({ 
  children, 
  className,
  isActive,
  asChild,
}: SidebarMenuButtonProps) {
  const Comp = asChild ? "div" : "button"
  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-gray-100 text-gray-900" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        className
      )}
    >
      {children}
    </Comp>
  )
}