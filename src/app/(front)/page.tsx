import BrowseByCategory from "@/components/banner/BrowseByCategory";
import DefaultHeader from "@/components/header/defaultHeader";
import SignupCTA from "@/components/header/signupCTA";
import HeroSection from "@/components/hero/hero";
import FeatureRating from "@/features/rating/components/FeatureRating/FeatureRating";
import ProductFeature from "@/features/product/components/FeatureProduct/ProductFeature";
import { Fragment } from "react";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <Fragment>
            <SignupCTA />
            <DefaultHeader />
            <HeroSection />
            <ProductFeature type="new" title="New Arrivals" />
            <hr className="my-4 w-5/6  mx-auto border-t border-gray-200" />
            <ProductFeature type="bestseller" title="Top Selling" />
            <BrowseByCategory />
            <FeatureRating />
            <Footer />
        </Fragment>
    );
}