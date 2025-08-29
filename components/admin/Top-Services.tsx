"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";

interface Service {
  name: string;
  bookings: number;
  revenue: string;
  percentage: number;
}

interface TopServicesProps {
  topServices: Service[];
}

export function TopServices({ topServices }: TopServicesProps) {
  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <CardTitle className="text-admin-foreground flex items-center gap-2">
          <Award className="h-5 w-5" />
          Dịch vụ phổ biến
        </CardTitle>
        <CardDescription className="text-admin-card-foreground">
          Top 5 dịch vụ được đặt nhiều nhất tháng này
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topServices.length === 0 ? (
            <div className="text-center text-admin-foreground">
              Không có dữ liệu
            </div>
          ) : (
            topServices.map((service, index) => (
              <div key={service.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-admin-primary text-admin-primary-foreground text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-admin-foreground">
                      {service.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-admin-foreground">
                      {service.bookings} lượt
                    </p>
                    <p className="text-xs text-admin-muted-foreground">
                      {service.revenue}
                    </p>
                  </div>
                </div>
                <Progress
                  value={service.percentage}
                  className="h-2"
                  style={{ backgroundColor: "hsl(var(--admin-muted))" }}
                />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
