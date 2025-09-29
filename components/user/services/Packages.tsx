"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
              <motion.h3
                className="font-heading text-2xl font-bold text-foreground mb-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                {category}
              </motion.h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    initial={{
                      opacity: 0,
                      x: serviceIndex % 2 === 0 ? -100 : 100,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: serviceIndex * 0.2 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50">
                      <div className="aspect-[3/2] overflow-hidden">
                        <motion.img
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          initial={{ opacity: 0, scale: 1.1 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>

                      <CardHeader className="pb-4">
                        <CardTitle className="font-heading text-xl">
                          {service.name}
                        </CardTitle>
                        <motion.p
                          className="text-muted-foreground text-sm leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          {service.description}
                        </motion.p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <motion.div
                          className="flex items-center justify-between mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
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
                        </motion.div>

                        <motion.div
                          className="mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          <h4 className="font-semibold text-foreground mb-2 text-sm">
                            Lợi ích:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {service.benefits.map(
                              (benefit: string, benefitIndex: number) => (
                                <motion.div
                                  key={benefitIndex}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.4,
                                    delay: 0.8 + benefitIndex * 0.1,
                                  }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-amber-700"
                                  >
                                    {benefit}
                                  </Badge>
                                </motion.div>
                              )
                            )}
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 1 }}
                        >
                          <Button asChild className="flex-1 bg-amber-700">
                            <Link href="/booking">
                              <Calendar className="h-4 w-4 mr-2" />
                              Đặt lịch
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
