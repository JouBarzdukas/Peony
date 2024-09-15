'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Layout from "@/components/layout"
import Link from "next/link"
import Image from 'next/image'
import { ArrowRight, Users, BarChart2, Search, Briefcase, Globe, TrendingUp } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="h-full bg-white/80 backdrop-blur-sm border-purple-200">
      <CardContent className="flex flex-col items-center p-6">
        <Icon className="mb-4 h-10 w-10 text-purple-600" />
        <h3 className="text-lg font-semibold mb-2 text-center text-purple-800">{title}</h3>
        <p className="text-center text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)

export default function HomePage() {
  const controls = useAnimation()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } })
  }, [controls])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-white text-purple-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-purple-100/80 via-pink-100/80 to-white/80"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 py-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center mb-8"
          >
            <Image 
              src="/namelogo.png" 
              alt="Peony" 
              width={250} 
              height={100} 
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold mb-4 text-purple-800">Empowering Workplace Diversity</h1>
            <p className="text-lg text-purple-600 max-w-2xl mx-auto mb-6">
              Our mission is to promote transparency, equality, and diversity in the workplace through data-driven insights and community engagement.
            </p>
            <Link href="/dashboard" passHref>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-xl py-4 px-8">
                Explore Dashboard
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <FeatureCard
              icon={Users}
              title="Diverse Perspectives"
              description="Gain insights from a wide range of experiences across various industries and roles."
            />
            <FeatureCard
              icon={BarChart2}
              title="Data-Driven Analysis"
              description="Access comprehensive salary reports and diversity metrics to make informed decisions."
            />
            <FeatureCard
              icon={Search}
              title="Company Insights"
              description="Explore detailed company profiles and reviews to find inclusive workplaces."
            />
            <FeatureCard
              icon={Briefcase}
              title="Career Opportunities"
              description="Discover job openings at companies committed to diversity and inclusion."
            />
            <FeatureCard
              icon={Globe}
              title="Global Network"
              description="Connect with professionals worldwide to share experiences and best practices."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Personal Growth"
              description="Track your career progress and set goals for professional development."
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}