"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServicesHero } from "@/components/user/services/Hero";
import { ServicePackages } from "@/components/user/services/Packages";
import { Header } from "@/components/user/Header";
import { Footer } from "@/components/user/Footer";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <ServicesHero />
      <ServicePackages />
      <Footer />
    </>
  );
}
