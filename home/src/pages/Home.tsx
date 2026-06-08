import { useState } from 'react'

import PromoBanner from '../components/layout/PromoBanner/PromoBanner'
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import ScrollAnimations from '../components/animation/ScrollAnimations'

import Hero from '../components/sections/Hero/Hero'
import StatsRow from '../components/sections/StatsRow/StatsRow'
import PopularSmoothies from '../components/sections/PopularSmoothies/PopularSmoothies'
import ProteinPowerhouse from '../components/sections/ProteinPowerhouse/ProteinPowerhouse'
import PerformanceSupplements from '../components/sections/PerformanceSupplements/PerformanceSupplements'
import CustomizeCTA from '../components/sections/CustomizeCTA/CustomizeCTA'
import AuthorizedRetailer from '../components/sections/AuthorizedRetailer/AuthorizedRetailer'
import VisitStore from '../components/sections/VisitStore/VisitStore'
import ProductGrid from '../components/sections/ProductGrid/ProductGrid'

import { NAV_LINKS } from '../data/navigation'
import { POPULAR_SMOOTHIES, HERO_THUMBS } from '../data/smoothies'
import { FEATURED_PRODUCTS } from '../data/products'
import { STATS } from '../data/stats'
import { AUTHORIZED_BRANDS } from '../data/brands'

export default function HomePage() {
  const [promoDismissed, setPromoDismissed] = useState(false)

  return (
    <>
      <ScrollAnimations />
      {!promoDismissed && (
        <PromoBanner onDismiss={() => setPromoDismissed(true)} />
      )}
      <Header navLinks={NAV_LINKS} />
      <main>
        <Hero thumbs={HERO_THUMBS} />
        <StatsRow stats={STATS} />
        <PopularSmoothies smoothies={POPULAR_SMOOTHIES} />
        <ProteinPowerhouse />
        <PerformanceSupplements />
        <CustomizeCTA />
        <AuthorizedRetailer brands={AUTHORIZED_BRANDS} />
        <VisitStore />
        <ProductGrid products={FEATURED_PRODUCTS} />
      </main>
      <Footer />
    </>
  )
}
