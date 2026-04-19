//* @type Layout
//* @context Global
//* @utility Shell principal con Header, Sidebar y región de contenido dinámico.

import { Outlet } from "react-router-dom";
import { motion } from "motion/react"
import Header from "@/components/core/Header";
import Sidebar from "@/components/core/Sidebar";
import { useUiStore } from "@/zustand/ui/ui.slice";
import { smooth } from "@/styles/animations"

export default function MainLayout() {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-neutral dark:bg-neutral-dark">
      {/* <Tag> Header */}
      <Header />
      {/* <Tag> Nav */}
      <Sidebar />
      {/* <Tag> Main — contenido de ruta */}
      <motion.main
        animate={{ marginLeft: sidebarCollapsed ? 72 : 224 }}
        transition={smooth}
        className="pt-14 px-4 lg:px-6"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
