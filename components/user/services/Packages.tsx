"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Users, Calendar } from "lucide-react";
import Link from "next/link";

export function ServicePackages() {
  const [servicePackages, setServicePackages] = useState<Record<string, any[]>>(
    {}
  );

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/users/services");
      if (res.ok) {
        const data = await res.json();
        const grouped = data.reduce(
          (
            acc: Record<string, any[]>,
            [category, services]: [string, any[]]
          ) => {
            acc[category] = services.map((s) => ({
              ...s,
              price: `${s.price.toLocaleString("vi-VN")}đ`,
              originalPrice: s.originalPrice
                ? `${s.originalPrice.toLocaleString("vi-VN")}đ`
                : null,
              duration: `${s.duration} phút`,
            }));
            return acc;
          },
          {}
        );
        setServicePackages(grouped);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-10 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(servicePackages).map(
          ([category, services], categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {services.map((service, serviceIndex) => (
                  <Card
                    key={serviceIndex}
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50"
                  >
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="font-heading text-xl">
                        {service.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {service.duration}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {service.price}
                          </div>
                          {service.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {service.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2 text-sm">
                          Lợi ích:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {service.benefits.map(
                            (benefit: string, benefitIndex: number) => (
                              <Badge
                                key={benefitIndex}
                                variant="secondary"
                                className="text-xs bg-amber-700"
                              >
                                {benefit}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild className="flex-1 bg-amber-700">
                          <Link href="/booking">
                            <Calendar className="h-4 w-4 mr-2" />
                            Đặt lịch
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
