"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import Dashboard  from "@/components/dashboard-05";
import Charts from "@/components/charts-01";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Layout from "@/components/layout";

export default function HomePage() {
  return (
    <Layout>
      <Charts/>
    </Layout>
  );
}